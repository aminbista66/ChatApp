import json
from os import remove
from xml.dom.minidom import Document
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework import permissions
from rest_framework.generics import CreateAPIView

from api.models import User
from .user import get_user_queryset
from bson.objectid import ObjectId
from .mongodb import database
from django.conf import settings
from bson import json_util
from .serializers.users import UserCreateSerializer
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework.generics import RetrieveAPIView
from .serializers.users import UserDetailSerializer


db = database.connect_db(settings.MONGODB["DB"])


class RegisterAPI(CreateAPIView):
    serializer_class = UserCreateSerializer
    permission_classes = [permissions.AllowAny]


class LoginAPI(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        username, password = data['username'], data['password']

        response = Response()

        user = authenticate(request, username=username, password=password)
        if user is not None:
            if user.is_active:
                raw_token = RefreshToken.for_user(user)
                response.set_cookie("access_token_http_only", str(
                    raw_token.access_token), httponly=True, secure=False, samesite="Lax")
                response.set_cookie("access_token", str(
                    raw_token.access_token), httponly=False, secure=False, samesite="Lax")
                response.set_cookie("refresh_token", str(
                    raw_token), httponly=True, secure=False, samesite="Lax")

                response_data = {
                    "username": username,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email,
                    "doc_id": user.document_id
                }
                response.data = {
                    "message": "Auth Cookie Set", "data": response_data,
                }
                return response
            else:
                return Response({"Failed": "User is not active"}, status=403)
        else:
            return Response({"Failed": "Invalid Username or Password"}, status=404)

class LogoutAPI(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request, *args, **kwargs):
        response = Response()
        response.delete_cookie("access_token_http_only")
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        response.data = {"message": "logged out successfully"}
        response.status_code = 200
        return response



class CreateInboxAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        data = request.data
        user = get_user_queryset(request.COOKIES["access_token"])
        _with = User.objects.filter(username=data['username'])

        if _with.exists():
            db.inbox.insert_one({
                "users": [
                    {
                        "_id": ObjectId(user.first().document_id)
                    },
                    {
                        "_id": ObjectId(_with.first().document_id)
                    }
                ],
                "online_users": []
            })

            return Response({"success": "Inbox created"}, status=200)

        return Response({"failed": "user doesnot exists"}, status=404)


class FetchInboxAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = get_user_queryset(request.COOKIES["access_token_http_only"])
        if user.exists():
            user = user.first()
            inbox_doc = db.inbox.find(
                {"users": {"$elemMatch": {"_id": ObjectId(user.document_id)}}})
            doc = json.loads(json_util.dumps(inbox_doc))

            for i in doc:
                target = []
                for j in i['users']:
                    user_item = User.objects.get(document_id=j["_id"]["$oid"])
                    if user_item.username == user.username:
                        i["users"].remove(j)
                for k in i["users"]:
                    u = User.objects.get(document_id=k["_id"]["$oid"])
                    k["name"] = f"{u.first_name} {u.last_name}"
                    k["dp"] = u.display_picture
                    k['doc_id'] = u.document_id
                    k.pop("_id")      
                for l in i["online_users"]:
                    if l["$oid"] != user.document_id:
                        if(len(target) == 0):
                            target.append(l)
                        else:
                            break
                i.pop("online_users")
                i["online_users"] = target
            print(doc)  
            return Response({"inboxes": [i for i in doc]})

        return Response({"failed": "user doesnot exists for given token."}, status=404)


class SearchAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        query = request.query_params["q"]

        search_query = {
            "$search": {
                "index": "text_search",
                "autocomplete": {
                    "query": query,
                    "path": "username",
                    "tokenOrder": "sequential",
                    "fuzzy": {}
                }
            }
        }
        result = db.user_details.aggregate([search_query])
        doc = json.loads(json_util.dumps(result))
        print(doc)
        return Response({"results": [i for i in doc]}, status=200)


class TokenVerify(APIView):
    def get(self, request, *args, **kwargs):
        raw_token = request.COOKIES.get("access_token_http_only")
        if raw_token == None:
            return Response({"verified": False}, status=403)
        try:
            UntypedToken(raw_token)
        except (InvalidToken, TokenError) as e:
            print(e)
            return Response({"verified": False}, status=403)

        return Response({"verified": True}, status=200)

class UserDetailAPI(RetrieveAPIView):
    lookup_field = "document_id"
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserDetailSerializer
        
    def get_queryset(self):
        return User.objects.filter(document_id=self.kwargs["document_id"])