from django.db import IntegrityError
from rest_framework import status
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .open_weather_map import OpenWeatherMap
from .serializers import CitySerializer, CityWeatherSerializer
from .models import City


class CityWeather(APIView):
    permission_classes = (IsAuthenticated,)
    queryset = City.objects.all()

    def post(self, request):
        api = OpenWeatherMap()
        print("Request", request, request.data)

        city = request.data["city"]
        country = request.data["country"]
        unit = request.data["unit"]

        if country != "":
            location = city + "," + country
        else:
            location = city

        weather_data = api.current_weather(location, unit)
        weather_data["city"] = city.capitalize()

        results = CityWeatherSerializer(weather_data, many=False).data
        return Response(results)


class CitiesWeather(APIView):
    queryset = City.objects.all()
    # serializer_class = CitySerializer

    def get(self, request):
        api = OpenWeatherMap()
        weather_data = []

        cities = City.objects.all().order_by("name")
        for city in cities:
            weather = api.current_weather(city.name, unit="c")
            weather["city"] = city.name

            # print("City weather", weather)

            weather_data.append(weather)

        results = CityWeatherSerializer(weather_data, many=True).data
        return Response(results)


class CityRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    """ View cities. """
    permission_classes = (IsAuthenticated, )
    queryset = City.objects.all()
    serializer_class = CitySerializer


class CityListAPIView(ListAPIView):
    """ View cities. """
    permission_classes = (IsAuthenticated, )
    queryset = City.objects.all().order_by("name")
    serializer_class = CitySerializer


class CityListCreate(ListCreateAPIView):
    """ View and create cities. """
    permission_classes = (IsAuthenticated, )
    queryset = City.objects.all()
    serializer_class = CitySerializer

    def create(self, request, *args, **kwargs):
        try:
            return super(ListCreateAPIView, self).create(request, *args, **kwargs)
        except IntegrityError:
            # This is due to case sensitivity in the City model.
            return Response(
                data={
                    "error": "This city is already saved."
                    },
                status=status.HTTP_400_BAD_REQUEST
            )


class MyCities(APIView):
    """ Allow user to view his/her favorite cities. """
    # permission_classes = [permissions.IsAuthenticated, ]
    queryset = City.objects.all()
    serializer_class = CitySerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return City.objects.filter(user=user)
