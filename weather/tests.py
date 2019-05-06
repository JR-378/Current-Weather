from django.test import SimpleTestCase
from .open_weather_map import OpenWeatherMap


class OpenWeatherMapTestCase(SimpleTestCase):

    def test_check_country_code(self):
        location = "Ilmajoki,Finland"
        api = OpenWeatherMap()

        location = api.check_country_code(location)
        self.assertEqual(location, "Ilmajoki,fi")

    def test_no_country_code(self):
        location = "Ilmajoki"
        api = OpenWeatherMap()

        location = api.check_country_code(location)
        self.assertEqual(location, "Ilmajoki")

    def test_check_location(self):
        location = "Seinäjoki"
        api = OpenWeatherMap()

        location = api.check_location(location)
        self.assertEqual(location, "Seinaejoki")

    def test_country_code_to_country(self):
        country_code = "FI"
        api = OpenWeatherMap()

        country = api.country_code_to_country(country_code)
        self.assertEqual(country, "Finland")
