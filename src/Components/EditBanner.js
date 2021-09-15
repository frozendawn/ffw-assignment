import { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router";

const EditBanner = (props) => {

/*  const [foundBlog, setFoundBlog] = useState({}); */

 const [imgValue, setImgValue] = useState('');
 const [descriptionValue, setDescriptionValue] = useState('');


 const params = useParams();
 const history = useHistory();

 const imgRef = useRef();
 const descriptionRef = useRef();

  useEffect(() => {
      const fetchBlog = async () => {
          const response = await fetch(`https://ffw-assignment-default-rtdb.europe-west1.firebasedatabase.app/banners/${params.id}.json`);
          const data = await response.json();
          console.log(data)
/*           setFoundBlog(data); */
          setImgValue(data.img);
          setDescriptionValue(data.description);

      }

      fetchBlog();
  },[params,])

    const onSubmitHandler = (e) => {

        e.preventDefault()

        fetch(`https://ffw-assignment-default-rtdb.europe-west1.firebasedatabase.app/banners/${params.id}.json`,{
            method: "PUT",
            body: JSON.stringify({
                description: descriptionRef.current.value,
                img: imgRef.current.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        history.goBack();
    }

    const imgUrlChangeHandler = () => {
        setImgValue(imgRef.current.value)
    }
    const descriptionChangeHandler = () => {
        setDescriptionValue(descriptionRef.current.value)
    }




    return (
        <form onSubmit={onSubmitHandler}>
            <input type="text" placeholder="img url" ref={imgRef} value={imgValue} onChange={imgUrlChangeHandler}></input>
            <textarea ref={descriptionRef} value={descriptionValue} onChange={descriptionChangeHandler}></textarea>
            <button>Submit</button>
        </form>
    )
}

export default EditBanner;