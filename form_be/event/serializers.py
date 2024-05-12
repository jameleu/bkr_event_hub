# events/serializers.py
from rest_framework import serializers
from .models import Event, Attendance, Waitlist, BufferList

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

class WaitlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Waitlist
        fields = '__all__'

class BufferListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BufferList
        fields = '__all__'