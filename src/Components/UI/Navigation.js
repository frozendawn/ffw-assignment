import { useContext } from 'react';
import AuthContext from '../store/auth-context';
import styles from './Navigation.module.css';
import { NavLink } from "react-router-dom";

const Navigation = (props) => {

    const authCtx = useContext(AuthContext);
    

    return (
        <nav className={styles['nav-bar']}>
            <ul>
               {!authCtx.isLoggedIn && <NavLink exact to="/signin">Sign in</NavLink>}
                {authCtx.isLoggedIn && <button className={styles.Logout} onClick={authCtx.logout}>Sign out</button>}
                <NavLink exact to="/banners">Banners</NavLink>
                <NavLink exact to="/new-banner">Add banner</NavLink>
            </ul>
        </nav>
    )
}

export default Navigation;