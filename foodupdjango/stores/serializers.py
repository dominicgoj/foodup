from rest_framework import serializers
from .models import Restaurants
from rest_framework.reverse import reverse

class RestaurantListSerializer(serializers.ModelSerializer):
    absolute_url = serializers.SerializerMethodField()
    class Meta:
        model = Restaurants
        fields = [
            'id',
            'logo_image',
            'restaurant_name',
            'city',
            'zip_code',
            'website',
            'rating',
            'absolute_url'
        ]
    def get_absolute_url(self, obj):
        return reverse('restaurant_detail', args=(obj.pk, ))
class RestaurantDetailSerializer(serializers.ModelSerializer):
    update = serializers.SerializerMethodField()
    delete = serializers.SerializerMethodField()
    class Meta:
        model = Restaurants
        fields = [
            'id',
            'logo_image',
            'restaurant_name',
            'street',
            'city',
            'zip_code',
            'website',
            'description',
            'email',
            'active',
            'update',
            'delete',
        ]
    def get_update(self, obj):
        return reverse("restaurant_update", args=(obj.pk, ))
    def get_delete(self, obj):
        return reverse("restaurant_delete", args=(obj.pk, ))