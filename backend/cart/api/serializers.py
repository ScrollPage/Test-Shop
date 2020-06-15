from rest_framework import serializers
from cart.models import Order

class OrderSerializer(serializers.ModelSerializer):

    class Meta():
        model = Order
        fields = [
            'owner', 
            'ref_code', 
            'status', 
            'is_ordered', 
            'items', 
            'total', 
            'date_ordered', 
            'date_created'
        ]
        depth = 2