from django.urls import path
from . import views

urlpatterns = [ path('', views.RestaurantListAPIView.as_view(), name="restaurant_list"),
               path('<int:id>/', views.RestaurantRetrieveAPIView.as_view(), name="restaurant_detail"),
               path('create/', views.RestaurantCreateAPIView.as_view(), name='restaurant_create'),
               path('update/<int:id>/', views.RestaurantRetrieveUpdateAPIView.as_view(), name="restaurant_update"),
               path('delete/<int:id>/', views.RestaurantDestroyAPIView.as_view(), name="restaurant_delete")]
