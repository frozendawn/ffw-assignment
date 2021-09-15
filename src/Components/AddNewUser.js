import { useRef } from "react";
import { useHistory } from "react-router";
import styles from './AddNewUser.module.css';


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
    <form onSubmit={onSubmitHandler}>
      <div>
        <input type="text" placeholder="img url" ref={imgRef}></input>
      </div>

      <div>
        <textarea ref={descriptionRef}></textarea>
      </div>

      <button>Submit</button>
    </form>
  );
};

export default AddNewUser;
