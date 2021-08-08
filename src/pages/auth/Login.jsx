/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin } = useAuth();

  function handleLogin(ev) {
    ev.preventDefault();
    signin(email, password);
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleLogin}>
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
        <input type="submit" className="action-button" value="Login" />
      </form>
      <div>
        <em>
          Don't have an accout?
          <Link to="auth/signup">Signup</Link>
        </em>
        <em>
          Forgot Password?
          <Link to="auth/reset-password">Reset Password</Link>
        </em>
      </div>
    </div>
  );
}
