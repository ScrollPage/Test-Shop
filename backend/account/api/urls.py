from django.urls import path
from account.api import views as api_views

urlpatterns = [
    path('register', api_views.RegistrationView.as_view(), name = 'register')
]