import React, { Component } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import "./Signup.css";
import { Form, Icon, Input, Button, Checkbox, DatePicker } from "antd";
const FormItem = Form.Item;

class Signup extends Component {
  state = {};

  submit_res = null;

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
            this.submit_res = (
              <div>
                <p>
                  Please visit<a>response</a>
                </p>
              </div>
            );
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
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
        {this.submit_res}
      </Form>
    );
  }
}

const Sign_up = Form.create()(Signup);

export default Sign_up;
