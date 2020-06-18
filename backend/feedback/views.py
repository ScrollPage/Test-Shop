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
        rating = data['rating']

        u = get_or_create_anon_user(email)
        p = Product.objects.get(id = uid)
        response = try_add_rate(u, p, rating)
    else:
        response = 'forbidden'

    return response

def create_comment(request):
    if request.method == 'POST':
        data = request.POST
        desc = data['description']
        email = data['email']
        rating = data['rating']
        uid = data['uid']
        first_name = data['first_name']
        
        u = get_or_create_anon_user(email)
        p = Product.objects.get(id = uid)

        response = try_add_rate(u, p, rating)

        c = Comment(
            rating = rating,
            description = desc,
            first_name = first_name
        )

        p.comment.add(c)
        p.save()
    else:
        response = 'forbidden'

    return response