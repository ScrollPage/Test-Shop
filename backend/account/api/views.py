from rest_framework import generics
from account.api.serializers import RegistrationSerializer
from account.models import Account, MyToken
from rest_framework import generics
from django.views import View
from django.shortcuts import redirect
from django.conf import settings
from django.utils import timezone
from datetime import timedelta


class RegistrationView(generics.CreateAPIView):

    queryset = Account.objects.all()
    serializer_class =  RegistrationSerializer
    

class AuthorizationConfirm(View):
    
    def get(self, request, *args, **kwargs):
        t = MyToken.objects.get(token = self.kwargs['token'])
        time_now = timezone.now()
        if t.created > (time_now + timedelta(hours = 2)):
            t.delete()
            return redirect(settings.REACT_DOMEN)
        u = Account.objects.get(email = t.user)
        print(u)
        u.is_active = True
        t.delete()
        return redirect(settings.REACT_DOMEN)