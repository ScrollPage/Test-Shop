from django.shortcuts import render
from account.models import Account
from api.models import Product
from django.http import HttpResponse

def add_rate(request, **kwargs):
    data = request.POST
    uid = data['uid']
    email = data['email']
    rating = data['rating']

    p = Product.objects.get(id = uid)
    u = p.rated.filter(email = email).all()

    if len(u) == 1:
        response = HttpRespone('refused')
    else:
        u = Account.objects.het(email = email)
        p.rated.add(Account = u)
        count = p.reviews
        new_rating = ((p.rating * count) + rating) / (count + 1)
        p.rating = round(new_rating, 1)
        p.reviews += 1
        p.save()
        response = HttpResponse('allowed')

    return response
        

