import React from "react";
import { Form, Input, Button, Row, Col, message } from 'antd';
import { useHistory, useLocation, Redirect, Link } from "react-router-dom";
const axios = require("axios");

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

const Login = () => {
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/recipe" } };

    const onFinish = async values => {
        const authHeader = `Basic ${Buffer.from(values.username + ":" + values.password).toString("base64")}`;
        try {
            const response = await axios({
                method: "get",
                url: process.env.REACT_APP_API_ENDPOINT + "/v1/user/self",
                headers: {"Authorization": authHeader}
            });
            if(response.status == 200) {
                sessionStorage.setItem("auth", authHeader);
                history.replace(from);
            }
        } catch(err) {
            message.error("Login failed. Please check you credentials once again.");
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
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
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
            <Row>
              <Col offset={8}>
                <Link to="/signup">Click here to create a new account</Link>
              </Col>
            </Row>            
        </div>    
    </div>)
}

export default Login;