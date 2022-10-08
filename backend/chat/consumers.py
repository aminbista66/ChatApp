from channels.generic.websocket import WebsocketConsumer
import json
from asgiref.sync import sync_to_async, async_to_sync
from api.mongodb import MongoDB
from channels.auth import AuthMiddleware
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from jwt import decode as jwt_decode
from django.contrib.auth import get_user_model
from django.conf import settings
from bson.objectid import ObjectId

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.inbox_id = self.scope["url_route"]["kwargs"]["inbox_id"]
        token = self.scope["query_string"].decode("utf-8").split("=")[1]
        
        try:
            UntypedToken(token)
        except (TokenError, InvalidToken) as e:
            print(e)
            return 

        decoded_data = jwt_decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        
        # doc_id = ObjectId(get_user_model().objects.get(id=decoded_data["user_id"]).document_id)
        # search_query = {
        #     "_id": doc_id
        # }
        # self.db = MongoDB().connect("django")
        # inbox = list(self.db.inbox.find({"_id": ObjectId(self.inbox_id)}))

        # if len(inbox) == 0:
        #     print("[ERROR] Inbox not found in collection.")
        #     return
        
        # if not search_query in inbox[0]["users"]:
        #     print("[ERROR] User not in inbox document.")
        #     return
            
        self.accept()

        async_to_sync(self.channel_layer.group_add)(
            self.inbox_id,
            self.channel_name,
        )


