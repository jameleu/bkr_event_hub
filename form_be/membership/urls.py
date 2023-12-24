# urls.py
from django.urls import path
from .views import BlacklistCheckAPIView, MembershipDetailAPIView,\
    MembershipListAPIView, BlacklistDetailAPIView, BlacklistStatusAPIView

urlpatterns = [
    path('api/blacklist/check/<str:username>/', BlacklistCheckAPIView.as_view(), name='blacklist-check'),
    path('api/memberships/<int:pk>/', BlacklistDetailAPIView.as_view(), name='membership-detail'),
    path('api/blacklist/status/<str:username>/', BlacklistStatusAPIView.as_view(), name='blacklist-status'),
    path('api/memberships/', MembershipListAPIView.as_view(), name='membership-list'),
    path('api/memberships/<int:pk>/', MembershipDetailAPIView.as_view(), name='membership-detail')
]