import './App.css';
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import {createBrowserRouter,Navigate , RouterProvider} from "react-router-dom"
import Home from "./component/home/Home";
import AllTypes from './component/all types/AllTypes';
import Layout from './component/layout/Layout';
import Pc from './component/Platforms/pc/Pc';
import Browser from './component/Platforms/browser/Browser';
import Alphabetical from './component/Sort By/alphabetical/Alphabetical';
import Relevance from './component/Sort By/relevance/Relevance';
import Popularity from './component/Sort By/popularity/Popularity';
import Releasedate from './component/Sort By/release-date/Release-date';
import Racing from"./component/Categories/racing/Racing"
import Social from"./component/Categories/social/Social"
import Action from"./component/Categories/action/Action"
import Actionrpg from"./component/Categories/action rpg/Actionrpg"
import BattleRoyale from"./component/Categories/battle royale/BattleRoyale"
import Fantasy from"./component/Categories/fantasy/Fantasy"
import Flight from"./component/Categories/flight/Flight"
import OpenWorld from"./component/Categories/open world/OpenWorld"
import Shooter from"./component/Categories/shooter/Shooter"
import Sports from"./component/Categories/sports/Sports"
import Zombie from"./component/Categories/zombie/Zombie"
import GameDetails from './component/game details/GameDetails';
import Register from './component/Register/Register';
import Login from './component/login/Login';
import jwtDecode from 'jwt-decode';
import { useState , useEffect } from 'react';
import Notfound from './component/notfound/Notfound';
function App() {
  useEffect(()=>{
    if(localStorage.getItem("token") !== null)
    saveCurrentUser()
  },[])
  function logOut(){
    localStorage.removeItem("token")
    setUser(null)
  }
  function Protect(props){
    if(localStorage.getItem("token") === null)
    return <Navigate to="/login"/>
    else 
    return props.children
  }
  let[user,setUser]=useState(null)
  function saveCurrentUser(){
    let encoded = localStorage.getItem("token")
    let decoded = jwtDecode(encoded)
    setUser(decoded)
  }
  const routes = createBrowserRouter([{path:"/", element:<Layout data={user} logOut={logOut}/>,children:[
    {path:"/home",element:<Protect><Home/></Protect>},
    {index:true,element:<Login saveCurrentUser={saveCurrentUser}/>},
    {path:"/login",element:<Login saveCurrentUser={saveCurrentUser}/>},
    {path:"/register",element:<Register/>},
    {path:"/games/all",element:<Protect><AllTypes/></Protect>},
    {path:"/games/platforms/pc",element:<Protect><Pc/></Protect>},
    {path:"/games/platforms/browser",element:<Protect><Browser/></Protect>},
    {path:"/games/sortby/alphabetical",element:<Protect><Alphabetical/></Protect>},
    {path:"/games/sortby/relevance",element:<Protect><Relevance/></Protect>},
    {path:"/games/sortby/releasedate",element:<Protect><Releasedate/></Protect>},
    {path:"/games/sortby/popularity",element:<Protect><Popularity/></Protect>},
    {path:"/games/categories/racing",element:<Protect><Racing/></Protect>},
    {path:"/games/categories/sports",element:<Protect><Sports/></Protect>},
    {path:"/games/categories/social",element:<Protect><Social/></Protect>},
    {path:"/games/categories/shooter",element:<Protect><Shooter/></Protect>},
    {path:"/games/categories/openworld",element:<Protect><OpenWorld/></Protect>},
    {path:"/games/categories/zombie",element:<Protect><Zombie/></Protect>},
    {path:"/games/categories/fantasy",element:<Protect><Fantasy/></Protect>},
    {path:"/games/categories/actionrpg",element:<Protect><Actionrpg/></Protect>},
    {path:"/games/categories/action",element:<Protect><Action/></Protect>},
    {path:"/games/categories/flight",element:<Protect><Flight/></Protect>},
    {path:"/games/categories/battleroyale",element:<Protect><BattleRoyale/></Protect>},
    {path:"/gameDetails/:id",element:<Protect><GameDetails/></Protect>},
    {path:"*",element:<Notfound/>},
  ]}])
  return (<>
<RouterProvider router={routes} /> 
</>
  );
}

export default App;
