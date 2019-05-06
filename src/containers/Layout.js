import React from 'react';
import * as bs from "react-bootstrap"
// import {Link} from "react-router-dom"
import LoginForm from "./Login"
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';


// https://getbootstrap.com/docs/4.3/examples/navbar-fixed/
class NavigationBar extends React.Component {
    render() {
        //console.log("Navigation bar here")
        //console.log(this.props)
        return (
            <bs.Navbar bg="primary" variant="dark" expand="md">
                <bs.Navbar.Brand>Django Weather</bs.Navbar.Brand>
                <bs.Nav>
                    <bs.Nav.Link href="/">Home</bs.Nav.Link>
                    <bs.Nav.Link href="/weather">Weather in cities</bs.Nav.Link>
                    <bs.Nav.Link href="/city/">All Cities</bs.Nav.Link>
                </bs.Nav>
                <ul className="navbar-nav ml-auto ">
                    <li className="justify-content-end">
                        <bs.Button variant="dark" size="lg" onClick={this.props.logout}>Log out</bs.Button>
                    </li>
                </ul>
            </bs.Navbar>
        )
    }
}

class Layout extends React.Component {

    render() {
        return (
            <React.Fragment>
                {
                    this.props.isAuthenticated ?
                    <React.Fragment>
                        <NavigationBar {...this.props}/>
                        <bs.Container>
                            {this.props.children}
                        </bs.Container>
                    </React.Fragment>

                    :

                    <React.Fragment>
                        <LoginForm {...this.props}/>
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()) 
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Layout));
