/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();

  function handleSignup(ev) {
    ev.preventDefault();
    signup(email, password);
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSignup}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={({ target }) => setEmail(target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <input className="action-button" type="submit" value="Register" />
      </form>
      <div>
        Already have an accout?
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
