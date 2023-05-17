from django.core.management.base import BaseCommand
from ratings.models import ActivationCode

class Command(BaseCommand):
    help = 'Clears all instances of the Post model from the database.'

    def handle(self, *args, **options):
        ActivationCode.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('ActivationCode instances cleared successfully.'))
