import React, { Component } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import "./Signup.css";
import { Form, Input, Button, DatePicker } from "antd";
const FormItem = Form.Item;

class Signup extends Component {
  state = {
    res: {},
    res_received: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
          DOB: fieldsValue["date-picker"].format("YYYY-MM-DD")
        };
        delete values["date-picker"];
        console.log("Received values of form: ", values);
        axios
          .post("/signup", JSON.stringify(values))
          .then(response => {
            console.log(response);
            this.setState({ res: response.data });
            this.setState({ res_received: true });
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let result = null;
    if (this.state.res_received) {
      result = (
        <p>
          <b>
            {this.state.res[0].message
              ? this.state.res[0].message
              : "User created"}
          </b>
          <br />
          Visit{" "}
          <a target="_blank" href={this.state.res[1].link}>
            Google Sheet
          </a>
        </p>
      );
    }

    return (
      <Form onSubmit={this.handleSubmit} className="signup-form">
        <h4 className="signup-form--title">Sign up</h4>
        <FormItem>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Please input your Name!" }]
          })(<Input placeholder="Name" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(<Input placeholder="Username" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(<Input placeholder="Email" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [
              { required: true, message: "Please input your Password!" },
              { min: 8, message: "Minimum password length is 8 characters" }
            ]
          })(<Input type="password" placeholder="Password" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("date-picker", {
            rules: [
              { type: "object", required: true, message: "Please select date!" }
            ]
          })(<DatePicker placeholder="Select DOB" className="date-picker" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("city", {
            rules: [{ required: true, message: "Please enter your city!" }]
          })(<Input type="text" placeholder="City" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("phone", {
            rules: [
              { required: true, message: "Please input your Contact no!" }
            ]
          })(<Input type="tel" placeholder="Phone" />)}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="signup-form-button"
          >
            Register
          </Button>
          Or <a href="">Sign in</a>
        </FormItem>
        {result}
      </Form>
    );
  }
}

const Sign_up = Form.create()(Signup);

export default Sign_up;
