from django.shortcuts import render
from .models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework import APIView
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

