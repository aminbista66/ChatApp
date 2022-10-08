# from fileinput import close
# from django.db import close_old_connections
# # from rest_framework_simplejwt.tokens import UntypedToken
# # from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
# from jwt import decode as jwt_decode
# from django.conf import settings
# from django.contrib.auth import get_user_model
# from urllib.parse import parse_qs
# from channels.middleware import BaseMiddleware
# from channels.db import database_sync_to_async
# from asgiref.sync import sync_to_async

# class TokenAuthMiddleWare:
#     def __init__(self, inner, *args):
#         self.inner = inner

#     def __call__(self, scope, *args):
#         close_old_connections()

#         token = parse_qs(scope["query_string"].decode("utf-8"))["token"][0]

#         try:
#             UntypedToken(token)
#         except (InvalidToken, TokenError, Exception) as e:
#             print(e)
#         else:
#             decoded_data = jwt_decode(token, settings.SECRET_KEY, algorithms=["HS256"])
#             user = (get_user_model().objects.get(id=decoded_data["user_id"]))

#             return self.inner(scope, user)

