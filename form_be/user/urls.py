# users/urls.py
from django.urls import path
from .views import UserListAPIView, UserDetailAPIView, AdminListAPIView, AdminDetailAPIView, get_user, one_time_login_view, start_login, is_logged_in

urlpatterns = [
    path('', UserListAPIView.as_view(), name='user-list'),
    path('get_id/<str:user>/', get_user, name='exist'),
    path('id/<int:pk>/', UserDetailAPIView.as_view(), name='user-detail'),
    path('admin/', AdminListAPIView.as_view(), name='admin-list'),
    path('admin/<int:pk>/', AdminDetailAPIView.as_view(), name='admin-detail'),
    path('one-time-login/<str:uidb64>/<str:token>/', one_time_login_view, name='one_time_login'),
    path('auth/', start_login, name='start_login'),
    path('is_logged_in/', is_logged_in, name="is_auth")
]
