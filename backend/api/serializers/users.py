from rest_framework import serializers
from ..models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "username",
            "first_name",
            "last_name",
            "email",
            "document_id"
        )

class UserCreateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required = True,
        validators = [UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        required=True, write_only=True, validators=[validate_password])
    password2 = serializers.CharField(
        required=True, write_only=True
    )
    class Meta:
        model = User
        fields = (
            'email',
            'first_name',
            'last_name',
            'password',
            'password2',
            'username',)
        extra_kwargs = {
            'email': {"required": True},
            'first_name': {"required": True},
            'last_name': {"required": True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': 'password didnot match'})
        return super().validate(attrs)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data["username"],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user