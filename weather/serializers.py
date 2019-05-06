from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import City


class CityWeatherSerializer(serializers.Serializer):
    """ Serializes cities. """
    id = serializers.IntegerField()
    city = serializers.StringRelatedField()
    country_code = serializers.StringRelatedField()
    country = serializers.StringRelatedField()

    temperature = serializers.StringRelatedField()
    temperature_max = serializers.StringRelatedField()
    temperature_min = serializers.StringRelatedField()
    temperature_unit = serializers.StringRelatedField()
    humidity = serializers.StringRelatedField()
    pressure = serializers.StringRelatedField()
    wind_speed = serializers.StringRelatedField()
    description = serializers.StringRelatedField()

    latitude = serializers.DecimalField(max_digits=6, decimal_places=4, default=0)
    longitude = serializers.DecimalField(max_digits=7, decimal_places=4, default=0)

    icon = serializers.StringRelatedField()


class CitySerializer(serializers.ModelSerializer):
    """ Serializes cities. """

    class Meta:
        model = City
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")
