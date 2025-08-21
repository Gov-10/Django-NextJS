from rest_framework import serializers
from .models import CustomUser

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(required=True, write_only=True)

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = CustomUser
        fields = "__all__"
    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username = validated_data['username'],
            email= validated_data.get('email', ''),
            password = validated_data['password'],
            description = validated_data.get('description', '')
        )
        return user


    