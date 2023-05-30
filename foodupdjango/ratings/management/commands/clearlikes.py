from django.core.management.base import BaseCommand
from ratings.models import Like

class Command(BaseCommand):
    help = 'Clears all instances of the Like model from the database.'

    def handle(self, *args, **options):
        Like.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Like instances cleared successfully.'))
