import React from 'react';
import logo from './logo.svg';
import { Layout, Button, Typography, Row, Col } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory
} from "react-router-dom";
import HomePage from "./components/Home"
import LoginPage from "./components/Login"
import SignupPage from "./components/Signup"
import RecipePage from "./components/Recipe"
import AddRecipePage from "./components/AddRecipe"
import './App.css';

const { Header, Footer, Content } = Layout;
const { Text, Title } = Typography;

const App = () => {
  let history =  useHistory();
  return (
    <div>
      <Layout>
        <Header>
          <Row>
            <Col span={12}><Title level={2} style={{marginTop: 12, color: "white"}}>Recipe Management System</Title></Col>
            {sessionStorage.getItem("auth") !== null && 
            <Col span={12}>
              <div style={{float: "right"}}>
                <Text style={{color: "white", marginRight: 5}}>Hello {Buffer.from(sessionStorage.getItem("auth").substr(6), "base64").toString("utf-8").split(":")[0]}</Text>
                <Button onClick={() => {
                  sessionStorage.removeItem("auth");
                  history.replace("/login");
                  }}>
                    Signout
                </Button>
              </div>              
            </Col>}
          </Row>
        </Header>
        <Content>
          <Switch>
            <PrivateRoute path="/recipe/:id">
              <RecipePage />
            </PrivateRoute>
            <PrivateRoute path="/recipe">
              <HomePage />
            </PrivateRoute>
            <PrivateRoute path="/add">
              <AddRecipePage />
            </PrivateRoute>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/signup">
              <SignupPage />
            </Route>
            <Route path="/">
              <Redirect to={{pathname: "/recipe"}} />
            </Route>
          </Switch>
        </Content>
        <Footer>Recipe Management System © 2020</Footer>
      </Layout>
    </div>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        sessionStorage.getItem("auth") !== null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default () => <Router><App /></Router>;
