from django.contrib import admin
from api.models import Product, ProductCount

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
	list_display = ('categoryId', 'name', 'description', 'price')

@admin.register(ProductCount)
class ProductCountAdmin(admin.ModelAdmin):
	list_display = ("total",)
