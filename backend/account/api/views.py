from rest_framework import generics
from account.api.serializers import RegistrationSerializer, UserDataChangeSerializer
from account.models import Account, MyToken
from rest_framework import generics
from django.views import View
from django.shortcuts import redirect, get_object_or_404
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
from cart.models import Order
from rest_framework.response import Response
from rest_framework import status


class RegistrationView(generics.CreateAPIView):

    queryset = Account.objects.all()
    serializer_class =  RegistrationSerializer

class UserOverView(generics.ListAPIView):

    serializer_class =  RegistrationSerializer

    def get_queryset(self):
        email = self.kwargs['email']
        u = Account.objects.filter(email = email).all()
        return u

# confirms an acc and adds a cart to the confirmed acc
class AuthorizationConfirm(View):
    
    def get(self, request, *args, **kwargs):
        try:
            t = get_object_or_404(MyToken, token = self.kwargs['token'])
        except:
            return redirect(settings.REACT_DOMEN)
        time_now = timezone.now()
        if t.created > (time_now + timedelta(hours = 2)):
            t.delete()
            return redirect(settings.REACT_DOMEN)
        u = Account.objects.get(email = t.user)
        u.is_active = True
        u.save()
        Order.objects.create(owner = u)
        t.delete()
        return redirect(settings.REACT_DOMEN)

class UserDataChange(generics.GenericAPIView):

    serializer_class = UserDataChangeSerializer

    def get(self, request, email):
        try:
            u = Account.objects.get(email = email)
        except Account.DoesNotExist:
            return Response(f'User {email} is Not Found', status = status.HTTP_404_NOT_FOUND)
        serializer = UserDataChangeSerializer(u, many = False)
        return Response(serializer.data)

    def put(self, request, email):
        try:
            u = Account.objects.get(email = email)
        except Account.DoesNotExist:
            return Response(f'User {email} is Not Found', status = status.HTTP_404_NOT_FOUND)

        serializer = UserDataChangeSerializer(u, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer.data, status = status.HTTP_400_BAD_REQUEST)


