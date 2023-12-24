# urls.py
from django.urls import path
from .views import BlacklistCheckAPIView, MembershipDetailAPIView,\
    MembershipListAPIView, BlacklistDetailAPIView

urlpatterns = [
    path('api/blacklist/<str:username>/', BlacklistDetailAPIView.as_view(), name='blacklist-detail'),
    path('api/memberships/<int:pk>/', BlacklistDetailAPIView.as_view(), name='membership-detail'),
    path('api/memberships/', MembershipListAPIView.as_view(), name='membership-list'),
    path('api/memberships/<str:username>/', MembershipDetailAPIView.as_view(), name='membership-detail')
]