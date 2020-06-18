from django.core.management import BaseCommand
from account.models import Account
from datetime import timedelta
from django.utils import timezone


class Command(BaseCommand):
	help = u"deletes users, whose been inactive for one year"

    def handle(self, *args, **options):

        users = Account.objects.all()
        for user in users:
            if user.last_login + timedelta(years = 1) < timezone.now():
                user.delete()