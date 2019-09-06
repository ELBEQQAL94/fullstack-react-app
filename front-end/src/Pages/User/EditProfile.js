import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { update, read, updateUser } from '../profile/apiUser';

// Auth user
import { isAuthenticated } from '../../Components/Auth';

import Input from '../../Components/Input';
import Button from '../../Components/Button';
import Label from '../../Components/Label';
import H2 from '../../Components/Label';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';


class EditProfile extends Component {

    state = {
        error: "",
        success: "",
        redirect: false,
        loading: false,
        firstname: "",
        lastname: "",
        password: "",
        id: "",
        email: "",
        photo: "",
        fileSize: 0,
        about: ""
    };

    fetchUser = (userId) => {

        const token = isAuthenticated().token;
    
        read(userId, token)
          .then(res => res.json())
          .then(user => {
            this.setState({
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              id: user._id,
              about: user.about
            });
          })
          .catch(error => {
            this.setState({ redirect: true });
          });
      };

    componentDidMount() {
        this.userData = new FormData();
        const userId = this.props.match.params.userId;
        this.fetchUser(userId);
    };

    updateField = (e) => {
      this.setState({ error: "" });
      const value = e.target.name === "photo" ? e.target.files[0] : e.target.value;
      const fileSize = e.target.name === "photo" ? e.target.files[0].size : 0;
      this.userData.set(e.target.name, value);
      this.setState({[e.target.name] : value, fileSize });
    };

    isValid = () => {

      const { fileSize, firstname, lastname, email, password } = this.state;

      if(fileSize > 10000000) {
          this.setState({
            error: {
              show: true,
              Error: "File size should be less than 100kb"
            }
          });
          return false;
      };

      if (firstname.length === 0) {
        this.setState({ 
          error: {
            show: true,
            Error: "firstname is required"
          }, 
        loading: false 
      });
        return false;
      }

      if (lastname.length === 0) {
        this.setState({ 
          error: {
            show: true,
            Error: "lastname is required"
          }, 
          loading: false 
      });
        return false;
      }
      // email@domain.com
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        this.setState({
          error: {
            show: true,
            Error: "A valid Email is required"
          },
          loading: false
        });
        return false;
      }
      if (password.length >= 1 && password.length <= 5) {
        this.setState({
          error: {
            show: true,
            Error: "Password must be at least 6 characters long"
          },
          loading: false
        });
        return false;
      }
      return true;
    };

    // submit resgister of user
  submitField = e => {

    e.preventDefault();

    const userId = this.props.match.params.userId;

    const token = isAuthenticated().token;

    if(this.isValid()){
      update(userId, token, this.userData)
      .then(res => res.json())
      .then(data => {
      
        if (data.Error) {
          this.setState({ 
            loading: false,
            error: {
              show: true,
              Error: data.Error
          }});
        } else {

          updateUser(data, () => {
            this.setState({
              redirect: true,
              success: data.message,
              loading: true
            });
          })
          
        }
      });
    }
    
    
  };

    // render signup form
  renderEditForm = (loading, error, success, firstname, lastname, email, password, about) => (

    <div className="container">

      <H2 title="Edit Profile" />

      <ErrorMessage error={error} />

      <SuccessMessage success={success} />

      <form onSubmit={this.submitField}>

        <div className="form-group">
        <Label name="photo-profile" title="Photo Profile" />
        <Input
            type="file"
            id="photo-profile"
            name="photo"
            change={this.updateField}
          />
        </div>

        <div className="form-group">

          <Label name="first-name" title="First Name" />

          <Input
            type="text"
            id="first-name"
            value={firstname}
            placeholder="Enter your first name"
            name="firstname"
            change={this.updateField}
          />

        </div>

        <div className="form-group">

          <Label name="last-name" title="Last Name" />

          <Input
            type="text"
            id="last-name"
            value={lastname}
            placeholder="Enter your last name"
            name="lastname"
            change={this.updateField}
          />

        </div>

        <div className="form-group">

          <Label title="Email" name="email" />

          <Input
            type="email"
            id="email"
            value={email}
            placeholder="Enter your email"
            name="email"
            change={this.updateField}
          />

        </div>

        <div className="form-group">

          <Label title="Password" name="password" />

          <Input
            type="password"
            id="password"
            value={password}
            placeholder="Enter your password"
            name="password"
            change={this.updateField}
          />

        </div>

        <div className="form-group">

          <Label title="About" name="about" />

          <Input
            type="textarea"
            id="about"
            value={about}
            placeholder="Type something about yourself"
            name="about"
            change={this.updateField}
          />

        </div>

        <Button title={loading ? "Loading..." : "UPDATE"}
          disabled={loading ? true : false} />

      </form>

    </div>

  );

    render() {

        const { loading, error, about, success, redirect, id, firstname, lastname, email, password } = this.state;

        const photoUrl = id ? `http://localhost:8000/users/photo/${id}?${new Date().getTime()}` : 'images/user.png';

        if(redirect) return <Redirect to={`/user/${id}`} />

        return (
          <>
          
          <img style={{width: 'auto'}} className="img-thumbnail" src={photoUrl} alt={firstname} />

          {this.renderEditForm(loading, error, success, firstname, lastname, email, password, about)};
          </>
          
        )
    };

};

export default EditProfile;
