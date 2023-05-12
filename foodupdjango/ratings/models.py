from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.utils import timezone
import os
import uuid

def get_unique_image_filename(instance, filename):
    # Generate a unique identifier for the filename
    unique_filename = uuid.uuid4().hex
    # Get the file extension from the original filename
    _, ext = os.path.splitext(filename)
    # Concatenate the unique filename and the file extension
    new_filename = f"{unique_filename}{ext}"
    # Return the new filename
    return new_filename
class Post(models.Model):
    userid_posted = models.IntegerField(blank = True)
    image = models.ImageField(upload_to=get_unique_image_filename, blank=True)
    image_preview = models.ImageField(upload_to=get_unique_image_filename, blank=True)
    rating = models.IntegerField(blank = True)
    comment = models.TextField(max_length=500, blank = True)
    restaurant_id = models.IntegerField(blank = True)
    created_at = models.DateTimeField(auto_now_add=True)
class User(models.Model):
    username = models.TextField(blank = True)
    telephone = PhoneNumberField(blank=True)
    email = models.EmailField(blank=True)
    active = models.BooleanField(default=True)
    user_firstname = models.TextField(blank = True)
    user_lastname = models.TextField(blank = True)

class Restaurant(models.Model):
    def generate_qr_id():
        return uuid.uuid4().hex
    restaurant_name = models.TextField(blank = True)
    image_url = models.TextField(blank = True)
    latitude_gps = models.TextField(blank = True)
    longitude_gps = models.TextField(blank = True)
    timestamp_gps = models.TextField(blank = True)
    telephone = PhoneNumberField(blank=True)
    email = models.EmailField(blank=True)
    website = models.TextField(blank = True)
    instagram = models.TextField(blank = True)
    facebook = models.TextField(blank = True)
    street = models.TextField(blank=True)
    zip = models.TextField(blank=True)
    city = models.TextField(blank=True)
    average_rating = models.TextField(blank=True)
    userid = models.ForeignKey(User, on_delete=models.CASCADE, default=43)
    qr_id = models.CharField(max_length=32, default=generate_qr_id)
    tags = models.JSONField(default=dict)
    active = models.BooleanField(default=False)

class Like(models.Model):
    userid = models.ForeignKey(User, on_delete=models.CASCADE)
    restaurantid = models.ForeignKey(Restaurant, on_delete=models.CASCADE, blank=True, null=True)
    commentid = models.ForeignKey(Post, on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class ActivationCode(models.Model):
    email = models.EmailField(blank=True)
    code = models.CharField(max_length=5)
    phone = PhoneNumberField(blank=True)