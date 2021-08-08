/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import React from "react";
import { useAuth } from "./firebase/auth";

export default function Header() {
  const { signout } = useAuth();

  return (
    <header>
      <nav className="box header">
        <ul>
          <li>
            <Link to="/">New Note</Link>
          </li>
          <li>
            <Link to="/done-notes">Done</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/auth">My Activity</Link>
          </li>
          <li></li>
          <Link to="/auth">
            <button className="action-button">Login</button>
          </Link>
          <li>
            <Link to="/">
              <button className="action-button" onClick={signout}>
                Logout
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
