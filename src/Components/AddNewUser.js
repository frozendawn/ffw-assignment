import { useRef } from "react";
import { useHistory } from "react-router";


const AddNewUser = (props) => {

    const history = useHistory();

    const imgRef = useRef();
    const descriptionRef = useRef();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        fetch('https://ffw-assignment-default-rtdb.europe-west1.firebasedatabase.app/banners.json', {
            method: 'POST',
            body: JSON.stringify({
                img: imgRef.current.value,
                description: descriptionRef.current.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        history.replace('/banners');
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <input type="text" placeholder="img url" ref={imgRef}></input>
            <textarea ref={descriptionRef}></textarea>
            <button>Submit</button>
        </form>
    )

}

export default AddNewUser;