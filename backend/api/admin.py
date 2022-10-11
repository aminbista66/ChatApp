from django.contrib import admin
from .models import User 

class UserList(admin.ModelAdmin):
    list_display = (
        "username",
        "email",
        "first_name",
        "last_name",
        "document_id",
        "is_superuser",
    )

admin.site.register(User, UserList)
