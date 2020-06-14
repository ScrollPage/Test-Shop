from django.urls import path
from cart.api import views as api_views

urlpatterns = [
    path('get_order/<email>', api_views.OrderView.as_view(), name = 'order_view')
]