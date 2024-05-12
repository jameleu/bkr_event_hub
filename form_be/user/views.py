# users/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User, Admin
from .serializers import UserSerializer, AdminSerializer

class UserListAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class UserDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    lookup_field = 'email'  # Use the field by which you want to look up the user

    def get_object(self):
        email = self.kwargs.get('email')
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise generics.Http404('User not found')

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

@api_view(['GET'])
def get_user(request, user):
    print(user)
    try:
        user = User.objects.get(username=user)
        return Response({'id': user.id}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        print("yessir")
        return Response({'id': -1}, status=status.HTTP_200_OK)
    except:
        print("gg's my guy")
        return Response({'id': -1}, status=status.HTTP_400_BAD_REQUEST)
   
class AdminListAPIView(generics.ListCreateAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class AdminDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AdminSerializer
    def get_object(self):
        email = self.kwargs.get('email')
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise generics.Http404('Admin not found')

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
