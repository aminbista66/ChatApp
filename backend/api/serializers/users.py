from rest_framework.serializers import ModelSerializer
from ..models import User

class DocumentSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            "username",
            "first_name",
            "last_name",
            "email",
            "document_id"
        )
