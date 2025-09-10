import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useParams,Link } from 'react-router-dom'
import './style.css'
import Navbar from './Navbar.js'
import Back from './Back.js'
import Rating from './Rating.js'

function View() {
  const [myData, setmyData] = React.useState("")
const [showFullDescription, setShowFullDescription] = useState(false);
  const {bookNo} = useParams()
  useEffect(() => {
    // console.log("Book No in URL is:", bookNo)
    const fetchData = async () => {
      await Axios.get(`http://localhost:7070/display/books/${bookNo}`)
        .then((output) => {
          console.log("Sucess",output.data)
          setmyData(output.data)
        })
        .catch((err) => {
          // console.log(err)
          alert(err)
        })
    }
    fetchData()
  }, [bookNo])

  return (
    
    <div className='view'>
      <div className='container'>

<div className="card view-card p-4">
  <div className="row">
    <div className="col-md-4 text-center">
      <img src={myData.image} alt={myData.title || "Book"} className="img-fluid image1" />
    </div>
    <div className="col-md-5 mt-5">
      <h2 className="card-title">{myData.title}</h2> 
      <h5 className='fs-6 tcolor'>by {myData.author}<span> (Author)</span></h5> 
      <h4 className="price">&#8377;{myData.discountedPrice}</h4>
      <span className='fsize'>MRP:</span> <del className='tcolor fsize'>{myData.originalPrice}</del>
      <p style={{marginBottom: "1px", marginTop: "15px"}}><strong>Description:</strong></p>
      <p className="card-text para">
     
  {showFullDescription ? myData.description : `${myData.description?.slice(0, 180)}...`}
  {myData.description && myData.description.length > 180 && (
    <span
      onClick={() => setShowFullDescription(!showFullDescription)}
      style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
    >
      {showFullDescription ? "Read Less" : "Read More"}
    </span>
)}
</p>
    </div>
    <div className="col-md-3">
      
      <Link to='/save/wishlist' className="btn btn-primary mb-2 w-100 ">View Wishlist</Link>
      <Link to='/' className="btn btn-outline-secondary w-100">Back</Link>
    </div>
  </div>
</div>
    </div>
  
    </div>
  )
}

export default View