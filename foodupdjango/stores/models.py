from django.db import models
from django.core.validators import RegexValidator
# Create your models here.
class Restaurants(models.Model):
    restaurant_name = models.CharField(max_length=200, blank=False)
    street = models.CharField(max_length=400, blank=True)
    city = models.CharField(max_length=400, blank=True)
    zip_code = models.IntegerField(blank=True, default=0)
    state = models.CharField(max_length=2, null=True, blank=True)
    website = models.URLField(max_length=420, blank=True)
    comment = models.CharField(max_length=1000, blank=True)
    rating = models.IntegerField(blank=True, default=0)
    photo_url = models.CharField(max_length=400, blank=True)
    
    description = models.TextField(blank=True)
    logo_image = models.ImageField(upload_to='restaurantImages',
                                   blank=True,
                                   default="restaurantImages/restaurantlogo.png")
    email = models.EmailField(max_length=245, blank=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return "{}, {}".format(self.restaurant_name, self.city)