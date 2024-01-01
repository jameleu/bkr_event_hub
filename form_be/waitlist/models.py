# models.py

from django.db import models
from event.models import Event

class Waitlist(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.name} - Event: {self.event.name}'
