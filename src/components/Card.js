import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import '../components/style.css';
import { Link, useNavigate } from 'react-router-dom';
import { SearchContext } from './SearchComponent.js';
import Categories from './Categories.js';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

function Card(props) {
  const [wishlist,setWishlist] = useState({})
  const [myOutput, setMyOutput] = useState([]);
  const { searchData } = useContext(SearchContext);
  const username = props.isLoggedIn ? localStorage.getItem("username")?.toLowerCase() : ""
  const navigate = useNavigate()
  const API_BASE_URL = process.env.REACT_APP_BACKEND_API_URL || "http://localhost:7070"


  useEffect(() => {
    const fetchData = async () => {
      try {
        const output = await Axios.get(`${API_BASE_URL}/display/books`);
        setMyOutput(output.data);
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
    const stored = JSON.parse(localStorage.getItem(`${username}_wishlist`)) || {};
    setWishlist(stored);
  }, []);

  function handleView(e)
  {
    console.log(e)
    navigate(`/view/book/${e.bookNo}`)
  }
  function handleProduct(e) {
    const username = localStorage.getItem("username")
    if (!props.isLoggedIn || !username) {
      alert("Please Login/Signup before adding to cart")
      navigate("/login")
    }
    else {
      // console.log(username, "your username")
      const cartTitle = e.title;
      const myId = e._id;
      const unitPrice = parseFloat(e.price) || 0;
      const cartKey = `${username}_cart`
      let cart = localStorage.getItem(cartKey)
        ? JSON.parse(localStorage.getItem(cartKey))
        : {};

      if (!cart[myId]) {
        cart[myId] = [1, cartTitle, unitPrice];
      } else {
        cart[myId][0] += 1;
      }

      localStorage.setItem(`${username}_cart`, JSON.stringify(cart));
      displayCart();
    }
  }

    const handleWishlist = (bookNo, bookData) => {
      const username = localStorage.getItem("username");
  if (!username) {
    alert("Please login to use the wishlist feature.");
    navigate("/login");
    return;
  }

  const wishlistKey = `${username}_wishlist`;
  const stored = JSON.parse(localStorage.getItem(wishlistKey)) || {};
    const updatedWishlist = { ...wishlist };

    if (updatedWishlist[bookNo]) {
      delete updatedWishlist[bookNo]; // Remove from wishlist
    } else {
      updatedWishlist[bookNo] = bookData; // Add to wishlist
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };
  function saveWish(e)
  {
    console.log(e,"clicked")
    alert("Please Signup/Login before saving to Wishlist")
    navigate("/login");
  }

  function displayCart() {
    const username = localStorage.getItem("username")
    if (!username) return;

    const cartKey = `${username}_cart`;
    const myCart = JSON.parse(localStorage.getItem(cartKey)) || {};
    let cartData = "";
    let totalCartPrice = 0;
    for (let i in myCart) {
      const [qty, name, unitPrice] = myCart[i];
      const totalPrice = qty * unitPrice;
      totalCartPrice += totalPrice;
      cartData += `QTY: ${qty}<br/>NAME: ${name}<br/>PRICE: ₹${totalPrice}<hr/>`;
      localStorage.setItem(`${username}_total`, totalCartPrice);
    }

    cartData += "<a href='productData.html' class='btn btn-success'>Continue</a>";

    const popoverElement = document.getElementById("mypopover");
    if (!popoverElement)
      return;

    const existingPopover = window.bootstrap.Popover.getInstance(popoverElement);
    if (existingPopover) {
      existingPopover.dispose();
    }

    popoverElement.setAttribute("data-bs-content", cartData);
    new window.bootstrap.Popover(popoverElement, {
      html: true,
      trigger: "click",
      placement: "bottom",
    });
  }
  const filteredCategoryData = props.category === "All" || props.category === ""
    ? myOutput
    : myOutput.filter(book => book.category.toLowerCase() === props.category.toLowerCase());

  const filteredData = filteredCategoryData.filter((val) =>
    val.title.toLowerCase().includes(searchData.toLowerCase()) ||
    val.author.toLowerCase().includes(searchData.toLowerCase())
  );

  const resultData = searchData.trim() === "" ? filteredCategoryData : filteredData;

// function handleWishlist(bookNo, bookData) {
//   const stored = JSON.parse(localStorage.getItem("wishlist")) || {};

//   const updatedWishlist = {
//     ...stored,
//     [bookNo]: stored[bookNo] ? null : bookData
//   };

//   for (let key in updatedWishlist) {
//     if (updatedWishlist[key] === null) {
//       delete updatedWishlist[key];
//     }
//   }

//   localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

//   setWishlist(updatedWishlist);
// }
function viewMore(e)
{
  console.log(e, "View more")
  if(props.isLoggedIn)
  {
    navigate(`/view/book/${e.bookNo}`)
    
  }
  else
  {
    alert("Plaese login before View more")
    navigate("/login")
  }
  
}
  return (
    <>
      <Categories setCategory={props.setCategory} category={props.category} />
      <div className="card-container d-flex flex-wrap justify-content-start">
        {resultData.length === 0 ? (
          <p>No books data...</p>
        ) : (
          resultData.map((value, index) => {
            const isWishlisted = wishlist.hasOwnProperty(value.bookNo);
return (
            <div className="book-card card m-3" style={{ width: "18rem" }} key={index}>
              <img
                src={value.image || "https://via.placeholder.com/150"}
                className="card-img-top image"
                alt={`${value.title} book written by ${value.author}`} onClick={()=>handleView(value)}
              />
              <div className="card-body">
                <h5 className="card-title" >{value.title}</h5>
                <p className="card-text" >by <strong style={{ color: "#347433" }}>{value.author}</strong></p>
                <h6  style={{ fontSize: "20px", color: "orange" }}><strong><del>&#8377;{value.originalPrice}</del></strong></h6>
                <h6 className="price" style={{ fontSize: "25px" }}><strong>&#8377;{value.price}</strong></h6>
              </div>
              <div className="card-body d-flex justify-content-between">
                {username === "admin" ? (
                  <>
                  <div>
                    <Link to={`/edit/book/${value.bookNo}`} className="btn btn-warning" style={{width: "120px", marginRight: "10px"}}>Edit</Link>
                    <Link to={`/book/${value.bookNo}`} className="btn btn-danger" style={{width: "120px"}}>Delete</Link>
                  </div>
                  </>
                ) : (
                  <div>
                    <div>
                    {/* <Link to={`/view/book/${value.bookNo}`} className='btn btn-outline-success' id='view'>View More</Link> */}
                    <button className='btn btn-outline-success' id='view' onClick={()=>{viewMore(value)}}>View More</button>
                    </div>
                    <button className='btn btn-outline-primary' onClick={() => handleProduct(value)} style={{marginRight: "10px"}} >Add to cart</button>
                  {props.isLoggedIn ? (
  <button
    className="btn btn-outline-primary"
    onClick={() => handleWishlist(value.bookNo, value)}
  >
    {isWishlisted ? <FaHeart style={{ color: "red" }} /> : <FaRegHeart style={{ color: "red" }} />}
  </button>
) : (
  <button className="btn btn-outline-warning" onClick={saveWish}>
    Save Wishlist
  </button>
)}
                  
          </div>
        )}
      </div>
    </div>
    
  );
  
})
        )
}
</div>
</>
  )
}


export default Card;
