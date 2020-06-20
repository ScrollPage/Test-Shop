from account.models import  Account
from rest_framework import status
from rest_framework.response import Response

def password_change(request):
    if request.method == 'POST':
        data = request.POST
        email = data['email']
        password = data['password']
        try:
            u = Account.objects.get(email = email)
        except Account.DoesNotExist:
            return Response(f'User {email} is Not Found', status = status.HTTP_404_NOT_FOUND)
        u.set_password(password)
        u.save()
        return Response(status = status.HTTP_202_ACCEPTED)
    else:
        return Response(status = status.HTTP_405_METHOD_NOT_ALLOWED)