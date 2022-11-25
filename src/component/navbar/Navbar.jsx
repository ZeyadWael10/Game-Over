import React from 'react'
import { Link, NavLink } from "react-router-dom"
export default function Navbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg py-2">
        <div className="container">
          <Link className="navbar-brand text-white" to=""><img src="images/logo.png" width="70" height="40" className="d-inline-block align-text-center" alt="" /><span>Game Over</span></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {props.data? <><ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-white active" aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/games/all">All</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link text-white dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Platforms
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/games/platforms/pc">Pc</Link></li>
                  <li><Link className="dropdown-item" to="/games/platforms/browser">Browser</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link text-white dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Sort-by
                </Link>
                <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/games/sortby/releasedate">release-date</Link></li>
                <li><Link className="dropdown-item" to="/games/sortby/popularity">popularity</Link></li>   
                <li><Link className="dropdown-item" to="/games/sortby/alphabetical">alphabetical</Link></li>
                <li><Link className="dropdown-item" to="/games/sortby/relevance">relevance</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link text-white dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
                </Link>
                <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/games/categories/racing">racing</Link></li>
                  <li><Link className="dropdown-item" to="/games/categories/sports">sports</Link></li>
                  <li><Link className="dropdown-item" to="/games/categories/social">social</Link></li>
                  <li><Link className="dropdown-item" to="/games/categories/shooter">shooter</Link></li>
                  <li><Link className="dropdown-item" to="/games/categories/openworld">open-world</Link></li>
                  <li><Link className="dropdown-item" to="/games/categories/zombie">zombie</Link></li>
                  <li><Link className="dropdown-item" to="/games/categories/fantasy">fantasy</Link></li>
                  <li><Link className="dropdown-item" to="/games/categories/actionrpg">action-rpg</Link></li>
                  <li><Link className="dropdown-item" to="/games/categories/action">action</Link></li>
                  <li><Link className="dropdown-item" to="/games/categories/flight">flight</Link></li>
                  <li><Link className="dropdown-item" to="/games/categories/battleroyale">battle-royale</Link></li>
                </ul>
              </li>
            </ul>
            <Link onClick={props.logOut} className="btn btn-outline-primary my-auto cursor-pointer" to="">Logout</Link></>:<div className="buttons ms-auto">
            <Link className="btn btn-outline-primary mx-2 my-auto cursor-pointer" to="/register">Register</Link>
            <Link className="btn btn-outline-primary my-auto cursor-pointer" to="">Login</Link>
            </div>}
            
          </div>
        </div>
      </nav>
    </div>
  )
}
