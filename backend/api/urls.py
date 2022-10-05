from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from . import views
from rest_framework_simplejwt.serializers import TokenRefreshSerializer

app_name = "api"

urlpatterns = [
    path('login/', views.LoginView.as_view()),
    path('token/', TokenObtainPairView.as_view())
]