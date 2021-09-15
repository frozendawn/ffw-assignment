import styles from './Navigation.module.css';
import { NavLink } from "react-router-dom";

const Navigation = (props) => {
    return (
        <nav className={styles['nav-bar']}>
            <ul>
                <NavLink exact to="/banners">Banners</NavLink>
                <NavLink exact to="/new-banner">Add banner</NavLink>
            </ul>
        </nav>
    )
}

export default Navigation;