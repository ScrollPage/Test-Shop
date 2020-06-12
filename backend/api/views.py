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

		try:
			page = int(page) - 1
		except:
			page = 0
		try:
			amount = int(amount)
		except:
			amount = 6

		categoryId = categoryId.split(",")

		if len(categoryId) == 5:
			queryset = Product.objects.all()
			queryset = f(page, amount, queryset)
		elif categoryId[0] == "null":
			queryset = []
		else:
			queryset1 = transform_cat(categoryId)
			queryset = f(page, amount, queryset1)

		return queryset


class SingleProductView(generics.ListAPIView):
	serializer_class = ProductSerializer

	def get_queryset(self):
		uid = self.kwargs["uid"]
		try:
			uid = int(uid)
		except:
			uid = 1

		queryset = Product.objects.filter(id = uid).all()

		return queryset

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

