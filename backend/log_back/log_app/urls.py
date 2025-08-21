from django.urls import path
from .views import LoginView, SingupView, ProfileView
from rest_framework_simplejwt.views import (
    TokenObtainPairView, 
    TokenRefreshView, 
)
urlpatterns = [
    path("login/",LoginView.as_view(), name="login" ),
    path("signup/", SingupView.as_view(), name="signup"),
    path("token/refresh/", TokenRefreshView, name="token_refesh"),
    path("profile/", ProfileView.as_view(), name="profile")
]
