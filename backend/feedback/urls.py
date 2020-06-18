from django.urls import path
from feedback import views

urlpatterns =[
    path('add_rating', views.add_rate, name = 'add_rate'),
    path('add_comment', views.create_comment, name = 'create_comment')
]