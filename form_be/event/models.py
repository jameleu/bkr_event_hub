from django.db import models
from user.models import User

class Event(models.Model):
    desc = models.TextField()
    name = models.CharField(max_length=255)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    location = models.CharField(max_length=255)
    # make it create it automatically
    waitlist_id = models.OneToOneField('Waitlist', on_delete=models.SET_NULL, null=True, blank=True)
    # somehow get this to SYNC TODO
    leader_creator = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    category = models.TextField()
    file_url = models.CharField(max_length=255)
    capacity = models.IntegerField()

class Waitlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    place = models.IntegerField()
    timestamp = models.DateTimeField()

class Attendance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    attended = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    
class BufferList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    desire = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    comment = models.TextField(blank=True, null=True)
    
class UploadedFile(models.Model):
    file = models.FileField(upload_to='user_event_banners/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)