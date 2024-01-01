# views.py

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Waitlist
from .serializers import WaitlistSerializer

class WaitlistList(generics.ListCreateAPIView):
    serializer_class = WaitlistSerializer

    def get_queryset(self):
        event_id = self.kwargs['event_id']
        return Waitlist.objects.filter(event_id=event_id)

class WaitlistDetail(generics.RetrieveDestroyAPIView):
    queryset = Waitlist.objects.all()
    serializer_class = WaitlistSerializer

@api_view(['POST'])
def cancel_reservation(request, event_id):
    if request.method == 'POST':
        name = request.data.get('name', None)

        if not name:
            return Response({'error': 'Name is required.'}, status=status.HTTP_400_BAD_REQUEST)

        waitlist = Waitlist.objects.filter(event_id=event_id, name=name).first()

        if waitlist:
            waitlist.delete()
            return Response({'message': 'Reservation canceled successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Reservation not found.'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({'error': 'Invalid HTTP method.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
