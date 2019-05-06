import React from 'react';
//import axios from "axios"
import {Button, Alert, Spinner} from "react-bootstrap"
import WeatherByCityForm from '../components/WeatherByCityForm';
import CityWeather from "../components/CityWeather"
import axios from "axios"
import { connect } from 'react-redux';


class CurrentWeatherByCityView extends React.Component {

    
    state = {
        haveWeatherdata: false,
        weatherData: {
            city: undefined,
            country_code: undefined,
            country: undefined,
            temperature: undefined,
            temperature_unit: undefined,
            humidity: undefined,
            description: undefined,
            latitude: undefined,
            longitude: undefined,
            icon: undefined
        },
        errorMessageSubmit: undefined,
        errorMessage: undefined,
        successMessage: undefined,
        isLoading: false
      }
      
   
   handleFormSubmit = (event) => {
        event.preventDefault()

        this.setState({
            isLoading: true
        })

        const city = event.target.elements.city.value
        const country = event.target.elements.country.value
        const unit = event.target.elements.unit.value

        // console.log(city, country, unit)
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
        };

        axios.post("https://<your.url>.herokuapp.com/api/weather/", {
                    city: city,
                    country: country,
                    unit: unit
        })
        .then(res => {
            //console.log(res)

            this.setState({
                haveWeatherdata: true,
                isLoading: false,
                weatherData: {
                    city: res.data.city,
                    country_code: res.data.country_code,
                    country: res.data.country,
                    temperature: res.data.temperature,
                    temperature_unit: res.data.temperature_unit,
                    humidity: res.data.humidity,
                    description: res.data.description,
        
                    latitude: res.data.latitude,
                    longitude: res.data.longitude,
        
                    icon: res.data.icon
                }
            })
            console.log(this.state.weatherData)
        })
        .catch(err => {
            // console.log(err)
            this.setState({
                haveWeatherdata: false,
                isLoading: false
            })

            if (err.response) {
                this.setState({
                    errorMessageSubmit: err.response.status + " " + err.response.statusText
                })
            }
        })
    }

    handleSave = (event) => {
        event.preventDefault()

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
        };

        console.log("handleSave", this.state.weatherData)
        const data = this.state.weatherData

        axios.post("https://<your.url>.herokuapp.com/api/city", {
            "name": data.city,
            "country": data.country,
            "country_code": data.country_code,
            "latitude": data.latitude,
            "longitude": data.longitude,
            
        })
        .then(res => {
            // console.log(res)

            this.setState({
                successMessage: "City successfully saved."
            })
        //console.log(this.state.weatherData)
        })
        .catch(err => {
            //console.log(err)

            if (err.response) {
                //console.log(err.response)

                // Message from Django backend
                if (err.response.data.error) {
                    console.log("err.response.data", err.response.data)
                    console.log("err.response.data.error", err.response.data.error)
                    this.setState({
                        errorMessage: err.response.data.error
                    })

                    console.log("errorMessage", this.state.errorMessage)
                }
                else {
                    this.setState({
                        errorMessage: err.response.status + " " + err.response.statusText
                    })
                }
            }
        })
    }

    render() {
        const haveWeatherdata = this.state.haveWeatherdata
        let showWeatherData = null
        let saveWeatherData = null
        let errorSubmitMessage = null;

        if (haveWeatherdata) {
            showWeatherData = <CityWeather data={this.state.weatherData}>
            </CityWeather>
            // TODO: Save City
            saveWeatherData = <Button 
                id="save-city" 
                onClick={this.handleSave} block
                size="lg"
                >Save city?
            </Button>
        } else if (this.state.errorMessageSubmit) {
            errorSubmitMessage = (
                <Alert variant="danger">
                    {this.state.errorMessageSubmit}
                </Alert>
            );
        }

        let alertSaveMessage = null;
        if (this.state.errorMessage) {
            alertSaveMessage = (
                <Alert variant="danger">
                    {this.state.errorMessage}
                </Alert>
            );
        } else if (this.state.successMessage) {
            alertSaveMessage = (
                <Alert variant="success">
                    {this.state.successMessage}
                </Alert>
            );
        }

        return (
            <React.Fragment>
                <section>
                    <WeatherByCityForm handleFormSubmit={this.handleFormSubmit}></WeatherByCityForm>
                    {errorSubmitMessage}
                </section>
                <section id="current-weather-city">
                    <h2 className="mb-5 text-left ">Current weather for a city</h2>
                    {
                        this.state.isLoading ?

                        <Spinner animation="border" variant="primary" />

                        :
                        
                        null
                    }
                        {alertSaveMessage}
                        {showWeatherData}
                        {saveWeatherData}
                </section>
            </React.Fragment>
            
        )
    }
}
const mapStateToProps = state => {
    return {
      token: state.token
    }
  }

export default connect(mapStateToProps)(CurrentWeatherByCityView)