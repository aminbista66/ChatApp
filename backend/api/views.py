from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework import permissions

class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        username, password = data['username'], data['password']
        
        response = Response()

        user = authenticate(request, username=username, password=password)
        if user is not None:
            if user.is_active:
                raw_token = RefreshToken.for_user(user)
                response.set_cookie("access_token", str(raw_token.access_token), httponly=True, secure=False, samesite="Lax")
                response.set_cookie("refresh_token", str(raw_token), httponly=True, secure=False, samesite="Lax")

                response_data = {
                    "username": username,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email,
                }
                response.data = {
                    "Success": "Auth Cookie Set", "data":response_data,
                }
                return response
            else:
                return Response({"Failed": "User is not active"}, status=403)
        else:
            return Response({"Failed": "Invalid Username or Password"}, status=404)

    