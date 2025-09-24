from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from django.contrib.auth.hashers import make_password, check_password


@api_view(["POST"])
def RegisterUserData(request):
    name = request.data.get('name')
    surname = request.data.get('surname')
    email = request.data.get('email')
    password = request.data.get('password')
    ndpassword = request.data.get("repassword")

    counterdigits = sum(char.isdigit() for char in password)

    counterUpper = sum(char.isupper() for char in password)

    counter = len(password)

    if (counter < 8):
        return Response({"success": False, "error": "Password is too short"}, status=400)

    if not all([name, surname, email, password, ndpassword]):
        return Response({"success": False, "error": "Missing fields"}, status=400)

    if (len(password) < 8):
        return Response({"success": False, "error": "Password is to short"}, status=400)

    if (counterdigits < 3):
        return Response({"success": False, "error": "Not enough digits"}, status=400)

    if (counterUpper < 1):
        return Response({"success": False, "error": "Not enough uppercase letters"}, status=400)

    if (password != ndpassword):
        return Response({"success": False, "error": "Passwords don't match"}, status=400)

    if (User.objects.filter(email=email).exists()):
        return Response({"success": False, "error": "this email is already used"}, status=400)

    hashedPassword = make_password(
        password=password, salt=None, hasher="default")
    user = User.objects.create(
        name=name, surname=surname, email=email, password=hashedPassword)

    return Response({"success": True}, status=200)


@api_view(['POST'])
def LogInData(request):
    user = User.objects.filter(email=email).first()

    email = request.data.get('email')
    password = request.data.get('password')
    is_valid = check_password(
        password=password, encoded=user.password)

    if not user:
        return Response({"logged": False, "message": "User doesn't exist"})
    if not is_valid:
        return Response({"logged": False, "message": "Wrong password"})

    return Response({"logged": True, "message": "Logged In"})
