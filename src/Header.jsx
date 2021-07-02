import { Link } from "@reach/router";
import React from "react";

export default function Header({ handleLogout }) {
  return (
    <div className="box header">
      <ul>
        <li>
          <a href="#">New Note</a>
        </li>
        <li>
          <a href="#">Done</a>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/activity">My Activity</Link>
        </li>
        <li>
          <Link to="/auth" className="action-button">
            Login
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="action-button">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
