// read user information
export const read = (userId, token) => {

    return fetch(`http://localhost:8000/users/${userId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
    
};


// get all users
export const listOfUsers = () => {
  return fetch(`http://localhost:8000/users`, {
        method: "GET"
      });
};


// delete user
// read user information
export const remove = (userId, token) => {
  return fetch(`http://localhost:8000/users/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
  
};


// Edit user
export const update = (userId, token, user) => {

  return fetch(`http://localhost:8000/users/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        //"Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: user
    })
    
};

// update user on localStorage

export const updateUser = (user, next) => {
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('Token')){
      let auth = JSON.parse(localStorage.getItem('Token'));
      auth.user = user;
      localStorage.setItem('Token', JSON.stringify(auth));
      next();
    }
  }
};


// follow user

export const follow = (userId, token, followId) => {

  return fetch(`http://localhost:8000/users/follow`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({userId,followId})
    })
};


// unfollow user

export const unfollow = (userId, token, unfollowId) => {

  return fetch(`http://localhost:8000/users/unfollow`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({userId,unfollowId})
    })
};