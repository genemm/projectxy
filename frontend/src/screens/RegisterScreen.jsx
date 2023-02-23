import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { MDBCheckbox } from "mdb-react-ui-kit";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

export default function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match");
    } else {
      dispatch(register(name, email, password));
      alert("User was registered successfully! Please check your email");
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign Up</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            placeholder="username"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="pass-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            required
            type={passwordShown ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <i onClick={togglePasswordVisiblity}>{eye}</i>
        </div>

        <div className="pass-wrapper">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="confirm password"
            required
            type={passwordShown ? "text" : "password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
          <i onClick={togglePasswordVisiblity}>{eye}</i>
        </div>

        <div>
          <MDBCheckbox
            name="flexCheck"
            value=""
            id="flexCheckChecked"
            label=" Subscribe to our newsletter"
          />
        </div>

        <div>
          <label />
          <button className="primary" type="submit">
            Sign Up
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account? <Link to={`/signin`}>Sign In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
