from django.urls import path
from feedback import views

urlpatterns =[
    path('rating', views.add_rate, name = 'add_rate'),
    path('comment', views.create_comment, name = 'create_comment')
]