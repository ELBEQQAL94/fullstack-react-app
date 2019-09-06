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
import Users from "./Pages/User/Users";
import EditProfile from './Pages/User/EditProfile';
import CreatePost from './Pages/Post/CreatePost';


// Auth to private routers
import PrivateRoute from './Components/Auth/PrivateRoute';


const MainRouter = () => (
  <Router>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <PrivateRoute exact path="/user/:userId" component={Profile} />
      <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
      <PrivateRoute exact path="/post/create-post" component={CreatePost} />
    </Switch>
  </Router>
);

export default MainRouter;
