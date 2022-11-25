import React,{useState,useEffect} from 'react'
import axios from "axios";
import {Link} from "react-router-dom"
import style from "./action.module.css"
export default function Action() {
  let [actionArr, setActionArr] = useState([])
    async function getActionGames() {
const options = {
  method: 'GET',
  url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
  params: {category: 'action'},
  headers: {
    'X-RapidAPI-Key': '5a811903e1mshf4b8aedaaf3d8bcp15b22djsne65b2aa0b7b4',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	setActionArr(response.data);
}).catch(function (error) {
	console.error(error);
});
}
    useEffect(() => {
      getActionGames()
    }, [])
    return (
      <div className='container'>
      <div className="row gy-2">
        {actionArr.map((item,index)=><div key={index} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
        <Link className='text-decoration-none' to={"/gameDetails/"+item.id}>
        <div className={`card ${style.cardHover}`}>
            <img src={item.thumbnail} className="card-img-top rounded-1" alt="..."/>
              <div className="card-body">
                <div className="card-title text-white-50 d-flex align-items-center justify-content-between">
                <h2 className='fs-5'>{item.title}</h2>
                <p className='badge text-bg-primary my-2'>Free</p>
                </div>
                <p className='text-muted text-start'>{item.short_description.split(" ").splice(0,3).join(" ")}...</p>
                <div className="icons d-flex align-items-center justify-content-between">
                  <i className='fas fa-plus-square'></i>
                  <div className="right-icons pt-2">
                    <p className='badge text-bg-secondary me-2'>{item.genre}</p>
                    <i className='fab fa-windows text-muted stretched-link'></i>
                  </div>
                </div>
              </div>
          </div>
          </Link>
        </div>)}
      </div>
    </div>
    )
}
