# events/urls.py
from django.urls import path
from .views import EventListAPIView, EventDetailAPIView,\
WaitlistListAPIView, WaitlistDetailAPIView, AttendanceListAPIView, AttendanceDetailAPIView

urlpatterns = [
    path('event/', EventListAPIView.as_view(), name='event-list'),
    path('event/<int:pk>/', EventDetailAPIView.as_view(), name='event-detail'),
    path('waitlist/', WaitlistListAPIView.as_view(), name='waitlist-list'),
    path('waitlist/<int:pk>/', WaitlistDetailAPIView.as_view(), name='waitlist-detail'),
    path('attendance/', AttendanceListAPIView.as_view(), name='attendance-list'),
    path('attendance/<int:pk>/', AttendanceDetailAPIView.as_view(), name='attendance-detail')
]
