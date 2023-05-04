# calculate_average_rating.py

from django.core.management.base import BaseCommand
from ratings.models import Restaurant, Post
from django.db.models import Avg

class Command(BaseCommand):
    help = 'Calculate average rating for restaurants'

    def handle(self, *args, **options):
        # Get all restaurants
        restaurants = Restaurant.objects.all()

        # Iterate over each restaurant
        for restaurant in restaurants:
            # Calculate average rating using related posts
            average_rating = Post.objects.filter(restaurant_id=restaurant.id).aggregate(Avg('rating'))['rating__avg']
            average_rating = round(average_rating, 1) if average_rating else None
            # Update the average_rating field in the restaurant model
            restaurant.average_rating = average_rating
            print("Average rating for is", restaurant, average_rating)
            restaurant.save()

        self.stdout.write(self.style.SUCCESS('Average ratings calculated successfully.'))
