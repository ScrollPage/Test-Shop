from django.urls import path
from account.api import views as api_views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('register', api_views.RegistrationView.as_view(), name = 'register'),
    path('login', obtain_auth_token, name = 'login'),
]