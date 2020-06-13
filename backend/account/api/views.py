from account.api.serializers import RegistrationSerializer
from account.models import Account
from rest_framework import generics

class RegistrationView(generics.CreateAPIView):

    queryset = Account.objects.all()
    serializer_class =  RegistrationSerializer
    