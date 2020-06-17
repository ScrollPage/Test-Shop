from django.db import models
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from random import randint
from feedback.models import Comment
from account.models import Account

class Product(models.Model):
	categoryId = models.IntegerField(default = 0)
	name = models.CharField(max_length = 50)
	description = models.CharField(max_length = 250)
	price = models.IntegerField(default = 0)
	image = models.CharField(max_length = 100)
	cpu = models.CharField(max_length = 100)
	camera = models.CharField(max_length = 100)
	size = models.CharField(max_length = 100)
	weight = models.CharField(max_length = 100)
	display = models.CharField(max_length = 100)
	battery = models.CharField(max_length = 100)
	memory = models.CharField(max_length = 100)
	rating = models.FloatField(default = 0)
	reviews = models.IntegerField(default = 0)
	comments = models.ManyToManyField(Comment)
	rated = models.ManyToManyField(Account)

class ProductCount(models.Model):
	total = models.IntegerField(default = 0)

@receiver(post_save, sender = Product)
def total_count_increase(instance, **kwargs):
	if kwargs["created"]:
		t = ProductCount.objects.first()
		t.total += 1
		t.save()

@receiver(post_delete, sender = Product)
def total_count_decrease(instance, **kwargs):
	t = ProductCount.objects.first()
	t.total -= 1
	t.save()




