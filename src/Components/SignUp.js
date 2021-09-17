import { Link } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import styles from "./SignUp.module.css";

const SignUp = (props) => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    // add validation

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_WEB_API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            console.log(data);
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        history.replace("/banners");
      })
      .catch((error) => {
        const parsedError = String(error);
        setError(parsedError);
      });
  };

  return (
    <form onSubmit={submitHandler}>
      {error ? <p>{error}</p> : null}
      <h2 className={styles.title}>Sign up</h2>
      <div className={styles["emailInput-container"]}>
        <input
          ref={emailInputRef}
          type="email"
          placeholder="email"
          required
        ></input>
      </div>

      <div className={styles["passwordInput-container"]}>
        <input
          ref={passwordInputRef}
          type="password"
          placeholder="password"
          required
        ></input>
      </div>
      <div className={styles["a-tag"]}>
        <Link to="/signin">Sign in ?</Link>
      </div>

      <div className={styles["button-container"]}>
        <button>Sign up</button>
      </div>
    </form>
  );
};

export default SignUp;
