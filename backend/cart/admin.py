from django.contrib import admin
from cart.models import Order, OrderItem

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
	list_display = ('owner', 'is_ordered', 'total_price', 'total_count')

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
	list_display = ('product', 'amount')