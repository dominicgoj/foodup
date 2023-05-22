from rest_framework import serializers
from .models import Post, Restaurant, User, Like, ActivationCode, RestaurantLike, LoginData


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'userid_posted', 'image', 'image_preview', 'rating', 'comment', 'restaurant_id', 'created_at', 'active']
        
class RestaurantSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')
        if request is not None:
            # Update the URL fields to include the full URL
            title_image_url = request.build_absolute_uri(instance.title_image.url)
            representation['title_image'] = title_image_url

            title_image_preview_url = request.build_absolute_uri(instance.title_image_preview.url)
            representation['title_image_preview'] = title_image_preview_url
        return representation
    class Meta:
        model = Restaurant
        fields = ['id', 'restaurant_name', 'title_image', 'title_image_preview', 'latitude_gps', 'longitude_gps', 'timestamp_gps', 'telephone', 'email', 'website', 'instagram', 'facebook', 'street', 'zip', 'city', 'average_rating', 'qr_id', 'userid', 'tags', 'active', 'description']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'telephone', 'email', 'active', 'username', 'user_firstname', 'user_lastname', 'profile_img']

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'userid', 'restaurantid', 'commentid', 'created_at', 'userid_got_like']

class ActivationCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivationCode
        fields = ['id', 'email', 'code', 'phone', 'active']

class RestaurantLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantLike
        fields = ['id', 'userid', 'restaurantid', 'created_at', 'active', 'modified_at']

class LoginDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginData
        fields = ['id', 'userid', 'created_at', 'model', 'latitude', 'longitude', 'is_connected', 'connection_type']

