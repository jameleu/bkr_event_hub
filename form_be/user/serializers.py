# users/serializers.py
from rest_framework import serializers
from .models import Admin
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    # password = serializers.CharField(max_length=128, write_only=True, required=False)
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'is_staff', 'is_active', 'date_joined', 'groups', 'user_permissions']

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'