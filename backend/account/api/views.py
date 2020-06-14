from rest_framework import generics
from account.api.serializers import RegistrationSerializer
from account.models import Account
from rest_framework import generics
from django.views import View
from django.shortcuts import redirect


class RegistrationView(generics.CreateAPIView):

    queryset = Account.objects.all()
    serializer_class =  RegistrationSerializer
    

class AuthorizationConfirm(View):
    
    def get(self, request, *args, **kwargs):
        token = self.kwargs['token']
        user = Account.objects.get(conf_token = token)
        user.is_active = True
        user.save()
        return redirect('http://localhost:3000')