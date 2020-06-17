from django.shortcuts import render
from account.models import Account
from api.models import Product
from django.http import HttpResponse

def add_rate(request, **kwargs):
    data = request.POST
    uid = data['uid']
    email = data['email']
    rating = data['rating']

    u = Account.get(email = email)
    p = u.rated.filter(id = uid).all()

    if p:
        response = HttpRespone('refused')
    else:
        u.create(Product, id = uid)
        p = p.first()
        count = p.reviews
        new_rating = ((p.rating * count) + rating) / (count + 1)
        p.rating = round(new_rating, 1)
        p.reviews += 1
        p.save()
        response = HttpResponse('allowed')

    return response
        

