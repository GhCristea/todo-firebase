import React from "react";
import { _sendPasswordResetEmail } from "../../firebase/auth";

const { useState } = React;

export default function ResetPassword() {
  const [state, setState] = useState("");

  function submitForm() {
    _sendPasswordResetEmail(state);
  }

  function clearForm(ev) {
    ev.preventDefault();
    setState("");
  }

  return (
    <React.Fragment>
      <h5>Reset Password</h5>
      <form className="auth-form" onSubmit={clearForm}>
        <input
          type="email"
          value={state}
          onChange={({ target }) => setState(target.value)}
        />
        <input type="submit" onClick={submitForm} />
      </form>
    </React.Fragment>
  );
}
