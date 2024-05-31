# events/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventListAPIView, EventDetailAPIView, UploadedFileViewSet, WaitlistListAPIView, WaitlistDetailAPIView, AttendanceListAPIView, AttendanceDetailAPIView, BufferlistDetailAPIView, BufferlistListAPIView, admin_event_list, user_signed_up_event_list

router = DefaultRouter()
router.register(r'files', UploadedFileViewSet, basename='uploadedfile')  # makes a url at "files" for api endpoint to upload

urlpatterns = [
    path('event/', EventListAPIView.as_view(), name='event-list'),
    path('event/<int:pk>/', EventDetailAPIView.as_view(), name='event-detail'),
    path('waitlist/', WaitlistListAPIView.as_view(), name='waitlist-list'),
    path('waitlist/<int:pk>/', WaitlistDetailAPIView.as_view(), name='waitlist-detail'),
    path('attendance/', AttendanceListAPIView.as_view(), name='attendance-list'),
    path('attendance/<int:pk>/', AttendanceDetailAPIView.as_view(), name='attendance-detail'),
    path('bufferlist/', BufferlistListAPIView.as_view(), name='buffer-list'),
    path('bufferlist/<int:pk>/', BufferlistDetailAPIView.as_view(), name='buffer-detail'),
    path('admin-events/', admin_event_list, name='admin-event-list'),
    path('user-events/', user_signed_up_event_list, name='user-event-list'),
]
