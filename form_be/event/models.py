from django.db import models
from user.models import User

class Event(models.Model):
    desc = models.TextField()
    name = models.CharField(max_length=255)
    time_date = models.DateTimeField()
    location = models.CharField(max_length=255)
    waitlist_id = models.OneToOneField('Waitlist', on_delete=models.SET_NULL, null=True, blank=True)
    leader_creator = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=255)
    capacity = models.IntegerField()

class Waitlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    place = models.IntegerField()
    timestamp = models.DateTimeField()

class Attendance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    attended = models.BooleanField(default=False)
    timestamp = models.DateTimeField()
    event = models.ForeignKey(Event, on_delete=models.CASCADE)