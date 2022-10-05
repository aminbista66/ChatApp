from rest_framework_simplejwt.serializers import TokenVerifySerializer
from django.conf import settings
import jwt

class CustomTokenVerifySerializer(TokenVerifySerializer):
    def validate(self, attrs):
        token = attrs.get('token')
        data = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        return data