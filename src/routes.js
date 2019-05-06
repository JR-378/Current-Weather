import React from 'react';
import {Route} from "react-router-dom"

import CityListView from "./containers/CityListView"
import CityDetailView from "./containers/CityDetailView"
import CurrentWeatherByCityView from "./containers/CurrentWeatherByCityView"
import CitiesWeatherView from "./containers/CitiesWeatherView"
import Login from "./containers/Login";

const BaseRouter = () => (
    <div>
        <Route exact path="/" component={CurrentWeatherByCityView} />
        <Route exact path="/login/" component={Login} />
        <Route exact path="/weather/" component={CitiesWeatherView} />
        <Route exact path="/city/" component={CityListView} />
        <Route exact path="/city/:cityID" component={CityDetailView} />
    </div>
)

export default BaseRouter