import React, {useState,useEffect}  from 'react'
import style from "./home.module.css"
import { useNavigate,Link } from 'react-router-dom';
import axios from "axios";
export default function Home() {
  let [popularityArr, setPopularityArr] = useState([])
  async function getPopularGames() {
const options = {
method: 'GET',
url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
params: {'sort-by': 'popularity'},
headers: {
  'X-RapidAPI-Key': '5a811903e1mshf4b8aedaaf3d8bcp15b22djsne65b2aa0b7b4',
  'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
}
};

axios.request(options).then(function (response) {
  setPopularityArr(response.data)
}).catch(function (error) {
console.error(error);
});
}
useEffect(() => {
  getPopularGames()
}, [])
  let Navigate = useNavigate();
  function browseGames(){
    Navigate("/games/all")
  }
  return (
    <div>
      <div className={`${style.bg} row text-center text-white-50 py-5`}>
        <div className="col-sm-12">
          <h1 className='mt-5'>Find & track the best <span className='text-primary'>free-to-play</span> games!</h1>
          <p className='text-muted'>Track what you've played and search for what to play next! Plus get free premium loot!</p>
          <button className='btn btn-primary' onClick={browseGames}>Browse Games</button>
        </div>
      </div>
      <div className="container">
      <div className="row my-2">
        <div className="col-sm-12 d-flex my-2">
          <h3 className='text-white'><i className='fas fa-robot'></i> Personalized Recommendations</h3>
        </div>

        {popularityArr.slice(0,3).map((item,index)=><div key={index} className={`${style.hover} col-sm-12 col-md-6 col-lg-4`}>
      <Link className='text-decoration-none' to={"/gameDetails/"+item.id}>
        <div className={`card ${style.cardHover}`}>
          <img src={item.thumbnail} className="card-img-top rounded-1" alt="..."/>
            <div className="card-body">
              <div className="card-title text-white-50 d-flex align-items-center justify-content-between">
              <h2 className='fs-5'>{item.title}</h2>
              <p className='badge text-bg-primary my-2'>Free</p>
              </div>
            </div>
        </div>
        </Link>
      </div>)}
        </div>
      </div>  
      </div>
  )
}
