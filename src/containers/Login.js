import React from 'react';
import { Form, Icon, Input,  } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { Spinner, Image, Alert, Button } from "react-bootstrap";
import jr from "../assets/jr.png"

const FormItem = Form.Item;


class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.userName, values.password);
        this.props.history.push('/');
      }
    });
  }

  render() {
    let errorMessage = null;
    if (this.props.error) {
        errorMessage = (
            <Alert variant="danger">
                {this.props.error.message}
            </Alert>
        );
    }

    const { getFieldDecorator } = this.props.form;
    return (
        <div id="login-form" className="text-center">
            {errorMessage}
            {
                this.props.loading ?

                <Spinner animation="border" variant="primary" />

                :

                <Form onSubmit={this.handleSubmit} className="form-signin">
                    <Image className="mb-2" src={jr} rounded />
                    <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
                    <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                    </FormItem>

                    <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                    </FormItem>

                    <FormItem>
                    <Button className="btn-lg btn-block" id="sign-in" type="submit">Sign in</Button>
                    </FormItem>
                </Form>
            }
      </div>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLoginForm);