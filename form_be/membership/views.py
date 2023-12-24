from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Blacklist
from .serializers import BlacklistSerializer
from event.models import User

class BlacklistCheckAPIView(generics.RetrieveAPIView):
    serializer_class = BlacklistSerializer
    lookup_field = 'user__username'

    def get_queryset(self):
        """Return username in blacklist."""
        username = self.kwargs['username']
        return Blacklist.objects.filter(user__username=username, timestamp_removed__isnull=True)

    def retrieve(self, request, *args, **kwargs):
        """Return if username in blacklist."""
        queryset = self.get_queryset()
        if queryset.exists():
            # User found in blacklist
            return Response({'blacklisted': True}, status=status.HTTP_200_OK)
        else:
            # User not found in blacklist
            return Response({'blacklisted': False}, status=status.HTTP_200_OK)
    