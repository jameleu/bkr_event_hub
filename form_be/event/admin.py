from django.contrib import admin
from .models import Event, Waitlist, Attendance

admin.site.register(Event)
admin.site.register(Waitlist)
admin.site.register(Attendance)