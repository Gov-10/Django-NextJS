from django.shortcuts import render
from .models import CustomUser
from .serializers import LoginSerializer, SignupSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class LoginView(APIView):
    def post(self, request):
        data = request.data 
        serializer = LoginSerializer(data=data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({"message" : "Login successful", "refresh" : str(refresh), "access": str(refresh.access_token)}, status=status.HTTP_200_OK)
            return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SignupView(APIView):
    def post(self, request):
        data = request.data 
        serial = SignupSerializer(data=data)
        if serial.is_valid():
            user = serial.save()
            refresh = RefreshToken.for_user(user)
            return Response({"message" : "User created successfully", "refresh": str(refresh), "access": str(refresh.access_token),}, status=status.HTTP_201_CREATED)
        return Response(serial.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
            user = request.user
            return Response({"username" : user.username, "email": user.email, "description" : user.description})


        
