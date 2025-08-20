import React, { useEffect, useState } from 'react';
import {FaShoppingCart} from 'react-icons/fa'
import { useNavigate, Link } from 'react-router-dom';

function SaveWishlist() {
  const [wish, setWish] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const username = localStorage.getItem("username")?.toLowerCase();
    const save = JSON.parse(localStorage.getItem("wishlist")) || {};
    console.log(save, "SAVE WISHLIST");
    setWish(Object.values(save));
  }, []);

  function handleProduct(e) {
    const username = localStorage.getItem("username")
    
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

  const handleView = (book) => {
    console.log("Book clicked:", book);
  };

function handleRemove(book) {
  const username = localStorage.getItem("username")?.toLowerCase();
  if (!username) return;

  const wishlistKey = "wishlist";
  const savedWishlist = JSON.parse(localStorage.getItem(wishlistKey)) || {};

  
  delete savedWishlist[book.bookNo];
  localStorage.setItem(wishlistKey, JSON.stringify(savedWishlist));
  setWish(Object.values(savedWishlist));
  navigate("/")
}

  return (
    <>
    <div className="d-flex flex-wrap justify-content-start">
      {console.log(wish)}
      {wish.length === 0 ? (
        <p>No wishlist items found.</p>
      ) : (
        wish.map((val, index) => (
          <div className="book-card card m-3" style={{ width: "18rem" }} key={index}>
            <img
              src={val.image || "https://via.placeholder.com/150"}
              className="card-img-top image"
              alt={`${val.title} book written by ${val.author}`}
              onClick={() => handleView(val)}
              style={{ cursor: "pointer" }}
            />
            <div className="card-body">
              <h5 className="card-title">{val.title}</h5>
              <p className="card-text">
                by <strong style={{ color: "#347433" }}>{val.author}</strong>
              </p>
              <h6 className="price" style={{fontSize: "25px"}}>
                <strong>&#8377;{val.price}</strong>
              </h6>
            <button className='btn btn-outline-danger' style={{width: "80%", marginTop: "20px"}} onClick={handleRemove}>Remove</button>
            </div>
            
          </div>
          
        ))
      )}
      
    </div>
    <Link to='/' style={{width:"100%"}} className='btn btn-outline-warning'>Back to Home</Link>
    </>
  );
}

export default SaveWishlist;
