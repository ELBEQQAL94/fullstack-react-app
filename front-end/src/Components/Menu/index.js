import React from "react";
import { Link, withRouter } from "react-router-dom";


// Auth User
import { signout, isAuthenticated } from "../../Components/Auth";

// add active class
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "red" };
  }
};

const Menu = ({ history }) => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link className="navbar-brand" to="/">
        SIDE
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className="nav-link" style={isActive(history, "/")} to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>

          {!isAuthenticated() && (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/signin")}
                  to="/signin"
                >
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/signup")}
                  to="/signup"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
          {isAuthenticated() && (
            <>
              <li className="nav-item">
                <a
                  href="#"
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    signout(() => {
                      history.push("/");
                    })
                  }
                >
                  Sign Out
                </a>
              </li>

              <li className="nav-item">
                <Link 
                  className="nav-link" 
                  to={`/user/${isAuthenticated().user._id}`}>
                  {`${isAuthenticated().user.firstname}'s profile`}
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  </div>
);

export default withRouter(Menu);
