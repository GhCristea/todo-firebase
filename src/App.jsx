/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Router, Link } from "@reach/router";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/SignUp";
import Header from "./Header";

let GLOBAL_USER = {
  displayName: "No Display Name",
  email: "",
  password: "",
};

const GLOBAL_NOTES = [];

function App() {
  function handleLogout() {
    GLOBAL_USER.email = "";
    GLOBAL_USER.password = "";
  }

  function handleLogin(user) {
    GLOBAL_USER.email = user;
  }
  return (
    <div>
      <Header handleLogout={handleLogout} />
      <Router>
        <Main path="/" />
        <Auth path="auth" />
        <Signup path="signup" />
        <Login path="login" onLogin={handleLogin} />
        <Profile path="activity" />
      </Router>
    </div>
  );
}

function Main() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  function handleCreate(ev) {
    ev.preventDefault();
    GLOBAL_NOTES.push({ title, content });
    console.log("notes changed: ", GLOBAL_NOTES);
    if (!notes.length) setNotes([{ title, content }]);
    else setNotes([...notes, { title, content }]);
  }

  return (
    <div className="wrapper">
      <div className="box sidebar">
        <UserNotes notes={notes} />
      </div>
      <div className="box content">
        <form className="create-todo-form" onSubmit={handleCreate}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <label htmlFor="content">Summary:</label>
          <textarea
            type="text"
            id="content"
            name="content"
            rows="10"
            onChange={({ target }) => setContent(target.value)}
            value={content}
          />
          <input className="action-button" type="submit" value="Create Note" />
        </form>
      </div>
      <div className="box footer">Footer</div>
    </div>
  );
}

function Auth() {
  const [user, setUser] = useState(GLOBAL_USER);
  useEffect(() => {
    console.log("user has changed", user);
  }, [user]);

  return user.email ? <Profile user={user} /> : <Login onLogin={setUser} />;
}

function Profile({ user }) {
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}

function UserNotes({ notes }) {
  return notes.length ? (
    <ul>
      {notes.map((note) => (
        <li key={note.title}>
          <h5>{note.title}</h5>
          <p>{note.content}</p>
        </li>
      ))}
    </ul>
  ) : (
    <div>Nothing to do</div>
  );
}

export default App;
