from django.shortcuts import render
from rest_framework import generics
from api.serializers import ProductSerializer, CountSerializer, ProductChangeSerializer
from api.models import Product, ProductCount
from api.help_classes import Categories
from api.help_funcs import f, transform_cat, make_searched
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status

class ProductListView(generics.ListAPIView):
	serializer_class = ProductSerializer

	def get_queryset(self):
		page = self.kwargs['page']
		amount = self.kwargs['amount']
		categoryId = self.kwargs['categoryId']
		search = self.kwargs['search'].lower()
		ordering = int(self.kwargs['ordering'])
		mini = int(self.kwargs['min'])
		maxi = int(self.kwargs['max'])
		

		if mini > maxi:
			mini, maxi = maxi, mini

		try:
			page = int(page) - 1
		except:
			page = 0
		try:
			amount = int(amount)
		except:
			amount = 6

		categoryId = categoryId.split(",")

		if ordering == 1:
			queryset = Product.objects.order_by('price')
		elif ordering == 2:
			queryset = Product.objects.order_by('-price')
		elif ordering == 3:
			queryset = Product.objects.order_by('-rating')
		else:
			queryset = Product.objects.all()

		queryset = queryset.filter(price__range = (mini, maxi))

		queryset = make_searched(search, queryset)
  
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
		search = self.kwargs["search"].lower()
		mini = int(self.kwargs['min'])
		maxi = int(self.kwargs['max'])
		categoryId = categoryId.split(",")

		
		if len(categoryId) == 5:
			queryset = Product.objects.filter(price__range = (mini, maxi))
			queryset = make_searched(search, queryset)
		elif categoryId[0] == "null":
			queryset = []
		else:
			queryset = Product.objects.filter(price__range = (mini, maxi))
			queryset = transform_cat(categoryId, queryset)
			queryset = make_searched(search, queryset)

		arr = [prod.price for prod in queryset]
		if len(arr) > 0:
			mini = min(arr)
			maxi = max(arr)

		queryset =	{
					'total': len(queryset),
					'mini': mini,
					'maxi': maxi,
				},

		return queryset

class AllProductsView(generics.ListAPIView):

	queryset = Product.objects.all()
	serializer_class = ProductChangeSerializer

class ProductDataChange(generics.GenericAPIView):

    serializer_class = ProductChangeSerializer

    def get(self, request, uid):
        try:
            p = Product.objects.get(id = uid)
        except Product.DoesNotExist:
            return Response(f'Product {uid} is Not Found', status = status.HTTP_404_NOT_FOUND)
        serializer = ProductChangeSerializer(p, many = False)
        return Response(serializer.data)

    def put(self, request, uid):
        try:
            p = Product.objects.get(id = uid)
        except Product.DoesNotExist:
            return Response(f'Product with id = {uid} is Not Found', status = status.HTTP_404_NOT_FOUND)

        serializer = ProductChangeSerializer(p, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer.data, status = status.HTTP_400_BAD_REQUEST)

