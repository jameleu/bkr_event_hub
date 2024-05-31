# events/views.py
from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from .models import Event, Attendance, Waitlist, BufferList, UploadedFile
from .serializers import EventSerializer, AttendanceSerializer, WaitlistSerializer, BufferListSerializer, UploadedFileSerializer
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.db.models import F, Sum
from .permissions import IsOwnerOrReadOnly
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from verify_email.email_handler import send_verification_email
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
import math

def get_score(user, attendance, absences, cancellations, attendance_in_row, desire):
    attendance_w = 2 * math.asin(0.12 * attendance - 0.2) + 1
    desire_w = 4 * math.exp(desire) - 4
    att_row_w = 1 / (0.12 + math.exp(-0.875 * (-3.5 + attendance_in_row)))
    cancel_w = 1 / (0.1 + math.exp(-0.25 * (12 - cancellations)))
    absence_w = 1 / (0.12 + math.exp(-2.75 * (3 - absences)))
    
    weight_dict = {
        "attendance" : attendance_w,
        "desire" : desire_w,
        "attendance_in_row" : att_row_w,
        "cancel" : cancel_w,
        "absence" : absence_w
    }
    
    # normalize weights
    total_weight = sum(weight_dict.values())
    for weight_name, _ in weight_dict:
        weight_dict[weight_name] /= total_weight
    
    # additional tuning of weights
    coefficients = {
        "attendance": 1,
        "desire": 1,
        "attendance_in_row": 1,
        "cancel": 1,
        "absence": 1
    }
    
    # parameter tuning; calibrating weights
    for weight_name, weight in weight_dict:
        weight_dict[weight_name] *= coefficients[weight_name]
    final_score = sum(weight_dict.values())

    return final_score


@api_view(['POST'])
@csrf_exempt
def calculate_scores(request):
    event_id = request.GET.get('event_id')
    if event_id is None:
        return Response({'error': 'Event ID is required'}, status=400)


    buffer_list = BufferList.objects.filter(event_id=event_id)
    scores = {}
    for entry in buffer_list:
        score = get_score(entry)
        scores[entry.user.username] = score

    rankings = sorted(scores.items(), key=lambda x: x[1], reverse=True)

    max_position = Waitlist.objects.filter(event_id=event_id).aggregate(Max('place'))['place__max']
    initial_position = max_position + 1 if max_position is not None else 1

    timestamp = timezone.now()
    waitlist_entries = []
    for i, (username, _) in enumerate(rankings):
        waitlist_entry, created = Waitlist.objects.get_or_create(user=username, event_id=event_id)
        waitlist_entry.place = initial_position + i + 1
        waitlist_entry.timestamp = timestamp
        waitlist_entry.save()

    return JsonResponse({'message': 'Scores calculated, rankings generated, and waitlist updated.'})

class EventListAPIView(generics.ListCreateAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class AttendanceListAPIView(generics.ListCreateAPIView):
    permission_classes = [IsOwnerOrReadOnly]
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
    permission_classes = [IsOwnerOrReadOnly]
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
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Waitlist.objects.all()
    serializer_class = WaitlistSerializer

class WaitlistDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
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
    

class BufferlistListAPIView(generics.ListCreateAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = BufferList.objects.all()
    serializer_class = BufferListSerializer
class BufferlistDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = BufferList.objects.all()
    serializer_class = BufferListSerializer
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

class UploadedFileViewSet(viewsets.ModelViewSet):
    serializer_class = UploadedFileSerializer
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            uploaded_file = serializer.save()
            file_url = uploaded_file.file.url  # Get the URL of the uploaded file
            return Response({'file_url': file_url}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_signed_up_event_list(request):
    user_id = request.user.id
    signed_up_events = Attendance.objects.filter(user_id=user_id).values_list('event_id', flat=True)
    events = Event.objects.filter(id__in=signed_up_events)
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_event_list(request):
    admin_id = request.user.id
    events = Event.objects.filter(leader_creator_id=admin_id)
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)