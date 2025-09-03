import React, { useContext, useEffect } from 'react'
import './style.css'
import SearchComponent, { SearchContext } from './SearchComponent'
import { FaShoppingCart } from 'react-icons/fa'
import './style.css'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import location from './images/location.png'

function Navbar(props) {
  const { setSearchData } = useContext(SearchContext)
  const API_BASE_URL = process.env.REACT_APP_BACKEND_API_URL || "http://localhost:7070"

  // console.log(props,"Navbar")
  const userName = localStorage.getItem("username")
  const city = localStorage.getItem("City")
  const country = localStorage.getItem("Country")
  const pincode = localStorage.getItem("Pincode")
  function handleSearch(e) {
    setSearchData(e.target.value)
  }

  useEffect(() => {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    popoverTriggerList.map(function (popoverTriggerEl) {
      return new window.bootstrap.Popover(popoverTriggerEl)
    })
  }, [])
useEffect(() => {
  const storedUser = localStorage.getItem("username");
  if (storedUser) {
    props.setIsLoggedIn(true);   
  }
}, []);

  // async function handleLogout(e) {
  //   localStorage.getItem("cart")
  //   await Axios.get(`${API_BASE_URL}/logout`)
  //     .then(function (res) {
  //       alert(res.data.message)

  //     })
  //     .catch(function (err) {
  //       alert(err)
  //     })
  async function handleLogout(e) {
  try {
    await Axios.get(`${API_BASE_URL}/logout`);
    localStorage.removeItem("username");   
    localStorage.removeItem("cart");     
    props.setIsLoggedIn(false);
    alert("Logged out successfully!");
  } catch (err) {
    alert("Logout failed: " + err.message);
  }


    props.setIsLoggedIn(false)

  }
  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="nav" style={{ height: '80px' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to='/'>Prana's Bookstore</Link>

 {/* <div className="d-flex flex-column align-items-start">
  {props.isLoggedIn && (
    <>
      <div className='p-2' style={{marginLeft: "25px"}}>
        <img src={location} alt='location' style={{marginLeft: "-25px", marginRight: "15px", height: "25px", marginTop:"15px"}}/>
        <span style={{ color: "#ccc", fontSize: "13px" }}>
          Delivering to <strong>{userName}</strong> 
        </span>
        <br />
        <small className="text-light" style={{ fontSize: "10px", marginTop: "-105px" }}>
          {city}, {country} - {pincode}
        </small>
      </div>
    </>
  )}
</div> */}
<div>
  {props.isLoggedIn && 
    (
      <div style={{display:"grid", gridTemplateColumns: "0.5fr 2fr", color: "white", marginLeft: "25px"}}>
        <div>
          <img src={location} style={{height:  "20px", marginTop:"18px"}}/>
        </div>
        <div>
          <p style={{marginTop: "12px", fontSize: "10px", color:"#A8BBA3"}}><strong>Delivering to {userName}</strong></p>
          <p style={{marginTop: "-20px", fontSize:"13px"}}>{city}, {pincode}</p>
        </div>
      </div>
    )
  }
</div>
       
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
          {/* Centered Search Bar */}
          <form className="d-flex mx-auto" style={{ width: "400px"}}>
            <input className="form-control me-2" style={{borderRadius: "5px", height: "50px" }} type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} />
            <button className="btn btn-warning" style={{borderRadius: "5px", height: "50px", width:"150px" }} type="submit">Search🔍</button>
          </form>
          {props.isLoggedIn && userName === "Admin" && (
            <div className="d-flex align-items-center ms-auto gap-6" style={{marginRight: "-150px"}}>
              <Link to='/add/product' className='btn btn-info' style={{marginLeft: "-75px"}}>Add Product</Link>
            </div>
          )}


          <div className="d-flex align-items-center ms-auto gap-5">
            {!props.isLoggedIn ?
              <Link to='/login' className='btn btn-light'>SignUp/login</Link>
              :
              <div className="btn-group">
                <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "White" }}>
                  Hello {userName}🤗
                </button>
                <ul className="dropdown-menu">
                  <Link className="dropdown-item" to='/my/profile'>My Profile</Link>
                  {/* <Link className="dropdown-item" to="/my/orders">My Orders</Link> */}
                  <Link className="dropdown-item" to="/save/wishlist">My Wishlist</Link>
                  <Link><hr className="dropdown-divider"/></Link>
                  <Link className="dropdown-item" onClick={handleLogout}>Logout</Link>
                </ul>
              </div>
            }
            {props.isLoggedIn && userName !== "Admin" && (
              <button id="mypopover" className="btn btn-info" type="button" data-bs-toggle="popover" data-bs-html="true" data-bs-trigger="click" data-bs-placement="bottom" data-bs-content="Cart is empty">
              <FaShoppingCart /> Cart
            </button>
            )}
          </div>
        </div>
      </div>
    </nav>

  )
}

export default Navbar
