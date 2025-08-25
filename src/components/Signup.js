import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Signup() {
  const [myuser, setMyuser] = useState("");
  const [myemail, setMyemail] = useState("");
  const [mypassword, setMypassword] = useState("");
  const [myConfirmpassword, setConfirmpassword] = useState("");
    const [address,setAdress] = useState("")
    const [pincode, setPincode] = useState("")
    const [phoneNo,setPhoneNo] = useState("")
    const [country,setCountry] = useState("")
    const [state,setState] = useState("")
  const navigate = useNavigate()
  const API_BASE_URL = process.env.REACT_APP_BACKEND_API_URL || "http://localhost:7070"
  
  function register(e) {
    e.preventDefault();
    // console.log("Submitted succesfully")
    if(mypassword === myConfirmpassword)
    {
  const data = {
      user: myuser,
      email: myemail,
      password: mypassword,
      confirmpassword: myConfirmpassword,
      address:address,
      pincode:pincode,
      phoneNo:phoneNo,
      country:country,
      state:state
    };
     Axios.post(`${API_BASE_URL}/signup`,data)
     
      .then((output) =>
      {
        if(output.data === "Username already Present")
        {
          alert("Username Already used😔")
          navigate("/signup")
        }
        else if(output.data === "Email already present")
          {
            alert("Email already present \n Please Log in to continue🧑🏾‍💻")
            navigate("/login")
          }
        else
        {
  alert("Registration successful⌨️! \nPlease log in to continue.🧑🏾‍💻")
        navigate("/login")
        }
      
      })
      .catch((e)=>
      {
        // console.log(e)
        alert(e)
      })

}
    else
    {
      alert("Confirm Password and Password should be SAME💝")
      setMypassword("")
      setConfirmpassword("")
    }

     

  }



  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form
       
        method="POST"
        className="border p-4 rounded"
        style={{ minWidth: 300, maxWidth: 400, width: '100%' }}
      >
        <h4 className="text-center mb-4">Register</h4>

        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            onChange={(e) => setMyemail(e.target.value)}
            value={myemail}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            onChange={(e) => setMyuser(e.target.value)}
            value={myuser}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="inputPassword6">Password</label>
          <input
            type="password"
            name="myPassword"
            id="inputPassword6"
            onChange={(e) => setMypassword(e.target.value)}
            value={mypassword}
            className="form-control"
            aria-describedby="passwordHelpInline"
            required
          />
          <div id="passwordHelpInline" className="form-text">
            Must be 8–20 characters long.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            onChange={(e) => setConfirmpassword(e.target.value)}
            value={myConfirmpassword}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Address:</label>
          <input type="text" placeholder="Street Address" value={address} onChange={(e)=>setAdress(e.target.value)} className="form-control" required />
        </div>

    

        <div className="mb-3">
          <label htmlFor="pincode">Pincode</label>
          <input type="number" id="pincode" placeholder="Enter Pincode" value={pincode} onChange={(e)=>setPincode(e.target.value)} className="form-control" required />
        </div>

        <div className='mb-3'>
            <label for="phone">Enter your phone number:</label>
<input type="tel" id="phone" name="phone" pattern="9[0-9]{9}" value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)} className='form-control'></input>
        </div>
        <div className="mb-3">
          <label htmlFor="country">Country</label>
          <select id="country" className="form-control" value={country} onChange={(e)=>setCountry(e.target.value)} required>
            <option value="">Select Country</option>
            <option value="India">India</option>
            {/* <option value="Others">Others</option> */}
            {/* <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Australia">Australia</option>
            <option value="Canada">Canada</option> */}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="state">State/Region</label>
          <select id="state" className="form-control" onChange={(e)=>setState(e.target.value)} required>
            <option value="">Select State</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Telangana">Telangana</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Kerala">Kerala</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>


        <div className="d-grid">
          <button type="submit" className="btn btn-primary" onClick={register}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
