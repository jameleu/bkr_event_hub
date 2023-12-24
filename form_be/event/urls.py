# events/urls.py
from django.urls import path
from .views import EventListAPIView, EventDetailAPIView

urlpatterns = [
    path('event/', EventListAPIView.as_view(), name='event-list'),
    path('event/<int:pk>/', EventDetailAPIView.as_view(), name='event-detail'),
]
