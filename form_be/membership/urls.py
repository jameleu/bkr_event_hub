# urls.py
from django.urls import path
from .views import BlacklistCheckAPIView

urlpatterns = [
    path('api/blacklist/check/<str:username>/', BlacklistCheckAPIView.as_view(), name='blacklist-check'),
]
