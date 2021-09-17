import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useRef, useState, useContext } from "react";
import AuthContext from "./store/auth-context";
import styles from './SignIn.module.css';

const SignIn = (props) => {
  const [error, setError] = useState(null);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKfr13yjxTuQWfDzzZuB7tBbaeWx1UW5M",
      {
        method: "POST",
        body: JSON.stringify({
          email: emailInputRef.current.value,
          password: passwordInputRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
          return res.json()
      } else {
        return res.json().then((data) => {
          
          throw new Error(data.error.message);
        });
      }
    }).then(data => {
        console.log(data)
        authCtx.login(data.idToken);
        history.replace('/banners');
        
    }).catch(error => {
        const parsedError = String(error);
        setError(parsedError);
    });
  };

  return (
    <form onSubmit={submitHandler}>
      {error ? <p>{error}</p> : null}
      <h2 className={styles.title}>Sign in</h2>
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
      <Link to="/signup">Sign up ?</Link>
      </div>
      <div className={styles["button-container"]}>
      <button>Sign In</button>
      </div>
    </form>
  );
};

export default SignIn;
