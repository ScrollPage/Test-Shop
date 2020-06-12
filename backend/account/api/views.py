from django.shortcuts import render
from rest_framework import generics
from django.views import View
from rest_framework.response import Response
from account.api.serializers import RegistrationSerializer
from rest_framework.authtoken.models import Token

class RegistrationView(View):

    def post(self, request, *args, **kwargs):
        serializer = RegistrationSerializer(data = request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data["response"] = "Successfully created a new user!"
            data['email'] = account.email
            data['username'] = account.username
        else:
            data = serializer.errors
        
        return Response(data)

