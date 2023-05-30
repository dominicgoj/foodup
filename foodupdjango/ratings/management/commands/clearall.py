from django.core.management.base import BaseCommand, CommandError
from django.core.management import call_command

class Command(BaseCommand):
    help = 'Executes all clear commands.'

    def handle(self, *args, **options):
        # Call individual management commands
        call_command('clearactivationcodes')
        call_command('clearlikes')
        call_command('clearlogindata')
        call_command('clearnotifications')
        call_command('clearposts')
        call_command('clearrestaurantlikes')
        call_command('clearrestaurants')
        call_command('clearstatics')
        call_command('clearusers')
        # Add more call_command() statements for additional commands

        self.stdout.write(self.style.SUCCESS('All clear commands executed successfully.'))
