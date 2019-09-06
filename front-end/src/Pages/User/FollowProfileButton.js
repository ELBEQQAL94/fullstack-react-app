import React from "react";

import { follow, unfollow } from '../profile/apiUser';

const FollowProfileButton = ({ following, clickFollowButton }) => (
  <div className="d-inline-block">
    {following ? (
      <button onClick={() => clickFollowButton(unfollow)} className="btn btn-danger btn-raised">UnFollow User</button>
    ) : (
      <button onClick={() => clickFollowButton(follow)} className="btn btn-success btn-raised mr-5">Follow User</button>
    )}
  </div>
);

export default FollowProfileButton;
