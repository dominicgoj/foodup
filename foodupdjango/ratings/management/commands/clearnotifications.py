from django.core.management.base import BaseCommand
from ratings.models import Notification

class Command(BaseCommand):
    help = 'Clears all instances of the Notification model from the database.'

    def handle(self, *args, **options):
        Notification.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Notification instances cleared successfully.'))
