from django.urls import path
from . import views

urlpatterns = [
    # path('', views.index),
    path('', views.CityListAPIView.as_view()),
    path('city', views.CityListCreate.as_view()),
    path('city/<pk>', views.CityRetrieveUpdateDestroyAPIView.as_view()),

    path('weather/', views.CityWeather.as_view()),
    path('weather/cities/', views.CitiesWeather.as_view()),
    # path('api/auth/login', views.LoginAPI.as_view()),
    # path('api/auth/user', views.UserAPI.as_view()),
    # TODO: Add cities like this to user. '<str:username>/' <= instead?
    path('<username>/my_cities', views.MyCities, name='My Cities')
]
