from django.db import models
from event.models import User

class Blacklist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp_added = models.DateTimeField(auto_now_add=True)
    timestamp_removed = models.DateTimeField(null=True, blank=True)
    reason = models.TextField()
    admin_who_blacklisted = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

class Membership(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    level = models.CharField(max_length=255)

