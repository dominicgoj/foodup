from django.core.management.base import BaseCommand
from ratings.models import Restaurant

class Command(BaseCommand):
    help = 'Clears all instances of the Post model from the database.'

    def handle(self, *args, **options):
        Restaurant.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Restaurant instances cleared successfully.'))
