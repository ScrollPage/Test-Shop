from rest_framework import generics
from account.api.serializers import RegistrationSerializer
from account.models import Account
from rest_framework import generics
from django.views import View
from django.shortcuts import redirect
from django.conf import settings


class RegistrationView(generics.CreateAPIView):

    queryset = Account.objects.all()
    serializer_class =  RegistrationSerializer
    

class AuthorizationConfirm(View):
    
    def get(self, request, *args, **kwargs):
        token = self.kwargs['token']
        user = Account.objects.get(conf_token = token)
        user.is_active = True
        user.conf_token = ''
        user.save()
        return redirect(settings.REACT_DOMEN)