import styles from './Banner.module.css';
import { useHistory } from 'react-router';

const Banner = (props) => {

    const history = useHistory();

    const showDetailsHandler = (e) => {
            e.preventDefault();
            history.push(`/banners/${props.id}`)

    }

    return (
        <div className={styles.Banner}>
            <div className={styles['image-container']}>
                <img src={props.img} alt={props.description}></img>
            </div>
            <div className={styles['description-container']}>
                <p>{props.description}</p>
            </div>
            <div className={styles.actions}>
                <button onClick={showDetailsHandler}>Show Details</button>
            </div>
        </div>
    )
}

export default Banner;