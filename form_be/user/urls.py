# users/urls.py
from django.urls import path
from .views import UserListAPIView, UserDetailAPIView, AdminListAPIView, AdminDetailAPIView

urlpatterns = [
    path('api/users/', UserListAPIView.as_view(), name='user-list'),
    path('api/users/<int:pk>/', UserDetailAPIView.as_view(), name='user-detail'),
    path('api/admin/', AdminListAPIView.as_view(), name='admin-list'),
    path('api/admin/<int:pk>/', AdminDetailAPIView.as_view(), name='admin-detail'),
]
