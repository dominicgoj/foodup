import os
import shutil
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Clears files and directories in static/images.'

    def handle(self, *args, **options):
        directory = 'static/images'
        exceptions = ['blankuser']

        for root, dirs, files in os.walk(directory):
            for dir in dirs:
                if dir not in exceptions:
                    shutil.rmtree(os.path.join(root, dir))
                for file in files:
                    print(file)
                    if file not in exceptions:
                        print(file)
                        os.remove(os.path.join(root, file))

        self.stdout.write(self.style.SUCCESS('Static files cleared successfully.'))
