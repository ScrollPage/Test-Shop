from django.shortcuts import render, get_object_or_404
from api.models import Product
from account.models import Account
from cart.models import Order, OrderItem
from cart.help_funcs import generate_token
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def add_to_cart(request):
    data = request.POST.get()
    print(data)
    u = get_object_or_404(Account, email = data['email'])
    p = Product.objects.get(id = data['uid'])
    user_order = Order.get_or_create(owner = u)
    try:
        order_item = user_order.items.get(product = p)
        amount = int(data['amount'])
        order_item.amount += amount
    except:
        order_item = user_order.items.create()
        order_item.amount = amount
        order_item.product = p
    order_item.save()
    
    user_order.total += p.price * amount
    ref_code = user.order.ref_code
    if ref_code == '':
        user_order.ref_code = generate_token(u.email)
    user.order.save()

@csrf_exempt
def delete_from_cart(request):
    data = request.POST.get()
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
    data = request.POST.get()
    order_to_clear = Order.objects.get(owner = data['email'])
    for item in order_to_clear.get_all_atems():
        item.delete()

