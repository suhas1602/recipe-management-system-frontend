import React from "react";
import { Form, Input, Button, message } from 'antd';
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
 
const Signup = () => {
    const history = useHistory();
    const onFinish = async values => {
        try {
            const response = await axios({
                method: "POST",
                url: process.env.REACT_APP_API_ENDPOINT + "/v1/user",
                headers: {"Content-Type": "application/json"},
                data: {
                    email: values.email,
                    password: values.password,
                    firstname: values.firstname,
                    lastname: values.lastname,
                }
            });    
            // console.log(response);
            history.replace("/login");
        } catch (err) {
            // console.log(err.response);
            message.error(err.response.data);
        }         
    };
    
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    
    return sessionStorage.getItem("auth") !== null ? (<Redirect to={{pathname: "/"}} />) :
    (<div style={{minHeight: "calc(100vh - 134px)", padding: "50px 50px 0 50px"}}>
        <div style={{width: "50vw"}}>
            <Form
                {...layout}
                name="login"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[{ required: true, message: 'Please input your email address!' }]}
                >
                  <Input />
                </Form.Item>
                
                <Form.Item
                  label="First Name"
                  name="firstname"
                  rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Last Name"
                  name="lastname"
                  rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
            </Form>            
        </div>    
    </div>)
}

export default Signup;