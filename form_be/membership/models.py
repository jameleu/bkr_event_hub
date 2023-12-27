from django.db import models
from user.models import User

class Blacklist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blacklisted_user')
    timestamp_added = models.DateTimeField(auto_now_add=True)
    timestamp_removed = models.DateTimeField(null=True, blank=True)
    reason = models.TextField()
    admin_who_blacklisted = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='blacklists_admin')

class Membership(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    level = models.CharField(max_length=255)

