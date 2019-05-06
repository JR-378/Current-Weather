import React from 'react';
import axios from "axios"
import { connect } from 'react-redux';
import { Spinner} from "react-bootstrap";

import CitiesWeather from '../components/CitiesWeather';

class CitiesWeatherView extends React.Component {

    state = {
        cities: [],
        isLoading: false
    }

    fetchCities = () => {
        this.setState({
            isLoading: true
        })

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
        };
        axios.get("https://<your.url>.herokuapp.com/api/weather/cities/").then(res => {
          this.setState({
            cities: res.data,
            isLoading: false
          });
        });

        
      }

    // Called every time component mounts
    componentDidMount() {
        this.fetchCities();
    }

    // Called every time component receives props
    componentWillReceiveProps(newProps) {
        if (newProps.token) {
            this.fetchCities();      
        }
    }
    
    render() {
        return (
            <React.Fragment>
                {
                    this.state.isLoading ?

                    <Spinner animation="border" variant="primary" />

                    :

                    <CitiesWeather data={this.state.cities}></CitiesWeather>

                }
            </React.Fragment>
            
        )
    }
}

const mapStateToProps = state => {
    return {
      token: state.token
    }
  }

export default connect(mapStateToProps)(CitiesWeatherView)