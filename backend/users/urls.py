from django.urls import path
from . import views


urlpatterns = [
    path('api/RegisterData', views.RegisterUserData),
    path('api/LoginData',views.LogInData),
]
