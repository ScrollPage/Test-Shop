from django.shortcuts import render, get_object_or_404
from api.models import Product
from account.models import Account
from cart.models import Order, OrderItem
from cart.help_funcs import generate_token
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

def add_to_cart(request):
    data = request.POST
    email = data['email']
    uid = data['uid']
    amount = int(data['amount'])
    u = get_object_or_404(Account, email = email)
    p = Product.objects.get(id = uid)
    user_order = Order.objects.get_or_create(owner = u)[0]

    order_item = user_order.items.filter(product = p).first()
    if order_item:
        pass
    else:
        order_item = user_order.items.create()
        order_item.product = p

    order_item.amount += amount
    order_item.save()
    
    user_order.total += p.price * amount
    ref_code = user_order.ref_code
    if ref_code == '':
        user_order.ref_code = generate_token(u.email)
    user_order.save()

    return HttpResponse('ok')

@csrf_exempt
def delete_from_cart(request):
    data = request.POST
    u = get_object_or_404(Account, email = data['email'])
    p = Product.objects.get(id = data['uid'])
    user_order = Order.get_or_create(owner = u)
    order_item = user_order.items.get(product = p)
    amount = int(data['amount'])
    if order_item.amount <= amount:
        order_item.delete()
    else:
        order_item.amount -= amount
        order_item.save()
    
    order_item.amount -= p.price * amount

@csrf_exempt
def clear_cart(request):
    data = request.POST
    order_to_clear = Order.objects.get(owner = data['email'])
    for item in order_to_clear.get_all_atems():
        item.delete()

