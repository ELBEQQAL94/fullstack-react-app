import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";

// Delete User
import DeleteUser from '../User/DeleteUser';

// follow and unfollow user
import FollowProfileButton from '../User/FollowProfileButton';

// Components
import H2 from "../../Components/H2";

// Auth User
import { isAuthenticated } from "../../Components/Auth";

class Profile extends Component {
  
  state = {
    loading: false,
    user: {
      following: [],
      followers: []
    },
    redirect: false,
    following: false
  };

  // check follow
  checkFollow = (user) => {
    const auth = isAuthenticated();
    const match = user.followers.find(follower  => {
      return follower._id === auth.user._id
    });

    return match;
  };

  // follow method
  clickFollowButton = callApi => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    callApi(userId, token, this.state.user._id)
    .then(res => res.json())
    .then(data => {

      if(data.error){

        this.setState({
          error: {show: true, Error: data.error}
        });

      } else {

        this.setState({
          user: data, 
          following: !this.state.following
        });

      };

    })
    .catch(error => console.log(error));

  };



  fetchUser = (userId) => {

    const token = isAuthenticated().token;

    read(userId, token)
      .then(res => res.json())
      .then(user => {

        let following = this.checkFollow(user);

        this.setState({
          following,
          user,
          loading: true
        });
      })
      .catch(error => {
        this.setState({ redirect: true });
      });
  };


  // change user id
  componentDidUpdate(prevProps) {

    const userId = this.props.match.params.userId;

    if(userId !== prevProps.match.params.userId) {
      this.fetchUser(userId)
    }

  }
  
  componentDidMount() {
    const userId = this.props.match.params.userId;

    this.fetchUser(userId);
  }


  render() {

    const { redirect, user, loading, following } = this.state;

    const photoUrl = user._id ? `http://localhost:8000/users/photo/${user._id}?${new Date().getTime()}` : 'images/user.png';


    if (redirect) return <Redirect to="/signin" />;

    return (
      <div className="container">
        <H2 title="Profile" />

        {!loading && <p>Loading...</p>}

        {loading && (
          <div className="row">
            <div className="col-md-6">
              <img
                className="card-img-top"
                src={photoUrl}
                alt="Card image cap"
                onError={i => (i.target.src = '../user.png')}

              />
              <div className="lead mt-5 ml-5">
                <p>First Name: {user.firstname}</p>
                <p>Last Name : {user.firstname}</p>
                <p>Email: {user.email}</p>
                <p>About: {user.about}</p>
                <p>Joined {new Date(user.createdAt).toDateString()}</p>
              </div>
            </div>

            {isAuthenticated().user && 
            isAuthenticated().user._id === user._id ? (
              <div className="col-md-6">
                <div className="d-inline-block mt-5">
                  <Link
                    className="btn btn-raised btn-success mr-5"
                    to={`/user/edit/${user._id}`}
                  >
                    Edit Profile
                  </Link>

                </div>

                <div className="d-inline-block mt-5">
                    <DeleteUser userId={user._id} />
                </div>
              </div>
            ) : (<FollowProfileButton following={following} clickFollowButton={this.clickFollowButton}/>)}
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
