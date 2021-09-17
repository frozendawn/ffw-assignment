import { Switch, Route, Redirect } from "react-router-dom";
import Navigation from "./Components/UI/Navigation";
import AddNewBanner from "./Components/AddNewBanner";
import Banners from "./Components/Banners";
import styles from "./App.module.css";
import BannerDetail from "./Components/BannerDetail";
import EditBanner from "./Components/EditBanner";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { useContext } from "react";
import AuthContext from "./Components/store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      <Navigation />

      <Switch>
        <Route path="/" exact>
          <Redirect to="/banners" />
        </Route>

        {authCtx.isLoggedIn && (
          <Route path="/banners" exact>
            <Banners />
          </Route>
        )}

        {authCtx.isLoggedIn && <Route path="/new-banner" exact>
          <AddNewBanner />
        </Route>}

        {authCtx.isLoggedIn && <Route path="/banners/:id/edit" exact>
          <EditBanner />
        </Route>}

        

        {authCtx.isLoggedIn && <Route path="/banners/:id">
          <BannerDetail />
        </Route>}

        {!authCtx.isLoggedIn && <Route path="/signup">
          <SignUp />
        </Route>}

        <Route path="/signin">
          <SignIn />
        </Route>

        <Route path="*">
          <Redirect to="/signup"/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
