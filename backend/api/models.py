from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.conf import settings
import os,binascii


class User(AbstractUser):

    document_id = models.CharField(max_length=225, default="")

    def generate_document_id(self):
        if self.document_id == "":
            self.document_id = str(binascii.b2a_hex(os.urandom(12)).decode("utf-8"))

    def save(self, force_insert=False, force_update = False, using = None, update_fields = None) -> None:
        self.generate_document_id()
        return super().save(force_insert, force_update, using, update_fields)


def create_document(sender, instance, created, **kwargs):
    from .serializers.users import DocumentSerializer
    from .mongodb import database
    from bson import ObjectId

    db = database.connect_db(settings.MONGODB["DB"])

    data = DocumentSerializer(instance).data
    data["_id"] = ObjectId(data["document_id"])
    data.pop("document_id")
    
    if created:
        db.user_details.insert_one(data)

    elif not created:
        document = db.user_details.find({"_id": data["_id"]})
        if len(list(document)) == 0:
            db.user_details.insert_one(data)


post_save.connect(create_document, sender=User)