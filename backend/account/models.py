from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import PermissionsMixin
from django.core.mail import send_mail
from cart.help_funcs import generate_token

class MyAccountManager(BaseUserManager):

    def create_user(self, email, first_name, last_name, phone_number, password = None):
        user = self.model(
            email = self.normalize_email(email),
            first_name = first_name.capitalize(),
            last_name = last_name.capitalize(),
            phone_number = phone_number
        )

        print(user.first_name)

        user.set_password(password)
        user.save(using = self._db)

        return user

    def create_superuser(self, email, first_name, last_name, phone_number, password = None):
        user = self.create_user(
            email = self.normalize_email(email),
            password = password,
            first_name = first_name,
            last_name = last_name,
            phone_number = phone_number
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True

        user.save(using = self._db)

        return user



class Account(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name = "email", max_length = 60, unique = True)
    first_name = models.CharField(max_length = 30, default = '')
    last_name = models.CharField(max_length = 30, default = '')
    phone_number = models.CharField(max_length = 11)
    date_joined = models.DateTimeField(verbose_name = "date joined", auto_now_add = True)
    last_login = models.DateTimeField(verbose_name = "last_login", auto_now = True)
    is_admin = models.BooleanField(default = False)
    is_staff = models.BooleanField(default = False)
    is_superuser = models.BooleanField(default = False)
    avatar = models.ImageField(upload_to="user_avatars/%Y/%m/%d", blank=True)
    is_active = models.BooleanField(default = True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone_number']

    objects = MyAccountManager()

    def __str__(self):
        return self.email

    def get_url(self):
        try:
            return self.avatar.url
        except ValueError:
            return None

class MyToken(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, default = None)
    token = models.CharField(max_length = 100, default = '')
    created = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.token


@receiver(post_save, sender = settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance = None, created = False, **kwargs):
    if created:
        if instance.is_superuser is False:
            m = MyToken.objects.create(user = instance)
            m.token = generate_token(instance.first_name)
            send_mail(
                "Подтверждение регистрации",
                f"Перейдите по ссылке, чтобы завершить регистрацию: {settings.DJANGO_DOMEN}/account/authorization_confirm/{m.token}",
                settings.EMAIL_HOST_USER, 
                [instance.email,], 
                fail_silently=False
            )
            m.save()
        Token.objects.create(user = instance)