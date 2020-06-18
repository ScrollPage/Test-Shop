from django.db import models
from account.models import Account

class Comment(models.Model):
    first_name = models.CharField(max_length = 20, default = '')
    description = models.CharField(max_length = 400)
    rating = models.IntegerField(default = 5)
    date_commented = models.DateTimeField(auto_now_add = True, null = True)

