import React from 'react';
import Layout from "./containers/Layout"
import {BrowserRouter as Router} from "react-router-dom"
import BaseRouter from "./routes"
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import * as actions from './store/actions/auth';

class App extends React.Component {

    componentDidMount() {
      this.props.onTryAutoSignup();
    }
  
    render() {
      return (
          <Router>
            <Layout {...this.props}>
                <BaseRouter />
            </Layout>
          </Router>
      );
    }
  }

/*
function App() {
  return (
    <div>
        <Router>
            <Layout {...this.props}>
                <BaseRouter />
            </Layout>
        </Router>
    </div>
  );
}
*/

const mapStateToProps = state => {
    return {
      isAuthenticated: state.token !== null
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(App);
