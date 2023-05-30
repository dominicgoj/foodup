from django.core.management.base import BaseCommand
from ratings.models import User

class Command(BaseCommand):
    help = 'Clears all instances of the User model from the database.'

    def handle(self, *args, **options):
        User.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('User instances cleared successfully.'))
