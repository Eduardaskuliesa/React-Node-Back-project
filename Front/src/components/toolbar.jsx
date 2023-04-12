import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Toolbar() {
  const user = useSelector((store) => store.data.value.myUser);

  return (
    <div className="d-flex space-btw toolbar">
      <div className="d-flex">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/conversations">Conversations</Link>
      </div>

      <div>
        {user?.username}
      </div>

    </div>
  );
}

export default Toolbar;
