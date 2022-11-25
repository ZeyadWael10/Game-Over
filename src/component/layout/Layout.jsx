import React from 'react'
import Navbar from '../navbar/Navbar'
import {Outlet} from "react-router-dom"
export default function Layout(props) {
  return (<>
  <Navbar  logOut={props.logOut} data={props.data}/>
  <Outlet></Outlet>
  </>
    
    )
}
