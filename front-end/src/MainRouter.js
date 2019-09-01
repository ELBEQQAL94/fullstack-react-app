import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Menu from './Components/Menu';


// pages

// Public pages
import Home from "./Pages/Home";
import SignUp from "./Pages/User/signup";
import SignIn from "./Pages/User/signin";

// Private pages
import Profile from "./Pages/profile";


const MainRouter = () => (
  <Router>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/user/:userId" component={Profile} />
    </Switch>
  </Router>
);

export default MainRouter;
