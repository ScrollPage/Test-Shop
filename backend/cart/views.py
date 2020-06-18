from django.shortcuts import render, get_object_or_404
from api.models import Product
from account.models import Account
from cart.models import Order, OrderItem
from cart.help_funcs import generate_token
from django.http import HttpResponse
from feedback.help_funcs import get_or_create_anon_user

def add_to_cart(request):
    data = request.POST
    email = data.get('email', False)
    if email == 'undefined':
        email = False
    uid = data['uid']
    amount = int(data['amount'])

    print(data)

    info = get_or_create_anon_user(email)

    u = info[0]
    user_order = info[1]
    p = Product.objects.get(id = uid)
    order_item = user_order.items.filter(product = p).first()

    if order_item:
        pass
    else:
        order_item = user_order.items.create()
        order_item.product = p

    order_item.amount += amount
    order_item.save()
    
    user_order.total_price += p.price * amount
    user_order.total_count += amount

    ref_code = user_order.ref_code
    if ref_code == '':
        user_order.ref_code = generate_token(u.email)
    user_order.save()

    if u.email.split('_')[0] == 'unlogged':
        response = HttpResponse(f'{u.email}')
    else:
        response = HttpResponse('added')

    return response

def delete_from_cart(request):
    data = request.POST
    email = data['email']
    uid = data['uid']
    amount = int(data['amount'])

    u = get_object_or_404(Account, email = email)
    p = Product.objects.get(id = uid)
    user_order = Order.objects.get(owner = u)
    order_item = user_order.items.filter(product = p).first()

    if order_item:
        if order_item.amount <= amount:
            order_item.delete()
        else:
            order_item.amount -= amount
            order_item.save()

        user_order.total_price -= p.price * amount
        user_order.total_count -= amount
        user_order.save()
        response = HttpResponse('successfully removed')
    else:
        respones = HttpResponse('no such item in basket')
    
    return response

def clear_cart(request):
    data = request.POST
    email = data['email']

    u = Account.objects.get(email = email)
    order_to_clear = Order.objects.get(owner = u)

    for item in order_to_clear.get_all_items():
       item.delete()
    
    order_to_clear.total_price = 0
    order_to_clear.total_count = 0
    order_to_clear.save() 
    
    return HttpResponse('cleared')