from rest_framework import serializers
from .models import Post, Restaurant, User, Like


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'userid_posted', 'image', 'rating', 'comment', 'restaurant_id', 'created_at']
        
class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'restaurant_name', 'image_url', 'latitude_gps', 'longitude_gps', 'timestamp_gps', 'telephone', 'email', 'website', 'instagram', 'facebook', 'street', 'zip', 'city', 'average_rating', 'qr_id']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'telephone', 'email', 'active', 'username']

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'userid', 'restaurantid', 'commentid', 'created_at']