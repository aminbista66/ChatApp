from django.contrib import admin
from django.urls import path, include



urlpatterns = [
    path('admin/', admin.site.urls),
    path('chat/', include("chat.urls", namespace="chat")),
    path('api/', include("api.urls", namespace="api")),
]
