from django.core.management import BaseCommand
from account.models import Account
from datetime import timedelta
from django.utils import timezone

class Command(BaseCommand):
	help = u"deletes those anonymous, who habe been inactive for a week"

    def handle(self, *args, **options):

        users = Account.objects.all()
        for user in users:
            if user.email.split('_')[0] == 'unlogged' and user.last_login + timedelta(days = 7) < timezone.now():
                user.delete()
