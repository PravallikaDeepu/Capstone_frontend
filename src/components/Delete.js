import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Axios from 'axios'

function Delete() {
    const {bookNo} = useParams()
    const API_BASE_URL = process.env.REACT_APP_BACKEND_API_URL || "http://localhost:7070"
    const [confirmationMessage,setConfirmationMessage] = useState("")
    const navigate = useNavigate()
   useEffect(()=>{
   async function fetchData()
    {
        try{
            const output = await Axios.delete(`${API_BASE_URL}/book/${bookNo}`)
            setConfirmationMessage(output.data.message)
        }
        catch(e)
        {
            console.log(e)
        }
    }
    fetchData()
   },[])
  return (
    <div style={{marginLeft: "25px", marginTop: "50px"}}>
      <h2>{confirmationMessage}</h2>
      <button style={{marginTop: "25px"}} className='btn btn-outline-primary' onClick={(e)=> {navigate("/")}}>Back</button>
    </div>
  )
}

export default Delete