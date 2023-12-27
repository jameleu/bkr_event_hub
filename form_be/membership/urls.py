# urls.py
from django.urls import path
from .views import MembershipDetailAPIView, BlacklistListAPIView,\
    MembershipListAPIView, BlacklistDetailAPIView

urlpatterns = [
    path('api/blacklist/<str:username>/', BlacklistListAPIView.as_view(), name='blacklist-detail'),
    path('api/memberships/<int:pk>/', BlacklistDetailAPIView.as_view(), name='membership-detail'),
    path('api/memberships/', MembershipListAPIView.as_view(), name='membership-list'),
    path('api/memberships/<str:username>/', MembershipDetailAPIView.as_view(), name='membership-detail')
]