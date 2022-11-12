from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from api.mongodb import database
from bson.objectid import ObjectId
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
import json
from api.user import get_user_queryset


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.inbox_id = self.scope["url_route"]["kwargs"]["inbox_id"]
        self.db = database.connect_db("chatapp")
        if len(list(self.db.inbox.find({"_id": ObjectId(self.inbox_id)}))) == 0:
            self.close()
            return 
            

        self.token = self.scope["query_string"].decode("utf-8").split("=")[1]
        try:
            UntypedToken(self.token)
        except (InvalidToken, TokenError) as e:
            print(e)
            self.close()
            
        self.accept()  

        self.user = get_user_queryset(self.token).first()
        print(self.user)
        self.username = self.user.username

        try:
            self.db.inbox.update_one({"_id": ObjectId(self.inbox_id)}, {"$push": {"online_users": ObjectId(self.user.document_id)}})
         
        except Exception as e:
            print(e)
            self.close()

        async_to_sync(self.channel_layer.group_add)(
            self.inbox_id,
            self.channel_name 
        )


    def disconnect(self, code):
        self.db.inbox.update_one({"_id": ObjectId(self.inbox_id)}, {"$pull": {"online_users": ObjectId(self.user.document_id)}})
        async_to_sync(self.channel_layer.group_discard)(
            self.inbox_id,
            self.channel_name
        )
    

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        async_to_sync(self.channel_layer.group_send)(
            self.inbox_id,
            {
                "type": "private_inbox_chat",
                "inbox_id": self.inbox_id,
                "sender": self.username,
                "message": text_data_json["message"]
            }
        )

    
    def private_inbox_chat(self, event):
        self.db.messages.insert_one({
            "inbox_id": ObjectId(event["inbox_id"]),
            "sender": event["sender"],
            "message": event["message"]  
        })
        self.send(text_data=json.dumps(event))

