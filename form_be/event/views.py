# events/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Event, Attendance, Waitlist
from .serializers import EventSerializer, AttendanceSerializer, WaitlistSerializer
from django.shortcuts import get_object_or_404

class EventListAPIView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class AttendanceListAPIView(generics.ListCreateAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

# class AttendanceListAPIView(generics.ListCreateAPIView):
#     serializer_class = AttendanceSerializer

#     def get_queryset(self):
#         email = self.request.query_params.get('email', None)
        
#         if email:
#             # If email parameter is provided, filter attendance based on the user's email
#             user_attendance = Attendance.objects.filter(user__student_email=email)
#             return user_attendance
#         else:
#             # If no email parameter is provided, return the default queryset (all attendance)
#             return Attendance.objects.all()

#     def delete(self, request, *args, **kwargs):
#         email = self.request.query_params.get('email', None)
        
#         if email:
#             # If email parameter is provided, delete attendance records based on the user's email
#             user_attendance = Attendance.objects.filter(user__student_email=email)
            
#             if user_attendance.exists():
#                 user_attendance.delete()
#                 return Response({'detail': f'Attendance records for {email} deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
#             else:
#                 return Response({'detail': f'No attendance records found for {email}'}, status=status.HTTP_404_NOT_FOUND)
#         else:
#             return Response({'detail': 'Email parameter is required for deletion'}, status=status.HTTP_400_BAD_REQUEST)

class AttendanceDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    lookup_field = 'user__student_email'  # Assuming 'user' is a ForeignKey in the Attendance model

    def get_object(self):
        email = self.kwargs.get('email')
        queryset = self.filter_queryset(self.get_queryset())
        obj = get_object_or_404(queryset, user__student_email=email)
        self.check_object_permissions(self.request, obj)
        return obj

    def update(self, request, *args, **kwargs):
        email = self.kwargs.get('email')
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        email = self.kwargs.get('email')
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class WaitlistListAPIView(generics.ListCreateAPIView):
    queryset = Waitlist.objects.all()
    serializer_class = WaitlistSerializer

class WaitlistDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Waitlist.objects.all()
    serializer_class = WaitlistSerializer
    lookup_field = 'user__student_email'  # Assuming 'user' is a ForeignKey in the Waitlist model

    def get_object(self):
        email = self.kwargs.get('email')
        queryset = self.filter_queryset(self.get_queryset())
        obj = get_object_or_404(queryset, user__student_email=email)
        self.check_object_permissions(self.request, obj)
        return obj

    def update(self, request, *args, **kwargs):
        email = self.kwargs.get('email')
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        email = self.kwargs.get('email')
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)