// authenticated method
export const isAuthenticated = () => {
  /*if (typeof window !== "undefined") {
      //return false;
      console.log('window not defined')
    }*/

  if (localStorage.getItem("Token")) {
    return JSON.parse(localStorage.getItem("Token"));
    //console.log('is auth');
    //console.log(data)
  } else {
    return false;
    //console.log('is not auth');
  }
};


// SignUp user to database
export const signIn = user => {
  return fetch("http://localhost:8000/signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .catch(error => console.log(error));
};

// SignUp user to database
export const signUp = user => {
  return fetch("http://localhost:8000/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .catch(error => console.log(error));
};

// Sign Out USER
export const signout = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("Token");
  }

  next();

  return fetch("http://localhost:8000/signout", {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .catch(error => console.error(error));
};


// authenticate user
export const authenticateUser = (token, next) => {
  if (typeof window !== "undefined") {
    // save token in localStorage
    localStorage.setItem("Token", JSON.stringify(token));

    next();
  }
};
