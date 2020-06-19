from django.urls import path
from account.api import views as api_views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('register', api_views.RegistrationView.as_view(), name = 'register'),
    path('login', obtain_auth_token, name = 'login'),
    path('authorization_confirm/<token>', api_views.AuthorizationConfirm.as_view(), name = 'confirm'),
    path('api/<email>', api_views.UserOverView.as_view(), name = 'over_view'),
    path('data_change/<email>', api_views.UserDataChange.as_view(), name = 'data_change')
]