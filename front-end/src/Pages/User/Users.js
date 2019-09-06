import React, { Component } from "react";
import { Link } from 'react-router-dom';


// api USER
import { listOfUsers } from "../profile/apiUser";

// Components
import H2 from "../../Components/H2";

class Users extends Component {
  state = {
    users: []
  };

  fetchUsers = () => {
    listOfUsers()
      .then(res => res.json())
      .then(users => {
        this.setState({ users, loading: false });
      })
      .catch(error => {
        this.setState({ redirect: true });
      });
  };

  componentDidMount() {
    this.fetchUsers();
  }

  renderUsers = users => (

      <div className="row">
          {
              users ? 
                users.length > 0 ?
                    users.map((user, i) => (
                        <div key={i} className="card col-md-4" 
                             style={{ width: '18rem' }}
                        >
                              <img 
                              className="card-img-top" 
                              src={`http://localhost:8000/users/photo/${user._id}`} 
                              alt="Card image cap"
                              onError={i => (i.target.src = 'user.png')}
                              />
                              <div className="card-body">
                              <h5 className="card-title">
                                {user.firstname}
                                 {' '}
                                {user.lastname}
                               </h5>
                              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                              <Link className="btn btn-primary" to={`/user/${user._id}`}>
                                  view profile
                                </Link>
                              </div>
                        </div>
                    ))
                    : <p>Loading...</p>
                : <p>User Not Found!</p>
          }
      </div>
  );


  render() {

    const { users } = this.state;

    return (
      <div className="container">
        <H2 title="Users" />

        {this.renderUsers(users)}

      </div>
    );
  }
}

export default Users;
