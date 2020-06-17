from django.db import models
from account.models import Account

class Comment(models.Model):
    owner = models.ForeignKey(Account, on_delete = models.DO_NOTHING)
    description = models.CharField(max_length = 500)
    rating = models.IntegerField(default = 0)

