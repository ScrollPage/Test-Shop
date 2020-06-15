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
            'total_price', 
            'total_count',
            'date_ordered', 
            'date_created'
        ]
        depth = 2