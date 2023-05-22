from django.shortcuts import render
from rest_framework import generics
from django.core.files.uploadedfile import InMemoryUploadedFile
from .models import Post, Restaurant, User, Like, ActivationCode, RestaurantLike, LoginData
from .serializers import (
    PostSerializer,
    RestaurantSerializer,
    UserSerializer,
    LikeSerializer,
    ActivationCodeSerializer,
    RestaurantLikeSerializer,
    LoginDataSerializer
)
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.utils.decorators import method_decorator
from django.db.models import F
from math import radians, sin, cos, sqrt, atan2
from django.shortcuts import render, HttpResponse
from django.core.mail import EmailMultiAlternatives
from django.db.models import Q
import random
import json
import os
import boto3
from django.core.files.storage import default_storage
from django.http import JsonResponse
from PIL import Image, ImageOps
import io
from django.core.files.base import ContentFile
from .models import User
from django.template.loader import render_to_string
from django.conf import settings
import mimetypes
from django.utils import timezone
os.environ["AWS_ACCESS_KEY_ID"] = "AKIA34HPQHKM7C3GQBPC"
os.environ["AWS_SECRET_ACCESS_KEY"] = "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"
region_name = "eu-north-1"
validPhoneNo = "+4367762781271"


def getAWSCreds():
    file_path = os.path.join(os.path.dirname(__file__), "aws_specifics.json")
    with open(file_path, "r") as config_file:
        config = json.load(config_file)

    # Extract the AWS access credentials and region
    access_key_id = config["aws_access_key_id"]
    secret_access_key = config["aws_secret_access_key"]
    region = config["aws_region"]

    return access_key_id, secret_access_key, region


class PostList(generics.ListCreateAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        restaurant_id = self.request.GET.get("restaurant_id")
        user_id = self.request.GET.get("userid_posted")
        sort_by = self.request.GET.get("sort")  # Get the sort parameter
        active = self.request.GET.get("active")

        queryset = Post.objects.all()
        if active is not None:  # Check if active parameter is provided
            if active.lower() == "true":
                queryset = queryset.filter(active=True)
            elif active.lower() == "false":
                queryset = queryset.filter(active=False)

        if restaurant_id and user_id:
            queryset = queryset.filter(
                restaurant_id=restaurant_id, userid_posted=user_id
            )

        if restaurant_id:
            queryset = queryset.filter(restaurant_id=restaurant_id)

        elif user_id:
            queryset = queryset.filter(userid_posted=user_id)

        # Apply sorting if sort_by parameter is provided
        if sort_by:
            queryset = queryset.order_by("-created_at")
        return queryset


class AllPostList(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class PostDelete(generics.DestroyAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    lookup_field = "userid_posted"  # Use 'userid_posted' as the lookup field

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        userid_posted = self.request.GET.get("userid_posted")

        if userid_posted:
            obj = queryset.filter(userid_posted=userid_posted).first()
            return obj

        return None


class PostSetInactive(APIView):
    def post(self, request):
        post_id = request.data.get("id")  # Retrieve the 'id' from request.data
        if post_id:
            try:
                post = Post.objects.get(id=post_id)
                post.active = False
                post.save()
                return Response({"message": "Post set inactive successfully."})
            except Post.DoesNotExist:
                return Response({"message": "Post not found."}, status=404)
        else:
            return Response({"message": "Invalid request."}, status=400)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class RestaurantActiveAndInactive(generics.ListCreateAPIView):
    serializer_class = RestaurantSerializer
    queryset = Restaurant.objects.all()


class RestaurantList(generics.ListCreateAPIView):
    serializer_class = RestaurantSerializer
    queryset = Restaurant.objects.filter(active=True)

    def get(self, request):
        qr_id = self.request.GET.get("qr_id")

        if qr_id:
            try:
                restaurant = self.get_queryset().get(qr_id=qr_id)
                serializer = self.get_serializer(restaurant)
                return Response(serializer.data)
            except Restaurant.DoesNotExist:
                return Response(
                    "Restaurant not found", status=status.HTTP_404_NOT_FOUND
                )

        else:
            restaurants = self.get_queryset()
            serializer = self.get_serializer(restaurants, many=True)
            return Response(serializer.data)


class RestaurantSearch(generics.ListCreateAPIView):
    serializer_class = RestaurantSerializer
    queryset = Restaurant.objects.all()  # Start with all restaurants

    def get(self, request):
        restaurant_name = self.request.GET.get("restaurant_name")
        restaurant_id = self.request.GET.get("id")
        userid = self.request.GET.get("userid")

        if userid:
            restaurants = self.queryset.filter(userid=userid)
        else:
            restaurants = self.queryset.filter(active=True)

            if restaurant_name:
                restaurants = restaurants.filter(
                    Q(restaurant_name__icontains=restaurant_name)
                    | Q(tags__icontains=restaurant_name)
                )

            if restaurant_id:
                restaurants = restaurants.filter(id=restaurant_id)

        serializer = self.get_serializer(restaurants, many=True)
        return Response(serializer.data)


class RestaurantDelete(generics.DestroyAPIView):
    def get(self, request):
        restaurant_id = self.request.GET.get("id")

class RestaurantSearchByTags(APIView):
    def calculate_distance(self, lat1, lon1, lat2, lon2):
        # Convert coordinates from degrees to radians
        lat1_rad = radians(lat1)
        lon1_rad = radians(lon1)
        lat2_rad = radians(lat2)
        lon2_rad = radians(lon2)

        # Haversine formula
        dlon = lon2_rad - lon1_rad
        dlat = lat2_rad - lat1_rad
        a = sin(dlat / 2) ** 2 + cos(lat1_rad) * cos(lat2_rad) * sin(dlon / 2) ** 2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))
        distance = 6371 * c  # Radius of the Earth in kilometers

        return distance

    def get_queryset(self, search_tags):
        queryset = Restaurant.objects.all()

        if search_tags:
            query = Q()
            for tag in search_tags:
                query |= Q(tags__icontains=tag)  # Assuming "tags" is a TextField or CharField

            queryset = queryset.filter(query)

        return queryset

    def get(self, request):
        user_latitude = request.GET.get("user_latitude")
        user_longitude = request.GET.get("user_longitude")
        search_tags = request.GET.get("search", "").split()  # Split the search tags into a list

        queryset = self.get_queryset(search_tags)

        if user_latitude and user_longitude:
            queryset = queryset.filter(active=True)
            serialized_restaurants = RestaurantSerializer(queryset, many=True).data

            for restaurant in serialized_restaurants:
                restaurant_latitude = restaurant["latitude_gps"]
                restaurant_longitude = restaurant["longitude_gps"]

                if restaurant_latitude and restaurant_longitude:
                    distance = self.calculate_distance(
                        float(user_latitude),
                        float(user_longitude),
                        float(restaurant_latitude),
                        float(restaurant_longitude),
                    )
                    restaurant["distance"] = distance

            return Response(serialized_restaurants)

        serializer = RestaurantSerializer(queryset, many=True)
        return Response(serializer.data)

class RestaurantCreate(APIView):
    def post(self, request):
        restaurant_serializer = RestaurantSerializer(data=request.data)
        
        if restaurant_serializer.is_valid():
            restaurant = restaurant_serializer.save()
            restaurant_id = restaurant_serializer.instance.id
            folder_name = f"restaurant_{restaurant_id}"
            folder_path = os.path.join("static/images/posts/", folder_name)

            # Create the folder if it doesn't exist
            if not os.path.exists(folder_path):
                os.makedirs(folder_path)

            # Save the uploaded images to the appropriate fields
            image_files = request.FILES.getlist('image')
            for i, image_file in enumerate(image_files):
                # Generate a unique filename for the image
                unique_filename = f"photo{i + 1}.jpg"
                image_path = os.path.join(folder_path, unique_filename)
                with open(image_path, 'wb') as file:
                    for chunk in image_file.chunks():
                        file.write(chunk)

                # Update the corresponding field in the model
                if i == 0:
                    restaurant.image_url = image_path
                elif i == 1:
                    restaurant.image_preview_url = image_path

            restaurant.save()

            return Response(restaurant_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(restaurant_serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class CreateRestaurant(APIView):
    def post(self, request, *args, **kwargs):
        # Access the form data
        city = request.POST.get('city')
        email = request.POST.get('email')
        title_image = request.FILES['title_image']
        title_image_preview = request.FILES['title_image_preview']
        restaurant_name = request.POST.get('restaurant_name')
        street = request.POST.get('street')
        tags = request.POST.get('tags')
        telephone = request.POST.get('telephone')
        website = request.POST.get('website')
        zip_code = request.POST.get('zip')
        description = request.POST.get('description')
        userid = request.POST.get('userid')
        
        try:
            user = User.objects.get(id=userid)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        
        # Create the restaurant instance
        restaurant = Restaurant(
            restaurant_name=restaurant_name,
            street=street,
            city=city,
            zip=zip_code,
            email=email,
            telephone=telephone,
            website=website,
            tags=tags,
            description=description,
            userid=user
        )
        
        # Save the restaurant instance
        restaurant.save()
        restaurant_id = restaurant.id
        folder_path = os.path.join(settings.MEDIA_ROOT, 'restaurants', str(restaurant_id))
        os.makedirs(folder_path, exist_ok=True)
        
        # Save the title image
        # Open the title image using Pillow
        title_img = Image.open(title_image)
        title_img = ImageOps.exif_transpose(title_img)
        
        # Resize the title image if needed
        title_max_width = 800
        if title_img.width > title_max_width:
            title_aspect_ratio = title_max_width / float(title_img.width)
            title_height = int(title_aspect_ratio * title_img.height)
            title_img = title_img.resize((title_max_width, title_height), Image.ANTIALIAS)

        
        # Compress the title image by reducing the quality
        title_img_io = io.BytesIO()
        title_img.save(title_img_io, format='JPEG', quality=80)
        
        # Save the compressed title image to the desired location
        title_image_path = os.path.join(folder_path, "title_image.jpg")
        default_storage.save(title_image_path, ContentFile(title_img_io.getvalue()))
        
        # Save the title image URL in the model field
        restaurant.title_image = os.path.join('restaurants', str(restaurant_id), 'title_image.jpg')
        
        # Save the title image preview
        # Open the title image preview using Pillow
        title_img_preview = Image.open(title_image_preview)
        title_img_preview = ImageOps.exif_transpose(title_img_preview)
        
        # Resize the title image preview if needed
        title_max_width_preview = 600
        if title_img_preview.width > title_max_width_preview:
            title_aspect_ratio_preview = title_max_width_preview / float(title_img_preview.width)
            title_height_preview = int(title_aspect_ratio_preview * title_img_preview.height)
            title_img_preview = title_img_preview.resize((title_max_width_preview, title_height_preview), Image.ANTIALIAS)
        
        # Compress the title image preview by reducing the quality
        title_img_preview_io = io.BytesIO()
        title_img_preview.save(title_img_preview_io, format='JPEG', quality=80)
        
        # Save the compressed title image preview to the desired location
        title_image_preview_path = os.path.join(folder_path, "title_image_preview.jpg")
        default_storage.save(title_image_preview_path, ContentFile(title_img_preview_io.getvalue()))
        
        # Save the title image preview URL in the model field
        restaurant.title_image_preview = os.path.join('restaurants', str(restaurant_id), 'title_image_preview.jpg')
        restaurant.save()
        #########
        ####    SEND REGISTRATION EMAIL ####
        subject = 'Foodup: Restaurant Registrierung'
        from_email = settings.DEFAULT_FROM_EMAIL
        to_email = [email]

        msg = EmailMultiAlternatives(subject, '', from_email, to_email)
        
        html_content = render_to_string('registerRestaurant.html')
        msg.attach_alternative(html_content, "text/html")
        #msg.send()
        return JsonResponse({'message': 'Restaurant created successfully'})




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
        a = sin(dlat / 2) ** 2 + cos(lat1_rad) * cos(lat2_rad) * sin(dlon / 2) ** 2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))
        distance = 6371 * c  # Radius of the Earth in kilometers

        return distance

    def get(self, request):
        user_latitude = float(request.GET.get("user_latitude"))
        user_longitude = float(request.GET.get("user_longitude"))
       
        if(user_latitude and user_longitude):
            print(user_longitude, user_latitude)
            restaurants = Restaurant.objects.filter(active=True)
            serialized_restaurants = self.serializer_class(
            restaurants,
            many=True,
            context={'request': request}
            ).data
            for restaurant in serialized_restaurants:
                restaurant_latitude = restaurant["latitude_gps"]
                restaurant_longitude = restaurant["longitude_gps"]
                if restaurant_latitude != "" and restaurant_longitude != "":

                    distance = self.calculate_distance(
                        user_latitude,
                        user_longitude,
                        float(restaurant_latitude),
                        float(restaurant_longitude),
                    )
                    restaurant["distance"] = distance
            return Response(serialized_restaurants)


class RestaurantDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

    def post(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


class RestaurantDetailActiveAndInactive(generics.RetrieveUpdateDestroyAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer


class UserList(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class SearchUser(generics.ListAPIView):
    serializer_class = UserSerializer
    def get_queryset(self):
        telephone = self.request.GET.get("telephone")
        email = self.request.GET.get("email")


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
            telephone = serializer.validated_data.get("telephone")
            email = serializer.validated_data.get("email")
            testone = User.objects.filter(telephone=telephone)

            # Check if telephone or email already exists in the database
            existing_user = User.objects.filter(
            Q(telephone=telephone) & ~Q(telephone='') |
            Q(email=email) & ~Q(email='')
        ).first()
            
            if existing_user:
                # Return the existing user data instead of creating a new one
                existing_user_data = UserSerializer(existing_user).data
                return Response(existing_user_data, status=status.HTTP_200_OK)

            else:
                serializer.save()

                user_id = serializer.instance.id
                folder_name = f"posts_{user_id}"
                folder_path = os.path.join("static/images/posts/", folder_name)
                

                # Create the folder if it doesn't exist
                if not os.path.exists(folder_path):
                    os.makedirs(folder_path)

                # Update the user_posts_path field with the folder path
                user = serializer.instance
                user.save()

                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreatePost(APIView):
    def post(self, request):
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

class UserShow(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class LikeList(generics.ListCreateAPIView):
    serializer_class = LikeSerializer

    def get_queryset(self):
        user_id = self.request.GET.get("userid")
        userid_got_like = self.request.GET.get("userid_got_like")
        restaurant_id = self.request.GET.get("restaurantid")
        comment_id = self.request.GET.get("commentid")

        if user_id and restaurant_id and comment_id:
            print("ausgelöst")
            queryset = Like.objects.filter(
                userid=user_id, restaurantid=restaurant_id, commentid=comment_id
            )
            print(queryset)
        elif user_id and userid_got_like:
            queryset = Like.objects.filter(Q(userid=user_id) | Q(userid_got_like=userid_got_like))
        elif user_id:
            queryset = Like.objects.filter(userid=user_id)
        elif userid_got_like:
            queryset = Like.objects.filter(userid_got_like=userid_got_like)
        elif comment_id:
            queryset = Like.objects.filter(commentid=comment_id) 
        else:
            queryset = Like.objects.all()

        return queryset


class LikeDeleteView(APIView):
    def delete(self, request):
        user_id = request.GET.get("userid")
        restaurant_id = request.GET.get("restaurantid")
        comment_id = request.GET.get("commentid")

        try:
            like_instance = Like.objects.get(
                userid=user_id, restaurantid=restaurant_id, commentid=comment_id
            )
            like_instance.delete()
            return Response(status=204)  # Success response
        except Like.DoesNotExist:
            return Response(status=404)  # Not found response


class LikeCreateView(APIView):
    def post(self, request):
        user_id = request.data.get("userid")
        restaurant_id = request.data.get("restaurantid")
        comment_id = request.data.get("commentid")
        userid_got_like = request.data.get("userid_got_like")

        # Validate the required fields (user_id, restaurant_id, comment_id)
        if not (user_id and restaurant_id and comment_id):
            return Response(
                {"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Create a new Like instance
        like_data = {
            "userid": user_id,
            "restaurantid": restaurant_id,
            "commentid": comment_id,
            "userid_got_like": userid_got_like,
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


class ActivationCodeList(generics.ListAPIView):
    queryset = ActivationCode.objects.all()
    serializer_class = ActivationCodeSerializer


def generate_activation_code():
    return str(random.randint(10000, 99999))


class SendActivationView(APIView):
    def post(self, request):
        email = request.data.get("email")
        phone = request.data.get("phone")
        activation_code = generate_activation_code()
        if email:
            serializer = ActivationCodeSerializer(
                data={"email": email, "code": activation_code}
            )
            if serializer.is_valid():
                serializer.save()

                subject = 'Foodup: Aktivierungscode'
                from_email = settings.DEFAULT_FROM_EMAIL
                to_email = [email]

                msg = EmailMultiAlternatives(subject, '', from_email, to_email)
                
                html_content = render_to_string('welcomeemail.html', {'activation_code': activation_code})
                msg.attach_alternative(html_content, "text/html")
                #msg.send()

                return Response({"message": "Email sent"}, status=status.HTTP_200_OK)
        if phone:
            serializer = ActivationCodeSerializer(
                data={"phone": phone, "code": activation_code}
            )
            if serializer.is_valid():
                serializer.save()
                # Create an SNS client
                sns = boto3.client("sns", region_name=region_name)
                message = f"Your activation code is: {activation_code}"
                
                # Send an SMS
                """response = sns.publish(
                    #later, need to change to phone!
                    PhoneNumber=validPhoneNo,
                    Message=message
                )

                # Check the response
                if response['ResponseMetadata']['HTTPStatusCode'] == 200:
                    return Response({"message": "SMS sent"}, status=status.HTTP_200_OK)
                else:
                    print('Failed to send SMS.')"""
                return Response({"message": "SMS sent"}, status=status.HTTP_200_OK) #needs to be removed later

        return Response({"message": "Bad Request"}, status=status.HTTP_400_BAD_REQUEST)


class VerifyActivationCodeView(APIView):
    def post(self, request):
        email = request.data.get("email")
        phone = request.data.get("phone")
        code = request.data.get("code")
        
        if email and code:
            try:
                activation_code = ActivationCode.objects.get(email=email, code=code)
                if activation_code.active:
                    activation_code.active = False  # Set active field to False
                    activation_code.save()  # Save the changes
                    return Response(
                        {"message": "Activation code is valid"},
                        status=status.HTTP_200_OK,
                    )
                else:
                    return Response(
                        {"message": "Invalid activation code"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            except ActivationCode.DoesNotExist:
                return Response(
                    {"message": "Invalid activation code"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        elif phone and code:
            try:
                activation_code = ActivationCode.objects.get(phone=phone, code=code)
                if activation_code.active:
                    activation_code.active = False  # Set active field to False
                    activation_code.save()  # Save the changes
                    return Response(
                        {"message": "Activation code is valid"},
                        status=status.HTTP_200_OK,
                    )
                else:
                    return Response(
                        {"message": "Invalid activation code"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            except ActivationCode.DoesNotExist:
                return Response(
                    {"message": "Invalid activation code"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            return Response(
                {"message": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST
            )

class LikeRestaurantList(generics.ListCreateAPIView):
    queryset = RestaurantLike.objects.all()
    serializer_class = RestaurantLikeSerializer

class RestaurantLikeCreateUpdate(APIView):
    def post(self, request):
        userid = request.data.get('userid')
        restaurantid = request.data.get('restaurantid')

        try:
            restaurant_like = RestaurantLike.objects.get(userid=userid, restaurantid=restaurantid)
            restaurant_like.active = not restaurant_like.active
            restaurant_like.modified_at = timezone.now()
            restaurant_like.save()
            return Response({'message': 'RestaurantLike entry updated!'})
        except RestaurantLike.DoesNotExist:
            user = User.objects.get(id=userid)
            restaurant = Restaurant.objects.get(id=restaurantid)
            RestaurantLike.objects.create(userid=user, restaurantid=restaurant)
            return Response({'message': 'Invalid request.'})


class RetrieveLikedRestaurants(generics.ListAPIView):
    serializer_class = RestaurantSerializer

    def get_queryset(self):
        userid = self.request.query_params.get('userid')
        restaurantid = self.request.query_params.get('restaurantid')

        if userid and restaurantid:
            try:
                restaurant_likes = RestaurantLike.objects.filter(userid=userid, restaurantid=restaurantid, active=True)
                restaurant_ids = restaurant_likes.values_list('restaurantid', flat=True)
                restaurants = Restaurant.objects.filter(id__in=restaurant_ids)
                return restaurants
            except RestaurantLike.DoesNotExist:
                return Restaurant.objects.none()
        elif userid and not restaurantid:
            try:
                restaurant_likes = RestaurantLike.objects.filter(userid=userid, active=True)
                restaurant_ids = restaurant_likes.values_list('restaurantid', flat=True)
                restaurants = Restaurant.objects.filter(id__in=restaurant_ids)
                return restaurants
            except RestaurantLike.DoesNotExist:
                return Restaurant.objects.none()
        elif restaurantid and not userid:
            try:
                restaurant_likes = RestaurantLike.objects.filter(restaurantid=restaurantid, active=True)
                restaurant_ids = restaurant_likes.values_list('restaurantid', flat=True)
                restaurants = Restaurant.objects.filter(id__in=restaurant_ids)
                return restaurants
            except RestaurantLike.DoesNotExist:
                return Restaurant.objects.none()
        else:
            return Restaurant.objects.none()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class CreateLoginDataView(APIView):
    def post(self, request):
        serializer = LoginDataSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            print("is valid")
            try:
                user = User.objects.get(id=request.data.get('userid'))
                serializer.save(userid=user)
                return Response({'status': 'success'}, status=201)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=400)
        return Response(serializer.errors, status=400)
class LoginDataView(generics.ListAPIView):
    queryset = LoginData.objects.all()
    serializer_class = LoginDataSerializer





