import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

function Profile() {
     const API_BASE_URL = process.env.REACT_APP_BACKEND_API_URL || "http://localhost:7070"
  const userName = localStorage.getItem("username")
  const [userData,setUserData] = useState({})
    useEffect(()=>{
       async function fetchData()
        {
          try{
          const response = await Axios.get(`${API_BASE_URL}/profile/${userName}`)
          setUserData(response.data.readData)
          }
          catch(e)
          {
            console.log(e)
          }
        }
        fetchData()
    },[userName])

  return (
 <div className="container mt-5 d-flex justify-content-center">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: '500px', width: '100%', borderRadius: '20px', backgroundColor: '#f9f9f9' }}
      >
        <h2 className="text-center mb-4" style={{ color: "#5D5FEF" }}>
          Hello, {userName || "User"} 🥰
        </h2>
        <hr />
        <div className="mb-3">
          <strong>Email:</strong>
          <p>{userData.email}</p>
        </div>
        <div className="mb-3">
          <strong>Address:</strong>
          <p>{userData.address}</p>
        </div>
        <div className="mb-3">
          <strong>Phone:</strong>
          <p>{userData.phoneNo}</p>
        </div>
        <div className="mb-3">
          <strong>Country:</strong>
          <p>{userData.country}</p>
        </div>
        <div className="mb-3">
          <strong>State:</strong>
          <p>{userData.state}</p>
        </div>
        <Link to='/' className="btn btn-success">Back</Link>
      </div>
    </div>
  );
}


export default Profile