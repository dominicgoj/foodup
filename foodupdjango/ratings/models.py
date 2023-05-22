from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.utils import timezone
import os
import uuid
import logging

logger = logging.getLogger(__name__)

def get_post_image_upload_path(instance, filename):
    # Get the user who posted the post
    try:
        user = User.objects.get(id=instance.userid_posted)
    except User.DoesNotExist:
        # Handle the case where the user does not exist
        return ''
    # Get the path to the user's post directory
    user_post_path = "posts/posts_"+str(instance.userid_posted)
    # Generate a unique identifier for the filename
    unique_filename = uuid.uuid4().hex
    # Get the file extension from the original filename
    _, ext = os.path.splitext(filename)
    # Concatenate the unique filename and the file extension
    new_filename = f"{unique_filename}{ext}"
    # Join the path to the user's post directory with the new filename

    joined_path = os.path.join(user_post_path, new_filename)
    return(joined_path)

def get_restaurant_image_upload_path(instance, filename):
    # Get the user who posted the post
    restaurant_post_path = "restaurants/restaurant_"+str(instance.id)
    # Generate a unique identifier for the filename
    unique_filename = uuid.uuid4().hex
    # Get the file extension from the original filename
    _, ext = os.path.splitext(filename)
    # Concatenate the unique filename and the file extension
    new_filename = f"{unique_filename}{ext}"
    # Join the path to the user's post directory with the new filename

    joined_path = os.path.join(restaurant_post_path, new_filename)
    return(joined_path)

def get_profile_image_upload_path(instance, filename):
    # Get the user who posted the post
    profile_post_path = "users/user"+str(instance.id)
    # Generate a unique identifier for the filename
    unique_filename = uuid.uuid4().hex
    # Get the file extension from the original filename
    _, ext = os.path.splitext(filename)
    # Concatenate the unique filename and the file extension
    new_filename = f"{unique_filename}{ext}"
    # Join the path to the user's post directory with the new filename

    joined_path = os.path.join(profile_post_path, new_filename)
    return(joined_path)
    

class Post(models.Model):
    userid_posted = models.IntegerField(blank = True)
    image = models.ImageField(upload_to=get_post_image_upload_path, blank=True)
    image_preview = models.ImageField(upload_to=get_post_image_upload_path, blank=True)
    rating = models.IntegerField(blank = True, default=0)
    comment = models.TextField(max_length=500, blank = True)
    restaurant_id = models.IntegerField(blank = True)
    created_at = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)
class User(models.Model):
    username = models.TextField(blank = True)
    telephone = PhoneNumberField(blank=True)
    email = models.EmailField(blank=True)
    active = models.BooleanField(default=True)
    user_firstname = models.TextField(blank = True)
    user_lastname = models.TextField(blank = True)
    profile_img = models.ImageField(upload_to=get_profile_image_upload_path, blank=True, default="users/blankuser/profile_image.png")
    created_at = models.DateField(auto_now_add=True)

class Restaurant(models.Model):
    def generate_qr_id():
        return uuid.uuid4().hex
    restaurant_name = models.TextField(blank = True)
    title_image = models.ImageField(blank=True)
    title_image_preview = models.ImageField(blank=True)
    latitude_gps = models.TextField(blank = True)
    longitude_gps = models.TextField(blank = True)
    timestamp_gps = models.TextField(blank = True)
    telephone = PhoneNumberField(blank=True)
    description = models.TextField(blank=True, max_length=500)
    email = models.EmailField(blank=True)
    website = models.TextField(blank = True)
    instagram = models.TextField(blank = True)
    facebook = models.TextField(blank = True)
    street = models.TextField(blank=True)
    zip = models.TextField(blank=True)
    city = models.TextField(blank=True)
    average_rating = models.TextField(blank=True)
    userid = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    qr_id = models.CharField(max_length=32, default=generate_qr_id)
    tags = models.JSONField(default=dict)
    active = models.BooleanField(default=False)

class RestaurantLike(models.Model):
    userid = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    restaurantid = models.ForeignKey(Restaurant, on_delete=models.CASCADE, default=16)
    created_at = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)
    modified_at = models.DateTimeField(auto_now=True)

class Like(models.Model):
    userid = models.ForeignKey(User, on_delete=models.CASCADE)
    restaurantid = models.ForeignKey(Restaurant, on_delete=models.CASCADE, blank=True, null=True)
    commentid = models.ForeignKey(Post, on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    userid_got_like = models.ForeignKey(User, on_delete=models.CASCADE, default=1, related_name='userid_got_like')

class ActivationCode(models.Model):
    email = models.EmailField(blank=True)
    code = models.CharField(max_length=5)
    phone = PhoneNumberField(blank=True)
    active = models.BooleanField(default=True)

class LoginData(models.Model):
    userid = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    model = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    is_connected = models.BooleanField()
    connection_type = models.CharField(max_length=100)

