import React, { useState } from "react";
import { Link } from "@reach/router";
import { GLOBALLY_SIGNED_USERS } from "./SignUp";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(ev) {
    ev.preventDefault();
    const user = GLOBALLY_SIGNED_USERS.find(
      (user) => user.email === email && user.password === password
    );
    if (user) onLogin(user);
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
        <input className="action-button" type="submit" value="Login" />
      </form>
      <div>
        Don't have an accout?
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}
