from .serializers.token import CustomTokenVerifySerializer
from .models import User

def get_user_queryset(token):
    data = CustomTokenVerifySerializer().validate({'token': token})
    user = User.objects.filter(pk=data['user_id'])
    return user