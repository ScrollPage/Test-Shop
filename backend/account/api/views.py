from django.shortcuts import render, redirect
from rest_framework import generics
from rest_framework import generics
from rest_framework.response import Response
from account.api.serializers import RegistrationSerializer
from rest_framework.authtoken.models import Token
from account.models import Account

class RegistrationView(generics.CreateAPIView):

    queryset = Account.objects.all()
    serializer_class = RegistrationSerializer

