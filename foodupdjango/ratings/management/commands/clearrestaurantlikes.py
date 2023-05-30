from django.core.management.base import BaseCommand
from ratings.models import RestaurantLike

class Command(BaseCommand):
    help = 'Clears all instances of the RestaurantLike model from the database.'

    def handle(self, *args, **options):
        RestaurantLike.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('RestaurantLike instances cleared successfully.'))
