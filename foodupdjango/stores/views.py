from django.shortcuts import render
from rest_framework import generics
from .serializers import RestaurantListSerializer
from .serializers import RestaurantDetailSerializer
from .models import Restaurants

# Create your views here.

class RestaurantListAPIView(generics.ListAPIView):
    queryset = Restaurants.objects.all()
    serializer_class = RestaurantListSerializer
class RestaurantRetrieveAPIView(generics.RetrieveAPIView):
    lookup_field = "id"
    queryset = Restaurants.objects.all()
    serializer_class = RestaurantDetailSerializer

class RestaurantCreateAPIView(generics.CreateAPIView):
    queryset = Restaurants.objects.all()
    serializer_class = RestaurantDetailSerializer

class RestaurantRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    lookup_field = 'id'
    queryset = Restaurants.objects.all()
    serializer_class = RestaurantDetailSerializer
class RestaurantDestroyAPIView(generics.DestroyAPIView):
    lookup_field = 'id'
    queryset = Restaurants.objects.all()