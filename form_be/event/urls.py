# events/urls.py
from django.urls import path
from .views import EventListAPIView, EventDetailAPIView,\
WaitlistListAPIView, WaitlistDetailAPIView, AttendanceListAPIView, AttendanceDetailAPIView

urlpatterns = [
    path('v1/event/', EventListAPIView.as_view(), name='event-list'),
    path('v1/event/<int:pk>/', EventDetailAPIView.as_view(), name='event-detail'),
    path('v1/waitlist/', WaitlistListAPIView.as_view(), name='waitlist-list'),
    path('v1/waitlist/<int:pk>/', WaitlistDetailAPIView.as_view(), name='waitlist-detail'),
    path('v1/attendance/', AttendanceListAPIView.as_view(), name='attendance-list'),
    path('v1/attendance/<int:pk>/', AttendanceDetailAPIView.as_view(), name='attendance-detail')
]
