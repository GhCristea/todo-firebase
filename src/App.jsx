/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/SignUp";
import ResetPassword from "./pages/auth/ResetPassword";
import Header from "./Header";
import { useAuth } from "./firebase/auth";
import { getUserDocument, updateUserNotes } from "./firebase/firestore";

const GLOBAL_NOTES = [{ title: "Welcome", content: "Hello world!" }];

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/reset-password">
          <ResetPassword />
        </Route>
      </Switch>
      <footer className="box footer">Footer</footer>
    </Router>
  );
}

function Main() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const { user } = useAuth();

  function handleCreate(ev) {
    ev.preventDefault();
    if (!notes.length) setNotes([{ title, content }]);
    else setNotes([{ title, content }, ...notes]);
  }

  useEffect(() => {
    user.uid
      ? getUserDocument(user.uid).then((user) => {
          setNotes(user.notes);
        })
      : setNotes([]);
  }, [user]);

  useEffect(() => {
    updateUserNotes(user, notes);
  }, [notes]);

  return (
    <div className="wrapper">
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
      <div className="box sidebar">
        <UserNotes notes={notes} />
      </div>
    </div>
  );
}

function Auth() {
  const { user } = useAuth();
  return user?.email ? <Profile user={user} /> : <Login />;
}

function Profile({ user }) {
  return <pre>{user && JSON.stringify(user, null, 2)}</pre>;
}

function UserNotes({ notes }) {
  if (notes?.length) return <ul>{notes.map(CreateNote)}</ul>;
  else return <div>Nothing to do</div>;
}

function CreateNote(note) {
  return (
    <li key={note.title}>
      <h5>{note.title}</h5>
      <p>{note.content}</p>
    </li>
  );
}

// export async function createUserProfileDocument(user, additionalData) {
//   if (!user) return null; //auth.signOut() gives user=null
//   const userRef = firestore.doc(`users/${user.uid}`);
//   const snapshot = await userRef.get();

//   //if no profile exists for this user, create one
//   if (!snapshot.exists) {
//     const createdAt = new Date().toDateString();
//     const { displayName, email, photoURL } = user;
//     try {
//       await userRef.set({
//         displayName,
//         email,
//         photoURL,
//         createdAt,
//         ...additionalData,
//       });
//     } catch (e) {
//       console.error("Error creating user", e.message);
//     }
//   }
//   return getUserDocument(user.uid);
// }

// export async function getUserDocument(uid) {
//   if (!uid) return null;
//   try {
//     const documentData = firestore.doc(`users/${uid}`).get();
//     return { uid, ...documentData };
//   } catch (e) {
//     console.error("Error get user document", e.message);
//   }
// }

export default App;
