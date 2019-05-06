import React from "react";
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Col, Button } from "react-bootstrap";

const schema = yup.object({
    city: yup.string().required(),
    country: yup.string().required(),
    unit: yup.string().required(),
  });


// Form validation with Formik not working, so its been left there and ignored
// Note: seems like Formik needs to be defined somehow: https://codesandbox.io/s/zl8zr8yqx
// or used like this: https://codesandbox.io/s/zKrK5YLDZ
class WeatherByCityForm extends React.Component{
    render() {
        return(
            <Formik
                initialValues={{
                    city: "",
                    country: ""
                }}
                validationSchema={schema}
                onSubmit={console.log}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                }) => (
                    <Form onSubmit={this.props.handleFormSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} md="3" controlId="validationFormik01">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="city"
                                    value={values.city}
                                    onChange={handleChange}
                                    isValid={touched.city && !errors.city}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationFormik02">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="country"
                                    value={values.country}
                                    onChange={handleChange}
                                    isValid={touched.country && !errors.country}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="2" controlId="validationFormik03">
                                <Form.Label>Temperature unit</Form.Label>
                                <Form.Control
                                    as="select"
                                    type="text"
                                    name="unit"
                                    value={values.unit}
                                    onChange={handleChange}
                                    isValid={touched.unit && !errors.unit}
                                >
                                    <option>Celsius</option>
                                    <option>Fahrenheit</option>
                                    <option>Kelvin</option>
                                </Form.Control>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <div className="text-left">
                            <Button id="get-weather" type="submit">Get weather</Button>
                        </div>
                        
                    </Form>
                )}
            </Formik>
        )
    }
}

export default WeatherByCityForm;