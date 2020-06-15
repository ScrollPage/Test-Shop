from django.urls import path
from cart.views import add_to_cart, delete_from_cart, clear_cart

urlpatterns = [
    path('add/', add_to_cart, name = 'add'),
    path('remove/', delete_from_cart, name = 'delete'),
    path('clear/', clear_cart, name = 'clear')
]
