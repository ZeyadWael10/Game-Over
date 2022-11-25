import React, { useState } from 'react'
import Axios from "axios"
import Joi from 'joi';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  let Navigate = useNavigate();
  let [errormsg, setErrorMsg] = useState("")//api errors
  let [errorList, setErrorList] = useState([])//joi errors 
  let [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: "",
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
      first_name: Joi.string().alphanum().min(3).max(30).required(),
      last_name: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      email: Joi.string().email({
        minDomainSegments: 2, tlds: { allow: ["com", "net"] },
      }),
      age: Joi.number().min(16).max(60).required(),
    })
    return schema.validate(user, { abortEarly: false });
  }
  async function getUserInfoFromApi(res) {
    let { data } = await Axios.post(`https://route-egypt-api.herokuapp.com/signup`, res)
    if (data.message === "success") {
      setErrorMsg('')
      Navigate("/login")
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
              Create Account
            </h2>
            <form className='my-3' onSubmit={submitUser}>
              <div className="row">
                <div className="col-sm-12 py-2 mb-2">
                  {errormsg ? <span className='py-2 mb-5 alert alert-danger'>{errormsg}</span> : ""}
                </div>
                <div className="col-sm-12">
                  {errorList.map((errItem, index) => <span className='py-2 mx-1 alert alert-danger d-block' key={index}>{errItem.message}</span>)}
                </div>
                <div className="col-sm-6">
                  <input type="text" className="form-control rounded-2 my-1" placeholder='First Name' onChange={getDataFromUser} id='first_name' />
                </div>
                <div className="col-sm-6">
                  <input type="text" className="form-control rounded-2 my-1" placeholder='Last Name' onChange={getDataFromUser} id='last_name' />
                </div>
              </div>
              <input type="email" className="form-control my-2" placeholder='Email' onChange={getDataFromUser} id='email' />
              <input type="text" className="form-control my-2" placeholder='Age' onChange={getDataFromUser} id='age' />
              <input type="password" className="form-control my-2" placeholder='Password' onChange={getDataFromUser} id='password' />
              <button className='btn btn-primary form-control' type='Submit'>Sign Up</button>
            </form>
            <div className="formBottom rounded-1"></div>
            <div className="d-flex justify-content-center align-items-center flex-column py-2">
              <p>Already Member? <Link className='text-decoration-none' to="/login">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
