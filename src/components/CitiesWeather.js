import React from 'react';
import { Media, Row } from "react-bootstrap";

class CitiesWeather extends React.Component{

    listCitiesWeather = () => {

        //console.log("listCitiesWeather", this.props)

        const dataLength = this.props.data.length
        const cityData = this.props.data

        // maximum amount of items to put in a row
        const rowMax = 3
        let rows = []
        
        if (dataLength !== 0) {

            /* Create a card group every 4th index in data*/
            for (var i=0; i < dataLength;) {
                //console.log("Looping")

                i = i + rowMax
                let childCards = []

                /* Create a city card and add it to the list */
                for (var j=i-rowMax; j < i && j < dataLength; j++) {
                    //console.log(cityData[j])
                    childCards.push(createCityWeatherMedia(cityData[j]))
                }

                rows.push(
                    <Row key={i} className="text-center">
                        {childCards}
                    </Row>
                )
            }
            
            return rows
          }

        /*
        if ( this.props.data.length !== 0 ) {
          return this.props.data.map( city =>

            createCityWeatherMedia(city)
          )
        }
        */
      }

    render(){
        console.log(this.props.city)

        return(
            <div>
                {this.listCitiesWeather()}
            </div>
        )
    }
}

export default CitiesWeather;

function createCityWeatherMedia(city) {
    return <Media id="city-weather" key={city.id}>
        <img width={64} height={64} className="mr-3" src={`http://openweathermap.org/img/w/${city.icon}.png`} alt="WeatherImage" />
        <Media.Body>
            <h4>{city.city}, {city.country_code}</h4>
            <h5>{city.temperature} {city.temperature_unit}</h5>
            <h5>{city.humidity} %</h5>
            <p>{city.description}</p>
        </Media.Body>
    </Media>;
}
