from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Blacklist, Membership
from .serializers import BlacklistSerializer, MembershipSerializer
from event.models import User
from django.utils import timezone

class BlacklistListAPIView(generics.ListCreateAPIView):
    queryset = Blacklist.objects.all()
    serializer_class = BlacklistSerializer

class BlacklistDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BlacklistSerializer
    lookup_field = 'user__username'

    def get_object(self):
        username = self.kwargs.get('username')
        try:
            return Blacklist.objects.get(user__username=username, timestamp_removed__isnull=True)
        except Blacklist.DoesNotExist:
            raise generics.Http404('User not found or not blacklisted')

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.timestamp_removed = timezone.now()
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

        
class MembershipListAPIView(generics.ListCreateAPIView):
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer

class MembershipDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MembershipSerializer
    lookup_field = 'user__username'

    def get_object(self):
        username = self.kwargs.get('username')  # changes per request
        try:
            return Membership.objects.get(user__username=username)
        except Membership.DoesNotExist:
            raise generics.Http404('User not found or not a member')

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)