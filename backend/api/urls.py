from django.urls import path
from . import views as api

urlpatterns = [
    path("login/", api.LoginAPI.as_view()),
    path("create-inbox/", api.CreateInboxAPI.as_view()),
    path("fetch-inbox/", api.FetchInboxAPI.as_view()),
    path("register/", api.RegisterAPI.as_view()),
    path("search/", api.SearchAPI.as_view()),

    path("verify-token/", api.TokenVerify.as_view()),
]