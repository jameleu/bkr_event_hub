# users/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Admin
from .serializers import UserSerializer, AdminSerializer
from django.contrib.auth.models import User
# from allauth.account.utils import send_email_confirmation
from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
# from allauth.account.models import EmailAddress
from rest_framework.permissions import IsAuthenticated
from .email_conf import custom_token_generator, send_custom_email_confirmation
from .decorators import login_required


class UserListAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    @login_required
    def create(self, request, *args, **kwargs):
        print("creating")
        serializer = self.get_serializer(data=request.data)
        print("got serializer")
        print(request.data)
        # print(serializer)
        serializer.is_valid(raise_exception=True)
        print("is_valid")
        self.perform_create(serializer)
        user = serializer.instance
        user.email = user.username + "@umich.edu"
        user.save()
        print("user_saved")
        send_custom_email_confirmation(request, user, create=True)
        print("email sent!")
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
class UserDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # lookup_field = 'email'  # Use the field by which you want to look up the user

    @login_required
    def get_object(self):
        user_id = self.kwargs.get('id')  # Assuming 'id' is passed in the URL kwargs
        user = get_object_or_404(User, id=user_id)
        return user

    @login_required
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @login_required
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    @login_required
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def get_user(request, user):
    # print(user)
    try:
        user = User.objects.get(username=user)
        return Response({'id': user.id}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        print("user DNE")
        return Response({'id': -1}, status=status.HTTP_200_OK)
    except:
        print("very bad error")
        return Response({'id': -1}, status=status.HTTP_400_BAD_REQUEST)
   
class AdminListAPIView(generics.ListCreateAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    permission_classes = [IsAuthenticated]

class AdminDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AdminSerializer
    @login_required
    def get_object(self):
        email = self.kwargs.get('email')
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise generics.Http404('Admin not found')
    @login_required
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
    @login_required
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    @login_required
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def one_time_login_view(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and custom_token_generator.check_token(user, token):
        print(request)
        request.session["user_id"] = uid
        print("essir")
        request.session.save()
        print(request.session["user_id"])
        print("saved")
        request.session.modified = True
        login(request, user)
        print(request.user)        
        return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)

    else:
        return Response(status=status.HTTP_403_FORBIDDEN)

@api_view(['GET'])
def verify_user(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and custom_token_generator.check_token(user, token):
        user.is_active = True
        user.backend = 'django.contrib.auth.backends.ModelBackend'
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)
@api_view(['GET'])
def logout(request):
    try:
        del request.session["user_id"]
    except KeyError:
        pass
    return HttpResponse("You're logged out.")
@api_view(['GET'])
def start_login(request):
    email = request.GET.get('uniqname') + "@umich.edu"
    # to not be done without confirming exists
    user = User.objects.get(email=email)
    try:
        send_custom_email_confirmation(request, user, email=email)
        #TODO add checks to see if user is verified and if not, if the last verification email
        # is still valid. if so, then make sure they are redirected to go look for the email. maybe have "life" system so can only resend twice?
        # also need to do the same for logging in.
        print("finished sending one time login email!")
        return Response(status=status.HTTP_204_NO_CONTENT)
    except:
        return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)
@api_view(['GET'])
def is_logged_in(request):
    user = User.objects.get()
    print(user)
    print(request.user)
    login(request, user)
    print("i'm loggedin:", request.user.is_authenticated)
    if request.user.is_authenticated:
        print("loggerrin")
        return Response ({'is_logged_in': True, 'user': request.user.username}, status=status.HTTP_200_OK)
    else:
        print("not loggedin")
        return Response({'is_logged_in': False}, status=status.HTTP_200_OK)