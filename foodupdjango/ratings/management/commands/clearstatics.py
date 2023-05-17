import os
import shutil
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Clears all files and directories in static/images.'

    def handle(self, *args, **options):
        # Specify the path to the static/images directory
        images_dir = 'static/images'

        # Iterate over all files and directories in the images_dir
        for root, dirs, files in os.walk(images_dir, topdown=False):
            # Remove all files
            for file in files:
                file_path = os.path.join(root, file)
                os.remove(file_path)

            # Remove all directories
            for dir_name in dirs:
                dir_path = os.path.join(root, dir_name)
                shutil.rmtree(dir_path)

        self.stdout.write(self.style.SUCCESS('Static files cleared successfully.'))
