import React from 'react';
import axios from "axios"
import {Card, ListGroup, ListGroupItem} from "react-bootstrap"
import { connect } from 'react-redux';


class CityDetailView extends React.Component {

    state = {
        city: []
    }

    // Called every time component is mounted
    componentDidMount() {
        const cityID = this.props.match.params.cityID

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
        };
        
        console.log(axios.defaults.headers)
        axios.get(`https://jesse-reinikka-weather.herokuapp.com/api/city/${cityID}`)
            .then(response => {
                this.setState({
                    city: response.data
                })
                console.log(response.data)
            })
    }
    
    render() {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{this.state.city.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.state.city.country}</Card.Subtitle>
                </Card.Body>
                <ListGroup>
                    <ListGroupItem>Country code: {this.state.city.country_code}</ListGroupItem>
                    <ListGroupItem>Latitude: {this.state.city.latitude}</ListGroupItem>
                    <ListGroupItem>Longitude: {this.state.city.longitude}</ListGroupItem>
                    <ListGroupItem>Zip code: {this.state.city.zip_code}</ListGroupItem>
                </ListGroup>
            </Card>
        )
    }
}
const mapStateToProps = state => {
    return {
      token: state.token
    }
  }

export default connect(mapStateToProps)(CityDetailView)