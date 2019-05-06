import React from "react";
import {Card, CardGroup, Button} from "react-bootstrap"


class Cities extends React.Component{

    listCities = () => {
        //console.log(this.props)

        const dataLength = this.props.data.length
        const cityData = this.props.data
        let cardGroups = []
        
        if (dataLength !== 0) {

            /* Create a card group every 4th index in data*/
            for (var i=0; i < dataLength;) {
                //console.log("Looping")

                i = i + 4
                let childCards = []

                /* Create a city card and add it to the list */
                for (var j=i-4; j < i && j < dataLength; j++) {
                    //console.log(cityData[j])
                    childCards.push(CityCard(cityData[j]))
                }

                cardGroups.push(
                    <CardGroup key={i} className="text-center">
                        {childCards}
                    </CardGroup>
                )
            }
            
            return cardGroups
          }
      }
    
    render() {
        return (
            <React.Fragment>
                {this.listCities()}
            </React.Fragment>
        )
    }
}

export default Cities;


function CityCard(city) {
    return <Card style={{ width: '12rem' }} key={city.id}>
        <Card.Body>
            <Card.Title>{city.name}</Card.Title>
            <Card.Text>
                {city.country}
            </Card.Text>
            <Button variant="primary" href={`/city/${city.id}`}>Details</Button>
        </Card.Body>
    </Card>;
}
