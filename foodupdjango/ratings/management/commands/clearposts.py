from django.core.management.base import BaseCommand
from ratings.models import Post

class Command(BaseCommand):
    help = 'Clears all instances of the Post model from the database.'

    def handle(self, *args, **options):
        Post.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Post instances cleared successfully.'))
