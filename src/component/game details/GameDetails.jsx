import React, { useEffect, useState } from 'react'
import axios from "axios";
import {useParams} from "react-router-dom"
export default function GameDetails() {
    let {id} = useParams()
    let [gameDetailsArr, setGameDetailsArr] = useState({})
    let [gamerequirementDetailsArr, setGameRequirementDetailsArr] = useState([])
    let [gameScreenshotsArr, setGameScreenshotsArr] = useState([])
 async function getGameDetails(id) {
        const options = {
            method: 'GET',
            url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
            params: {id:id},
            headers: {
                'X-RapidAPI-Key': '5a811903e1mshf4b8aedaaf3d8bcp15b22djsne65b2aa0b7b4',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        axios.request(options).then(function (response) {
            setGameDetailsArr(response.data)
            setGameRequirementDetailsArr(response.data.minimum_system_requirements)
            setGameScreenshotsArr(response.data.screenshots)
        }).catch(function (error) {
            console.error(error);
        });
    }
    useEffect(() => {
        getGameDetails(id)
    }, {})
    return (
        <div className="container">
            <div className="row text-muted">
                <div className="col-xl-4 col-lg-12">
                    <img src={gameDetailsArr.thumbnail} alt="" />
                    <div className="buttons my-2">
                        <span className='btn btn-dark me-3'>Free</span>
                        <a className="btn btn-primary" href={gameDetailsArr.game_url}>Play Now</a>
                    </div>
                </div>
                <div className="col-xl-8 col-lg-12">
                    <h2>{gameDetailsArr.title}</h2>
                    <h4>About {gameDetailsArr.title}</h4>
                    <p>{gameDetailsArr.description}</p>
                    <h4>Minimum System Requirments</h4>
                    <ul className='list-unstyled'>
                    <li>Graphics: {gamerequirementDetailsArr.graphics}</li>
                    <li>Memory: {gamerequirementDetailsArr.memory}</li>
                    <li>Operating System: {gamerequirementDetailsArr.os}</li>
                    <li>Processor: {gamerequirementDetailsArr.processor}</li>
                    <li>Storage: {gamerequirementDetailsArr.storage}</li>
                </ul>
                    <h4>{gameDetailsArr.title} Screenshots</h4>
                        <div className="row">
                            {gameScreenshotsArr.map((image,index)=><div className="col-lg-4">
                                <img key={index} src={image.image} className="w-100" alt="..."/>
                            </div>)}
                        </div>
                    <h4>Additional Information</h4>
                    <div className="row">
                        <div className="col-md-4">
                            <h6>Title</h6>
                            <p>{gameDetailsArr.title}</p>
                        </div>
                        <div className="col-md-4">
                            <h6 className='text-muted'>Developer</h6>
                            <p>{gameDetailsArr.developer}</p>

                        </div>
                        <div className="col-md-4">
                            <h6 className='text-muted'>Publisher</h6>
                            <p>{gameDetailsArr.publisher}</p>
                        </div>
                        <div className="col-md-4">
                            <h6 className='text-muted'>Release Date</h6>
                            <p>{gameDetailsArr.release_date}</p>
                        </div>
                        <div className="col-md-4">
                            <h6 className='text-muted'>Genre</h6>
                            <p>{gameDetailsArr.genre}</p>
                        </div>
                        <div className="col-md-4">
                            <h6 className='text-muted'>Platform</h6>
                            <p>{gameDetailsArr.platform}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
