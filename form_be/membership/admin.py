from django.contrib import admin
from .models import Membership, Blacklist

admin.site.register(Membership)
admin.site.register(Blacklist)