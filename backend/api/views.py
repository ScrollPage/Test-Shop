from django.shortcuts import render
from rest_framework import generics
from api.serializers import ProductSerializer, CountSerializer
from api.models import Product, ProductCount
from api.help_classes import Categories
from api.help_funcs import f, transform_cat

class ProductListView(generics.ListAPIView):
	serializer_class = ProductSerializer

	def get_queryset(self):
		page = self.kwargs["page"]
		amount = self.kwargs["amount"]
		categoryId = self.kwargs["categoryId"]
		search = self.kwargs["search"].lower()

		try:
			page = int(page) - 1
		except:
			page = 0
		try:
			amount = int(amount)
		except:
			amount = 6

		categoryId = categoryId.split(",")
		queryset = Product.objects.all()

		if search != "null":
			queryset1 = []
			for product in queryset:
				if search in product.name.lower():
					queryset1.append(product)
			queryset = queryset1
  
		if len(categoryId) == 5:
			queryset = f(page, amount, queryset)
		elif categoryId[0] == "null":
			queryset = []
		else:
			queryset1 = transform_cat(categoryId, queryset)
			queryset = f(page, amount, queryset1)

		return queryset

class SingleProductView(generics.RetrieveAPIView):
    
	queryset = Product.objects.all()
	serializer_class = ProductSerializer

class ProductsCountView(generics.ListAPIView):
    
	serializer_class = CountSerializer

	def get_queryset(self):
		categoryId = self.kwargs["categoryId"]
		categoryId = categoryId.split(",")
		
		if len(categoryId) == 5:
			queryset = ProductCount.objects.all()
		elif categoryId[0] == "null":
			queryset = [
				{
					"total": 0,
				}
			]
		else:
			queryset1 = transform_cat(categoryId)
			queryset = [
				{
					"total": len(queryset1),
				}
			]

		return queryset

