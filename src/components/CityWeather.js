import React from 'react';
import { Media, Col, Row,  } from "react-bootstrap";
import { Statistic, Card } from 'antd';

class CityWeather extends React.Component{

    cityWeather() {
        return <Media id="city-weather">
            <img width={64} height={64} className="mr-3" src={`http://openweathermap.org/img/w/${this.props.data.icon}.png`} alt="WeatherImage" />
            <Media.Body>
                <h4>{this.props.data.city}, {this.props.data.country_code}</h4>
                <h5>{this.props.data.temperature} {this.props.data.temperature_unit}</h5>
                <p>{this.props.data.description}</p>
            </Media.Body>
        </Media>;
    }

    createCityWeatherMedia() {
        return <React.Fragment>
            <Row className="mb-3">
                <Card className="col mr-2">
                    <Row className="mb-2">
                        <Col>
                            <h5>Location</h5>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <Statistic 
                                title="City"
                                value={this.props.data.city}
                            />
                        </Col>
                        <Col>
                            <Statistic 
                                title="Country"
                                value={this.props.data.country}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Statistic 
                                title="Latitude"
                                value={this.props.data.latitude}
                            />
                        </Col>
                        <Col>
                            <Statistic 
                                title="Longitude"
                                value={this.props.data.longitude}
                            />
                        </Col>
                    </Row>
                </Card>
                <Card className="col">
                    <Row className="mb-2">
                        <Col>
                            <h5>Temperature</h5>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col className="mr-5">
                            <Statistic 
                                title="Now" 
                                value={this.props.data.temperature}
                                suffix={this.props.data.temperature_unit}
                            />
                        </Col>
                        <Col>
                            <Statistic 
                                title="Max"
                                value={this.props.data.temperature_max}
                                suffix={this.props.data.temperature_unit}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mr-5"></Col>
                        <Col>
                            <Statistic 
                                title="Min"
                                value={this.props.data.temperature_min}
                                suffix={this.props.data.temperature_unit}
                            />
                        </Col>
                    </Row>
                </Card>
            </Row>
            <Row>
                <Card className="col mr-2">
                    <Row className="mb-2">
                        <Col>
                            <h5>Description</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mr-0">
                            <img width={64}
                                height={64}
                                src={`http://openweathermap.org/img/w/${this.props.data.icon}.png`} 
                                alt="WeatherImage" 
                            />
                            <Statistic 
                                value={this.props.data.description}
                            />
                        </Col>
                    </Row>
                </Card>
                <Card className="col">
                    <Row className="mb-2">
                        <Col>
                            <h5>Other</h5>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <Statistic
                                title="Humidity" 
                                value={this.props.data.humidity}
                                suffix="%"
                            />
                        </Col>
                        <Col>
                            <Statistic
                                title="Pressure" 
                                value={this.props.data.pressure}
                                suffix="hpa"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-1">
                        <Col>
                            <Statistic
                                title="Wind"
                                value={this.props.data.wind_speed}
                                suffix="m/s"
                            />
                        </Col>
                    </Row>
                </Card>
            </Row>
        </React.Fragment>

    }

    render(){
        //console.log(this.props.city)

        return(
            this.createCityWeatherMedia()
            
        )
    }
}

export default CityWeather;