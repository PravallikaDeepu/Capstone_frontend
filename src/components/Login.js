import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'

function Login(props) {
    const [myEmail,setMyEmail] = useState("")
    const [myPassword,setMyPassword] = useState("")
    const [showPassword,setshowPassword] = useState(false)
    const API_BASE_URL = process.env.REACT_APP_BACKEND_API_URL || "http://localhost:7070"
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)

   async function handleLogin(e)
    {
      setLoading(true)
        e.preventDefault()
        const data= {
            email: myEmail,
            password: myPassword
        }
    
  try{
    const output = await Axios.post(`${API_BASE_URL}/login`, data)
    console.log(output)
    setLoading(false)
    if(output.data.message === "Incorrect Password")
    {
        alert("Please type Correct Password")
        navigate("/login")
        setMyPassword("")
    }
    else if(output.data.message == "Email not present in database")
    {
        alert("Email not present in database, Please signup😁")
        navigate("/signup")
    }
    else
    {
        navigate("/")
       props.initial(true)
       localStorage.setItem("username", output.data.user)
    }
  }
   catch(e)
   {
    setLoading(false)
    alert(e)
  }
}
  return (
    <>
        {loading ? (
         <div className="d-flex justify-content-center align-items-center vh-100">
  <div className="spinner-border text-success" role="status" style={{ width: "5rem", height: "5rem" }}>
    <span className="visually-hidden">Logging in...</span>
  </div>
</div>

        ) :(
         <div class="container d-flex justify-content-center align-items-center vh-100">
    <form method="POST" class="border p-4 rounded shadow" style={{minWidth: "300px", maxWidth: "400px", width: "100%;"}}>
      <h4 class="text-center mb-4">Login</h4>

      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input type="email" id="email" onChange={(e)=>{setMyEmail(e.target.value)}} value={myEmail} class="form-control" placeholder="Enter Email" required/>
      </div>

      <div class="mb-3" style={{position:"relative"}}>
        <label for="password" class="form-label">Password:</label>
        <input type={showPassword? "text" :"password"} id="password" onChange={(e)=>{setMyPassword(e.target.value)}}  value={myPassword} name="myPassword" class="form-control" placeholder="Enter Password" style={{ paddingRight: "40px" }} required/> <span
                onClick={() => setshowPassword(!showPassword)}  style={{
      position: "absolute",
      right: "12px",
      top: "58%",
      transform: "translateY(-10%)", 
      cursor: "pointer",
      userSelect: "none"
    }} className='show-password'>
                {showPassword ? "👁️" : "🙈"}
              </span>
      </div>

      <button type="submit" class="btn btn-success w-100" onClick={handleLogin}>Login</button>
      <Link to='/signup' className="btn btn-warning w-100" style={{ marginTop: "15px", color: "whitesmoke"}}>Signup Here!</Link>
    </form>

    
  </div>
        )}
    </>
  )
}

export default Login