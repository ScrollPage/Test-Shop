from django.shortcuts import render, get_object_or_404
from account.models import Account
from api.models import Product
from feedback.models import Comment
from django.http import HttpResponse
from feedback.help_funcs import get_or_create_anon_user, try_add_rate

def add_rate(request, **kwargs):
    if request.method == 'POST':
        data = request.POST
        uid = data['uid']
        email = data.get('email', False)
        if email == 'undefined':
            email = False
        rating = int(data['rating'])

        u = get_or_create_anon_user(email)[0]
        p = Product.objects.get(id = uid)
        response = try_add_rate(u, p, rating)
    else:
        response = HttpResponse('forbidden')

    return response

def create_comment(request):
    if request.method == 'POST':
        data = request.POST
        desc = data['description']
        email = data['email']
        rating = int(data['rating'])
        uid = data['uid']
        first_name = data['first_name']
        
        u = get_or_create_anon_user(email)[0]
        p = Product.objects.get(id = uid)
        response = try_add_rate(u, p, rating)

        c = Comment.objects.create(
            rating = rating,
            description = desc,
            first_name = first_name
        )

        p.comments.add(c)
        p.save()
    else:
        response = 'forbidden'

    return response