from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.LoginView.as_view()),
    path("create-inbox/", views.CreateInbox.as_view()),
    path("fetch-inbox/", views.FetchInbox.as_view()),

]