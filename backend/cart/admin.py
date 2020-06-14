from django.contrib import admin
from cart.models import Order, OrderItem

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
	list_display = ('owner', 'is_ordered', 'total')

@admin.register(OrderItem)
class OrerItemAdmin(admin.ModelAdmin):
	list_display = ('product', 'date_added')