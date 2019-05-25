import requests
import logging
import pycountry

logger = logging.getLogger(__name__)

OPEN_WEATHER_MAP_API = "https://api.openweathermap.org/data/2.5/"
OPEN_WEATHER_MAP_API_KEY = "<Your API key here>"


class OpenWeatherMap(object):

    def __init__(self, api=OPEN_WEATHER_MAP_API, api_key=OPEN_WEATHER_MAP_API_KEY):
        self.api = api
        self.api_key = api_key

    def _add_unit_and_api_key(self, url, unit):
        """
        Adds unit and api key to the url of OpenWeatherMap api.
        :param url: Base address to the OpenWeatherMap api
        :param unit: Temperature unit of either C, F or K.
        :return: Tuple of the url and determined unit
        """
        unit = unit.lower()

        if unit == "c" or unit == "celsius":
            unit_url = "&units=metric"
            unit = "°C"
        elif unit == "f" or unit == "fahrenheit":
            unit_url = "&units=imperial"
            unit = "°F"
        elif unit == "k" or unit == "kelvin":
            unit_url = ""
            unit = "K"
        else:
            raise TypeError("Always provide unit")

        url = url + unit_url + "&appid={}".format(self.api_key)
        logger.debug("Complete url to api: " + str(url))
        return url, unit

    def current_weather(self, location, unit=None):
        """
        Request weather by location from Open Weather Map
        :param location: Location in format of: {city name},{country code}. Supplying country code is not necessary,
        however it needs to be supplied in ISO 3166 format (e.g. fi, uk, etc.) if it is. Example location: "Ilmajoki,fi"
        :param unit: Temperature unit (e.g. C, F, K, full names also work). Defaults to Celsius.
        :return: Weather data as dictionary.
        """

        location = self.check_country_code(location)

        if unit is None:
            logger.debug("No temperature unit supplied. Defaulting to celsius.")
            unit = "c"

        url = self.api + "weather?q={}".format(location)
        complete_url, unit = self._add_unit_and_api_key(url, unit)
        response = requests.get(url=complete_url)
        data = response.json()

        logger.debug("Received weather data: " + str(data))

        country_code = data["sys"]["country"]
        weather_data = {
            'id': data["id"],
            'city': data["name"],
            'country_code': data["sys"]["country"],
            'country': self.country_code_to_country(country_code),

            'temperature': data['main']['temp'],
            'temperature_max': data['main']['temp_max'],
            'temperature_min': data['main']['temp_min'],
            'temperature_unit': unit,
            'humidity': data['main']['humidity'],
            'pressure': data['main']['pressure'],
            'description': data['weather'][0]['description'],

            'latitude': data['coord']['lat'],
            'longitude': data['coord']['lon'],

            'icon': data['weather'][0]['icon'],
            'wind_speed': data['wind']['speed']
        }
        logger.debug("Parsed data to: " + str(weather_data))

        return weather_data

    @staticmethod
    def check_country_code(location):
        """
        Checks if country was supplied. If e.g. Finland was supplied, then it will be converted to fi.
        :param location: Location in the format of {city name},{country code}. Supplying country code is not necessary.
        :return:
        """
        country_and_code = location.split(",", 1)

        if len(country_and_code) is not 2:
            logger.debug("No country code supplied.")
            logger.debug("Location is " + location + ".")
            return location

        country_code = country_and_code[1]
        logger.debug("Country code is " + country_code)
        
        if country_code != "":
            logger.debug("Converting " + country_code + " to country code.")
            country_code = pycountry.countries.get(name=country_code).alpha_2.lower()
            logger.debug("Country code is " + country_code + ".")
            location = location.rsplit(",", 1)[0] + "," + country_code
            logger.debug("Location is " + location + ".")
        else: 
            return country_and_code[0]

        return location

    @staticmethod
    def country_code_to_country(country_code):
        return pycountry.countries.get(alpha_2=country_code).name

    @staticmethod
    def check_location(location):
        split_location = location.rsplit(",", 1)
        city = split_location[0]
        try:
            country_code = split_location[1]
        except IndexError:
            country_code = None
            logger.debug("No country code supplied.")

        # Remove special letters and replace them with values used by the API.
        city_corrected = city.replace("ä", "ae").replace("ö", "o").replace("å", "a")

        if country_code is not None:
            city_corrected = city_corrected + "," + country_code

        return city_corrected


