from django.db import models

class User(models.Model):
    student_email = models.EmailField(unique=True)
    first = models.CharField(max_length=255)
    last = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

class Admin(models.Model):
    student_email = models.EmailField(unique=True)
    first = models.CharField(max_length=255)
    last = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    