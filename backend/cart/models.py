from django.db import models
from api.models import Product
from django.conf import settings
from account.models import Account


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete = models.SET_NULL, null = True)
    amount = models.IntegerField(default = 1)

    def __str__(self):
        return self.product.name

class Order(models.Model):
    ref_code = models.CharField(max_length = 15)
    owner = models.ForeignKey(Account, on_delete = models.SET_NULL, null = True)
    is_ordered = models.BooleanField(default = False)
    items = models.ManyToManyField(OrderItem)
    #payment_details = models.ForeignKey(Payment, null = True)
    date_ordered = models.DateTimeField(auto_now = True, null = True)
    status = models.CharField(max_length = 50, default = 'In progress')
    total = models.IntegerField(default = 0)

    def __str__(self):
        return f'{self.owner}, {self.ref_code}'

    def get_all_items(self):
        return self.items.all()