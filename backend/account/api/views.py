from rest_framework import generics
from account.api.serializers import RegistrationSerializer
from account.models import Account, MyToken
from rest_framework import generics
from django.views import View
from django.shortcuts import redirect, get_object_or_404
from django.conf import settings
from django.utils import timezone
from datetime import timedelta


class RegistrationView(generics.CreateAPIView):

    queryset = Account.objects.all()
    serializer_class =  RegistrationSerializer
    
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
        t.delete()
        return redirect(settings.REACT_DOMEN)