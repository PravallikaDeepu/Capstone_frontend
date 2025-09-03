import React from 'react'
import {Link} from 'react-router-dom'

function Payment() {
  function handleClick(e)
  {
    console.log(e)
  }
  return (
    <div>
        <h3  style={{marginLeft:"15px"}}>Secure CheckOut</h3>
        <div className='container d-flex' style={{marginTop: "25px"}}>
            <form className='border p-4 rounded shadow' required>
                <h6>Pay with Card</h6>
                <br/>
                <label for="w-100">Email:</label>
                <input type='email' className='form-control'></input>
            <p>Payment Method</p>
            <p>Card Details</p>
               {/* <div className='d-flex flex-row mb-3 align-items-center' >
                 <input type='number' className='form-control is-invalid' placeholder='1234 1234 1234' value='1234 1234 1234'/>
                
                <img src='https://1000logos.net/wp-content/uploads/2021/11/VISA-logo.png' width="25px"/>
                <img src='https://download.logo.wine/logo/Mastercard/Mastercard-Logo.wine.png' width="25px"/>
                <img src='https://1000logos.net/wp-content/uploads/2016/10/American-Express-Color.png' width="25px"/>
   
          <div className='row'>
              <div className='col'>
              <input type='number' placeholder='MM/YY'/>
              </div>
              <div className='col'>
            <input type='number' placeholder='CVC'/>
              </div>
          </div>
               </div> */}
<div className="d-flex flex-row mb-3 align-items-center">
  <input 
    type="number" 
    className="form-control is-invalid" 
    placeholder="1234 1234 1234" 
    value="1234 1234 1234"
    style={{ maxWidth: "350px" }}   
  />

  <div className="d-flex flex-row ml-2">
    <img src="https://1000logos.net/wp-content/uploads/2021/11/VISA-logo.png" width="40" className="ml-2"/>
    <img src="https://download.logo.wine/logo/Mastercard/Mastercard-Logo.wine.png" width="40" className="ml-2"/>
    <img src="https://1000logos.net/wp-content/uploads/2016/10/American-Express-Color.png" width="40" className="ml-2"/>
  </div>
</div>

<div className="row">
  <div className="col">
    <input type="number" className="form-control" placeholder="MM/YY"/>
  </div>
  <div className="col">
    <input type="number" className="form-control" placeholder="CVC"/>
  </div>
</div>
<p>Cardholder name</p>
<input type='text' placeholder='Full name on Card' className='form-control'/>
<p>Country/Region</p>
<select class="form-select form-select-sm" aria-label="Small select example">
  <option selected>India</option>
<option> Afghanistan</option>
<option> Albania</option>
<option> Algeria</option>
<option> Andorra</option>
<option> Angola</option>
<option> Antigua and Barbuda</option>
<option> Argentina</option>
<option> Armenia</option>
<option> Australia</option>
<option> Austria</option>
<option> Austrian Empire</option>
<option> Azerbaijan</option>
<option> Pakistan</option>
<option> Palau</option>
<option> Panama</option>
<option> Papal States</option>
<option> Papua New Guinea</option>
<option> Paraguay</option>
<option> Peru</option>
<option> Philippines</option>
<option> Piedmont-Sardinia</option>
<option> Poland</option>
<option> Portugal</option>
</select>
<div style={{marginTop: "25px"}}>
  
                  <input type="radio" name="payment" value="COD" class="mr-2" style={{marginRight: "15px"}}/>
                  <span style={{fontSize: "15px"}}>Cash on Delivery</span>
</div>
<Link className='btn btn-primary w-100' to='/pay' style={{marginTop: "35px"}}>Pay</Link>
            </form>
        </div>
    </div>
  )
}

export default Payment