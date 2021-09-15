import {Switch, Route,Redirect} from 'react-router-dom';
import Navigation from './Components/UI/Navigation';
import AddNewUser from './Components/AddNewUser';
import Banners from './Components/Banners';
import styles from './App.module.css';
import BannerDetail from './Components/BannerDetail';
import EditBanner from './Components/EditBanner';


function App() {
  return (
    <div >
    <Navigation/>

<Switch>
  <Route path="/" exact><Redirect to="/banners"/></Route>

  <Route path="/banners" exact> <Banners/> </Route>

  <Route path="/new-banner" exact>
    <AddNewUser/>
  </Route>

  <Route path="/banners/:id/edit" exact>
    <EditBanner/>
  </Route>

  <Route path="/banners/:id" >
    <BannerDetail/>
  </Route>
</Switch>

    </div>
  );
}

export default App;
