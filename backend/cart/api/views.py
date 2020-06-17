from rest_framework import generics
from cart.api.serializers import OrderSerializer
from cart.models import Order
from account.models import Account

class OrderView(generics.ListAPIView):
    
    serializer_class = OrderSerializer

    def get_queryset(self):
        email = self.kwargs['email']
        if email == 'undefined':
            queryset = []
            data = {}
            data['total_price'] = 0
            data['total_count'] = 0
            data['items'] = []
            data['ref_code'] = None
            queryset.append(data)
        else:
            u = Account.objects.get(email = email)
            o = Order.objects.filter(owner = u).all()
            print(o)
            queryset = o
        return queryset


