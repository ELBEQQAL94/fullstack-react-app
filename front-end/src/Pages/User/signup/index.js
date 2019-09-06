import React, { useState } from "react";
import { Link } from 'react-router-dom';

// Components
import SuccessMessage from "../SuccessMessage";
import ErrorMessage from "../ErrorMessage";
import Input from "../../../Components/Input";
import Button from "../../../Components/Button";
import H2 from "../../../Components/H2";
import Label from "../../../Components/Label";

// Auth user
import { signUp } from "../../../Components/Auth";

const SignUp = () => {
  // Data field object
  const [dataField, setDataField] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });

  // error object
  const [error, setError] = useState("");

  // Success message
  const [success, setSuccess] = useState("");

  // Update field
  const updateField = e => {
    setDataField({
      ...dataField,
      [`${e.target.name}`]: e.target.value
    });

    setError({ show: false });
  };

  // submit resgister of user
  const submitField = e => {
    e.preventDefault();

    const { firstname, lastname, email, password } = dataField;

    const user = {
      firstname,
      lastname,
      email,
      password
    };

    signUp(user).then(data => {
      if (data.Error) {
        setError({
          show: true,
          Error: data.Error
        });
      } else {
        setDataField({
          firstname: "",
          lastname: "",
          email: "",
          password: ""
        });

        setSuccess(data.message);
      }
    });
  };

  const { firstname, lastname, email, password } = dataField;

  // render signup form
  const renderSignupForm = () => (
    <div className="container">
      <H2 title="Signup" />

      <ErrorMessage error={error} />

      <SuccessMessage success={success} />

      <div 
          className="alert alert-info text-success"
          style={{display: success ? "": "none"}}
        >
         <Link to="/signin">
           Sign In
         </Link>
      </div>

      <form onSubmit={submitField}>
        <div className="form-group">
          <Label name="first-name" title="First Name" />

          <Input
            type="text"
            id="first-name"
            value={firstname}
            placeholder="Enter your first name"
            name="firstname"
            change={updateField}
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
            change={updateField}
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
            change={updateField}
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
            change={updateField}
          />
        </div>

        <Button title="SUBMIT" />
      </form>
    </div>
  );

  return renderSignupForm();
};

export default SignUp;
