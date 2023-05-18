from django.urls import path
from .views import CreateRestaurant, PostList, PostDetail, PostDelete, AllPostList, PostSetInactive, RestaurantList, RestaurantDelete, RestaurantDetailActiveAndInactive, RestaurantCreate, RestaurantActiveAndInactive, RestaurantDistance, RestaurantSearch, RestaurantDetail, UserList, UserDetail, LikeList, LikeDetail, LikeDeleteView, LikeCreateView, SearchUser, CreateUser, UserDelete, CreatePost, SendActivationView, VerifyActivationCodeView, ActivationCodeList

urlpatterns = [ path('post/', PostList.as_view(), name="post_list"),
               path('post/<int:pk>', PostDetail.as_view(), name="post_detail"),
               path('post/create/', CreatePost.as_view(), name="post_create"),
               path('post/delete/', PostDelete.as_view(), name="post_delete"),
               path('post/all', AllPostList.as_view(), name="post-all"),
               path('post/setinactive', PostSetInactive.as_view(), name="post-set-inactive"),
               path('user/', UserList.as_view(), name="user_list"),
               path('user/<int:pk>', UserDetail.as_view(), name="user_detail"),
               path('user/delete/<int:pk>', UserDelete.as_view(), name="user_delete"),
               path('restaurant/', RestaurantList.as_view(), name="restaurant_list"),
               path('restaurant/<int:pk>', RestaurantDetail.as_view(), name="restaurant_detail"),
               path('restaurant/gps/', RestaurantDistance.as_view(), name="restaurant-gps"),
               path('restaurant/all', RestaurantActiveAndInactive.as_view(), name="restaurant-all"),
               path('restaurant/id/<int:pk>', RestaurantDetailActiveAndInactive.as_view(), name="restaurant-detail-inactiveandactive"),
               path('restaurant/search', RestaurantSearch.as_view(), name="restaurant-search"),
               path('restaurant/create/', RestaurantCreate.as_view(), name="restaurant-create"),
               path('restaurant/create/2', CreateRestaurant.as_view(), name="restaurant-create2"),
               path('restaurant/delete/', RestaurantDelete.as_view(), name="restaurant-delete"),
               path('like/', LikeList.as_view(), name="like_list"),
               path('like/<int:pk>', LikeDetail.as_view(), name="like_detail"),
               path('like/delete/', LikeDeleteView.as_view(), name='like-delete'),
               path('like/create/', LikeCreateView.as_view(), name='like-create'),
               path('user/search/', SearchUser.as_view(), name='search-user'),
               path('user/create/', CreateUser.as_view(), name='create-user'),
               path('activation/send/', SendActivationView.as_view(), name='activation-send'),
               path('activation/check/', VerifyActivationCodeView.as_view(), name='activation-check'),
               path('activation/', ActivationCodeList.as_view(), name='activation-code'),



              ]

