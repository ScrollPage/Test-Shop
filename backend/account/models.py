from django.db import models
from django.contrib.auth.models import AbstractBaseUser

class Account(AbstractBaseUser):
    email = models.EmailField(verbose_name = "email", max_length = 60, unique = True)
    username = models.CharField(max_length = 30, unique = True)
    date_joined = models.DateTimeField(verbose_name = "date joined", auto_now_add = True)
    last_login = models.DateTimeField(verbose_name = "last_login", auto_now = True)
    is_admin = models.BooleanField(default = False)
    avatar = models.ImageField(upload_to="user_avatars/%Y/%m/%d", blank=True)
    is_active = models.BooleanField(default = False)

    def get_url(self):
        try:
            return self.avatar.url
        except ValueError:
            return None