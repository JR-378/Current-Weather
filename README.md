# Current-Weather

This is a weather application with Django backend and React frontend. In the application user can search for a city's weather and save the location for further use. The weather data is provided by [OpenWeatherMap](https://openweathermap.org/) API. In the backend, there is a class OpenWeatherMap, which is used to dynamically build the url for the [Current weather data API](https://openweathermap.org/current) and to parse the data for the frontend to use. When the user saves the city, all this parsed data will be used to create a city within an SQLite database.

Deleting or updating cities were not added, as I determined them to be out of the scope for this project's purpose. I only wanted the application to present data and to do that there needs to be a way to add it. Thus modifying data is not implemented, except in the Django Admin interface. However, the backend does check that there are nor will be any duplicate cities with the same country.

A simple token authentication is implemented in the application. The frontend keeps the user logged in for one hour, before automatically logging out the user. There is no registration API either, as I want it to be available to users that **I have** given access to.

## What is what

Folders **public** and **src** contain React related code. The folder **weather_site** is the main Django application and its settings. The folder **weather** contains the implementation of the API.

### How to build React application

```cmd

$ npm run build
```

### How to run Django
```cmd

$ python manage.py runserver
```

## References

I was already well-versed in Python and using Django is pretty straightforward, but using React and coding JavaScript in general has always been a challenge. I propably couldn't have created this application without [JustDjango's](https://www.youtube.com/channel/UCRM1gWNTDx0SHIqUJygD-kQ/featured) great tutorial about how to use React with Django and how to deploy the application to Heroku.

- [JustDjango - Django and React Tutorial // 1 - Creating a Fullstack Application](https://www.youtube.com/watch?v=uZgRbnIsgrA)
- [Building a Weather App in Django](https://scotch.io/tutorials/building-a-weather-app-in-django)
- [Build a React.Js weather app with stateless functional components](https://medium.com/@peterekeneeze/build-a-react-js-weather-app-with-stateless-functional-components-e61567004b54)
