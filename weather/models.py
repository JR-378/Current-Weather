from django.db import models
from django.contrib.auth.models import User


class City(models.Model):
    name = models.CharField(max_length=85)
    country = models.CharField(max_length=85, blank=True)
    country_code = models.CharField(max_length=2, blank=True)
    latitude = models.DecimalField(max_digits=6, decimal_places=4, default=0)
    longitude = models.DecimalField(max_digits=7, decimal_places=4, default=0)
    zip_code = models.PositiveIntegerField(default=0)

    user = models.ManyToManyField(User, related_name="my_cities", blank=True)

    def _str_(self):  # show the actual city name on the dashboard
        return self.name

    def save(self, *args, **kwargs):
        self.name = self.name.capitalize()
        self.country = self.country.capitalize()
        self.country_code = self.country_code.lower()
        return super(City, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "cities"
        unique_together = ("name", "country_code")
