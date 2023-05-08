from django.urls import path
from .views import PostList, PostDetail, PostDelete, RestaurantList, RestaurantDistance, RestaurantSearch, RestaurantDetail, UserList, UserDetail, LikeList, LikeDetail, LikeDeleteView, LikeCreateView, SearchUser, CreateUser, UserDelete, CreatePost


urlpatterns = [ path('post/', PostList.as_view(), name="post_list"),
               path('post/<int:pk>', PostDetail.as_view(), name="post_detail"),
               path('post/create/', CreatePost.as_view(), name="post_create"),
               path('post/delete/', PostDelete.as_view(), name="post_delete"),
               path('user/', UserList.as_view(), name="user_list"),
               path('user/<int:pk>', UserDetail.as_view(), name="user_detail"),
               path('user/delete/<int:pk>', UserDelete.as_view(), name="user_delete"),
               path('restaurant/', RestaurantList.as_view(), name="restaurant_list"),
               path('restaurant/<int:pk>', RestaurantDetail.as_view(), name="restaurant_detail"),
               path('restaurant/gps/', RestaurantDistance.as_view(), name="restaurant-gps"),
               path('restaurant/search', RestaurantSearch.as_view(), name="restaurant-search"),
               path('like/', LikeList.as_view(), name="like_list"),
               path('like/<int:pk>', LikeDetail.as_view(), name="like_detail"),
               path('like/delete/', LikeDeleteView.as_view(), name='like-delete'),
               path('like/create/', LikeCreateView.as_view(), name='like-create'),
               path('user/search/', SearchUser.as_view(), name='search-user'),
               path('user/create/', CreateUser.as_view(), name='create-user'),

              ]

