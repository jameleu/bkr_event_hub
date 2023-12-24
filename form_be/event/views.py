# events/views.py
from rest_framework import generics
from .models import Event, Attendance, Waitlist
from .serializers import EventSerializer, AttendanceSerializer, WaitlistSerializer

class EventListAPIView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class AttendanceListAPIView(generics.ListCreateAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

class AttendanceDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

class WaitlistListAPIView(generics.ListCreateAPIView):
    queryset = Waitlist.objects.all()
    serializer_class = WaitlistSerializer

class WaitlistDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Waitlist.objects.all()
    serializer_class = WaitlistSerializer
