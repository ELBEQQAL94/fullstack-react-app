import React, { useState, useEffect } from 'react';


// Components
import H2 from '../../Components/H2';


// Auth User
import { isAuthenticated } from '../../Components/Auth';

const Profile = (props) => {

    const [user, setUser] = useState({});


    const [redirect, setRedirect] = useState(false);

    useEffect(() => {

        const userId = props.match.params.userId;

        
    });

    return (
        <div className="container">
            <H2 title="Profile" />
            <p>Hello {isAuthenticated().user.firstname}</p>
        </div>
    )
};

export default Profile;