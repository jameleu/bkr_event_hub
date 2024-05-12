# urls.py
from django.urls import path
from .views import MembershipDetailAPIView, BlacklistListAPIView,\
    MembershipListAPIView, BlacklistDetailAPIView

urlpatterns = [
    path('blacklist/<str:username>/', BlacklistListAPIView.as_view(), name='blacklist-detail'),
    path('memberships/<int:pk>/', BlacklistDetailAPIView.as_view(), name='membership-detail'),
    path('memberships/', MembershipListAPIView.as_view(), name='membership-list'),
    path('memberships/<str:username>/', MembershipDetailAPIView.as_view(), name='membership-detail')
]