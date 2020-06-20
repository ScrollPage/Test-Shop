from account.models import  Account
from rest_framework import status
from django.http import HttpResponse

def password_change(request):
    if request.method == 'POST':
        data = request.POST
        email = data['email']
        password = data['password']
        try:
            u = Account.objects.get(email = email)
        except Account.DoesNotExist:
            return HttpResponse(f'User {email} is Not Found', status = status.HTTP_404_NOT_FOUND)
        u.set_password(password)
        u.save()
        return HttpResponse(status = status.HTTP_202_ACCEPTED)
    else:
        return HttpResponse(status = status.HTTP_405_METHOD_NOT_ALLOWED)