import React, { useEffect, useState } from 'react'
import Axios from "axios"
import Joi from 'joi';
import { useNavigate , Link } from 'react-router-dom';
export default function Login(props) {
    let Navigate = useNavigate();
    let [errormsg, setErrorMsg] = useState("")//api errors
    let [errorList, setErrorList] = useState([])//joi errors 
    let [user, setUser] = useState({
        email: "",
        password: ""
    });
    function getDataFromUser(e) {
        let copy = { ...user };
        copy[e.target.id] = e.target.value
        setUser(copy)
    }
    function submitUser(e) {
        e.preventDefault()
        let resValid = validation();
        if (resValid.error) {
            setErrorList(resValid.error.details)
        }
        else {
            setErrorList([])
            getUserInfoFromApi(user)
        }
    }
    function validation() {
        const schema = Joi.object({
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            email: Joi.string().email({
                minDomainSegments: 2, tlds: { allow: ["com", "net"] },
            }),
        })
        return schema.validate(user, { abortEarly: false });
    }
    function forgetPassword(){
        window.alert('ههه اعمل اكونت جديد')
    }
    async function getUserInfoFromApi(res) {
        let { data } = await Axios.post(`https://route-egypt-api.herokuapp.com/signin`, res)
        if (data.message === "success") {
            setErrorMsg('')
            localStorage.setItem("token", data.token)
            props.saveCurrentUser()
            Navigate("/home")
        }
        else {
            setErrorMsg(data.message)
        }
    }
    return (
        <div>
            <div className="container">
                <div className="row shadow-lg text-white-50 py-5">
                    <div className="col-lg-6 d-none d-lg-block">
                        <img src="images/gaming.jpg" className='w-100' alt="" />
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <h2 className='fs-1'>
                            Login Your Account
                        </h2>
                        <div className="col-sm-12 mt-2 py-2">
                                {errorList.map((errItem, index) => <span className='py-2 mx-1 alert alert-danger d-block' key={index}>{errItem.message}</span>)}
                            </div>
                        <form className='my-3' onSubmit={submitUser}>
                            <input type="email" className="form-control my-1 py-1" placeholder='Email' onChange={getDataFromUser} id="email" />
                            <input type="password" className="form-control my-1 py-1" placeholder='Password' onChange={getDataFromUser} id="password" />
                            <button className='btn btn-primary form-control my-1 py-1' type='Submit'>Login</button>
                        </form>
                        <div className="formBottom rounded-1"></div>
                        <div className="d-flex justify-content-center align-items-center flex-column py-2">
                        <a onClick={forgetPassword} class="cursor-pointer">Forgot Password?</a>
                        <p>Not a member yet? <Link className='text-decoration-none' to="/register">Create Account</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
