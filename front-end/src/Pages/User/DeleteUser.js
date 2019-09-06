import React, { useState } from "react";
import { Redirect } from "react-router-dom";

// Auth User
import { isAuthenticated } from "../../Components/Auth";

// remove method
import { remove } from "../profile/apiUser";

// signout user
import { signout } from "../../Components/Auth";

const DeleteUser = props => {

  const [redirect, setRedirect] = useState(false);

  // delete account
  const deleteAccount = () => {
    const token = isAuthenticated().token;

    const userId = props.userId;

    remove(userId, token)
      .then(() => {
        // signout user
        signout(() => console.log("User is deleted !"));

        setRedirect({ redirect: true });
      })
      .catch(error => console.log(error));
  };

  // confirmaton of delete user
  const deleteConfirmed = () => {
    let answer = window.confirm(
      "Are you sure you want to delete your account ?"
    );

    if (answer) {
      deleteAccount();
    }
  };

  if (redirect) return <Redirect to="/" />;

  return (
    <div>
      <button onClick={deleteConfirmed} className="btn btn-raised btn-danger">
        Delete Profile
      </button>
    </div>
  );
};

export default DeleteUser;
