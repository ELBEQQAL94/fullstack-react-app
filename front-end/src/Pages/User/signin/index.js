import React, { useState } from "react";
import { Redirect } from "react-router-dom";

// Components
import SuccessMessage from "../SuccessMessage";
import ErrorMessage from "../ErrorMessage";
import Input from "../../../Components/Input";
import Button from "../../../Components/Button";
import H2 from "../../../Components/H2";
import Label from "../../../Components/Label";

// Auth User
import { signIn, authenticateUser } from "../../../Components/Auth";

const SignIn = () => {
  // Data field object
  const [dataField, setDataField] = useState({
    email: "",
    password: ""
  });

  // error object
  const [error, setError] = useState("");

  // Success message
  const [success, setSuccess] = useState("");

  // redirect
  const [redirect, setRedirect] = useState(false);

  // loading
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    const { email, password } = dataField;

    const user = {
      email,
      password
    };

    signIn(user).then(data => {
      if (data.error) {
        setError({
          show: true,
          Error: data.error
        });

        setLoading(false);
      } else {
        setSuccess(data.message);

        // authenticate
        authenticateUser(data, () => {
          setRedirect(true);
        });
      }
    });
  };

  const { email, password } = dataField;

  // render signup form
  const renderSigninForm = () => (
    <div className="container">
      <H2 title="Signin" />

      <ErrorMessage error={error} />

      <SuccessMessage success={success} />

      <form onSubmit={submitField}>
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

        <Button
          title={loading ? "Loading..." : "SUBMIT"}
          disabled={loading ? true : false}
        />
      </form>
    </div>
  );

  if (redirect) return <Redirect to="/" />;

  return renderSigninForm();
};

export default SignIn;
