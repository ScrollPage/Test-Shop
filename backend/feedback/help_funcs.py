from account.models import Account
from cart.models import Order
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404

def get_or_create_anon_user(email):
    
    if email:
        u = Account.objects.get(email = email)
    else:
        u = Account.objects.create_user(email = 'anonym@anonym.com', first_name = '', last_name = '', phone_number = '')
        u.email = f'unlogged_{u.id}@anonym.com'
        u.is_active = True
        u.save()
    
    try:
        o = Order.objects.get(owner = u)
    except:
        o = Order.objects.create(owner = u)
    
    return (u, o)

def try_add_rate(u, p, rating):

    if u in p.rated.all():
        response = HttpResponse('refused')
    else:
        p.rated.add(u)
        count = p.reviews
        new_rating = ((p.rating * count) + rating) / (count + 1)
        p.rating = round(new_rating, 1)
        p.reviews += 1
        p.save()
        response = HttpResponse('allowed')

    return response