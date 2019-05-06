import React from 'react';
import * as bs from "react-bootstrap"
// import {Link} from "react-router-dom"
import LoginForm from "./Login"
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';


// Not finished. Lets keep it simple for now. Source: https://getbootstrap.com/docs/4.3/examples/dashboard/
/*
class Sidebar extends React.Component {
    render () {
        return (
            <bs.Container fluid>
                <bs.Row>
                    <bs.Nav className="col-md-2 d-none d-md-block bg-light sidebar">
                        <div className="sidebar-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#home">
                                        Dashboard
                                        <span className="sr-only"></span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </bs.Nav>

                </bs.Row>
                    
                </bs.Container>     
        )
    }
}
*/

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
            /*
            <div>
                <NavigationBar {...this.props}/>
                <bs.Container>
                    {this.props.children}
                </bs.Container>
            </div>
            */
            
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
