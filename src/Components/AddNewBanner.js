import React, { useRef } from "react";
import { useHistory } from "react-router";
import styles from "./AddNewBanner.module.css";

const AddNewUser = (props) => {
  const history = useHistory();

  const imgRef = useRef();
  const descriptionRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    fetch(
      "https://ffw-assignment-default-rtdb.europe-west1.firebasedatabase.app/banners.json",
      {
        method: "POST",
        body: JSON.stringify({
          img: imgRef.current.value,
          description: descriptionRef.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).finally(() => {
      history.replace("/banners");
    });
  };

  return (
    
      <section >
        <h2 className={styles.title}>Add new banner</h2>
      <form onSubmit={onSubmitHandler}>
        
      <div className={styles["input-container"]}>
        <div className={styles["img-container"]}>
          <input type="text" placeholder="Please provide valid img url" required ref={imgRef}></input>
        </div>

        <div className={styles["text-container"]}>
          <textarea placeholder="Description" required ref={descriptionRef}></textarea>
        </div>
      </div>
      <div className={styles["button-container"]}>
        <button>Submit</button>
      </div>
    </form>
    </section>
    
    
  );
};

export default AddNewUser;
