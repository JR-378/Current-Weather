import React from 'react';
import axios from "axios"
import { connect } from 'react-redux';

import Cities from '../components/Cities';

class CityListView extends React.Component {

    state = {
        cities: []
    }

    fetchCities = () => {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
        };
        axios.get("/api/").then(res => {
          this.setState({
            cities: res.data
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
            <Cities data={this.state.cities}></Cities>
        )
    }
}

const mapStateToProps = state => {
    return {
      token: state.token
    }
  }

export default connect(mapStateToProps)(CityListView)