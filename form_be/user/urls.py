# users/urls.py
from django.urls import path
from .views import UserListAPIView, UserDetailAPIView, AdminListAPIView, AdminDetailAPIView, get_user

urlpatterns = [
    path('', UserListAPIView.as_view(), name='user-list'),
    path('get_id/<str:user>/', get_user, name='exist'),
    path('id/<int:pk>/', UserDetailAPIView.as_view(), name='user-detail'),
    path('admin/', AdminListAPIView.as_view(), name='admin-list'),
    path('admin/<int:pk>/', AdminDetailAPIView.as_view(), name='admin-detail'),
]
