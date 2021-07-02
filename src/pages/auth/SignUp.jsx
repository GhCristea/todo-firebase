import React, { useState } from "react";
import { Link } from "@reach/router";

export const GLOBALLY_SIGNED_USERS = [];

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup(ev) {
    ev.preventDefault();
    const user = { displayName: "New User", email, password };
    GLOBALLY_SIGNED_USERS.push(user);
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
