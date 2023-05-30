from django.core.management.base import BaseCommand
from ratings.models import LoginData

class Command(BaseCommand):
    help = 'Clears all instances of the LoginData model from the database.'

    def handle(self, *args, **options):
        LoginData.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('LoginData instances cleared successfully.'))
