import React from 'react'
import Tick from './images/Tick.gif'
import { Link } from 'react-router-dom'
import './style.css'

function Complete() {
  return (
          <div className='d-flex align-items-center justify-content-center complete'>
              <div className='border p-4 shadow rounded w-25' style={{backgroundColor:"White", marginTop:"20px"}}>
        
              <img src={Tick} alt='tick mark' style={{marginLeft: "100px"}}/>
              <h5>Order Placed Successfully☺️</h5>
              <p style={{fontSize: "15px", fontWeight: "400",  color: "#44444E"}}>Thanks for shopping, Visit again</p>
              <p style={{fontSize: "18px", fontWeight: "300", color: "#44444E"}}>We'll email you, an order confirmation with details</p>
              <Link to='/' className='btn btn-primary w-100'>Exit</Link>
      </div>

    </div>
  )
}

export default Complete