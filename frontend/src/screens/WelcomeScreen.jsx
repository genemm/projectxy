import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { verifyUser } from "../actions/userActions";

const Welcome = () => {
  const dispatch = useDispatch();
  const { confirmationCode } = useParams();

  useEffect(() => {
    dispatch(verifyUser(confirmationCode));
  });

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Account confirmed!</strong>
        </h3>
      </header>
      <Link to={"/signin"} className="nav-link">
        Please Login
      </Link>
    </div>
  );
};

export default Welcome;
