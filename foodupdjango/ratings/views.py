from django.shortcuts import render
from rest_framework import generics
from .models import Post, Restaurant, User, Like
from .serializers import PostSerializer, RestaurantSerializer, UserSerializer, LikeSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.utils.decorators import method_decorator
from django.db.models import F
from math import radians, sin, cos, sqrt, atan2



class PostList(generics.ListCreateAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        restaurant_id = self.request.GET.get('restaurant_id')
        user_id = self.request.GET.get('userid_posted')
        sort_by = self.request.GET.get('sort')  # Get the sort parameter

        queryset = Post.objects.all()
        if restaurant_id and user_id:
            queryset = queryset.filter(restaurant_id=restaurant_id, userid_posted=user_id)
            
        if restaurant_id:
            queryset = queryset.filter(restaurant_id=restaurant_id)
            
        elif user_id:
            queryset = queryset.filter(userid_posted=user_id)
        
        # Apply sorting if sort_by parameter is provided
        if sort_by:
            queryset = queryset.order_by('-created_at')
        return queryset
class PostDelete(generics.DestroyAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    lookup_field = 'userid_posted'  # Use 'userid_posted' as the lookup field
    
    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        userid_posted = self.request.GET.get('userid_posted')
        
        if userid_posted:
            obj = queryset.filter(userid_posted=userid_posted).first()
            return obj
        
        return None
        
class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
class RestaurantList(generics.ListCreateAPIView):
    serializer_class = RestaurantSerializer
    queryset = Restaurant.objects.all()

    def get(self, request):
        qr_id = self.request.GET.get('qr_id')
        
        if qr_id:
            try:
                restaurant = self.get_queryset().get(qr_id=qr_id)
                serializer = self.get_serializer(restaurant)
                return Response(serializer.data)
            except Restaurant.DoesNotExist:
                return Response("Restaurant not found", status=status.HTTP_404_NOT_FOUND)
        
        else:
            restaurants = self.get_queryset()
            serializer = self.get_serializer(restaurants, many=True)
            return Response(serializer.data)
class RestaurantSearch(generics.ListCreateAPIView):
    serializer_class = RestaurantSerializer
    queryset = Restaurant.objects.all()
    
    def get(self, request):
        restaurant_name = self.request.GET.get('restaurant_name')
        restaurant_id = self.request.GET.get('id')
        if restaurant_name:
                restaurants = self.get_queryset().filter(restaurant_name__icontains=restaurant_name)
                serializer = self.get_serializer(restaurants, many=True)
                return Response(serializer.data)
        if restaurant_id:
            restaurants = self.get_queryset().filter(id=restaurant_id)
            serializer = self.get_serializer(restaurants, many=True)
            return Response(serializer.data)

class RestaurantDistance(APIView):
    serializer_class = RestaurantSerializer

    def calculate_distance(self, lat1, lon1, lat2, lon2):
        # Convert coordinates from degrees to radians
        lat1_rad = radians(lat1)
        lon1_rad = radians(lon1)
        lat2_rad = radians(lat2)
        lon2_rad = radians(lon2)

        # Haversine formula
        dlon = lon2_rad - lon1_rad
        dlat = lat2_rad - lat1_rad
        a = sin(dlat / 2)**2 + cos(lat1_rad) * cos(lat2_rad) * sin(dlon / 2)**2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))
        distance = 6371 * c  # Radius of the Earth in kilometers

        return distance
    
    def get(self, request):
        user_latitude = float(request.GET.get('user_latitude'))
        user_longitude = float(request.GET.get('user_longitude'))
        
        restaurants = Restaurant.objects.all()
        serialized_restaurants = self.serializer_class(restaurants, many=True).data

        for restaurant in serialized_restaurants:
            restaurant_latitude = restaurant['latitude_gps']
            restaurant_longitude = restaurant['longitude_gps']

            distance = self.calculate_distance(
                user_latitude, user_longitude, float(restaurant_latitude), float(restaurant_longitude)
            )
            restaurant['distance'] = distance

        return Response(serialized_restaurants)

        


class RestaurantDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    

class UserList(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class SearchUser(generics.ListAPIView):
    serializer_class = UserSerializer
    def get_queryset(self):
        telephone = self.request.GET.get('telephone')
        email = self.request.GET.get('email')
        
        if telephone:
            queryset = User.objects.filter(telephone=telephone)
            
        elif email:
            queryset = User.objects.filter(email=email)
           
        else:
            queryset = User.objects.all()
            
        return queryset
    
class CreateUser(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            print(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreatePost(APIView):
    def post(self, request):
        print("Requested data", request.data)
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class UserDelete(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class LikeList(generics.ListCreateAPIView):
    serializer_class = LikeSerializer
    def get_queryset(self):
        user_id = self.request.GET.get('userid')
        restaurant_id = self.request.GET.get('restaurantid')
        comment_id = self.request.GET.get('commentid')

        if user_id and restaurant_id and comment_id:
            queryset = Like.objects.filter(userid=user_id, restaurantid=restaurant_id, commentid=comment_id)
        elif user_id:
            queryset = Like.objects.filter(userid=user_id)
        else:
            queryset = Like.objects.all()

        return queryset
    
class LikeDeleteView(APIView):
    def delete(self, request):
        user_id = request.GET.get('userid')
        restaurant_id = request.GET.get('restaurantid')
        comment_id = request.GET.get('commentid')

        try:
            like_instance = Like.objects.get(userid=user_id, restaurantid=restaurant_id, commentid=comment_id)
            like_instance.delete()
            return Response(status=204)  # Success response
        except Like.DoesNotExist:
            return Response(status=404)  # Not found response
    
class LikeCreateView(APIView):
    def post(self, request):
        user_id = request.data.get('userid')
        restaurant_id = request.data.get('restaurantid')
        comment_id = request.data.get('commentid')

        # Validate the required fields (user_id, restaurant_id, comment_id)
        if not (user_id and restaurant_id and comment_id):
            return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new Like instance
        like_data = {
            'userid': user_id,
            'restaurantid': restaurant_id,
            'commentid': comment_id,
            # Add other fields if needed
        }
        serializer = LikeSerializer(data=like_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LikeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    
# Create your views here.
