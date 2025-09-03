import React, { useEffect, useState } from 'react';
import Card from './components/Card.js'
import View from './components/View.js' 
// import AddToCart from './components/AddToCart.js' 
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import SearchComponent, {SearchContext} from './components/SearchComponent.js';
import Navbar from './components/Navbar.js';
import Axios from 'axios'
import CategoryComponent from './components/CategoryComponent.js';
import Profile from './components/Profile.js';
import Orders from './components/Orders.js';
import Signup from './components/Signup.js';
import Login from './components/Login.js';
import Logout from './components/Logout.js';
import Edit from './components/Edit.js';
import Delete from './components/Delete.js';
import AddProduct from './components/AddProduct.js';
import SaveWishlist from './components/SaveWishlist.js';
import Payment from './components/Payment.js';
import Complete from './components/Complete.js';
function App() {
  const API_BASE_URL = process.env.REACT_BACKEND_API_URL || "http://localhost:7070"
    const [myData,setMyData] = useState([])
    const [category,setCategory]= useState("")
    const [isLoggedIn,setIsLoggedIn] = useState(false)
  

       useEffect(()=>{
      const fetchData = (async()=>
      {
        try{
          const output = await Axios.get(`${API_BASE_URL}/display/books`)
          console.log(output.data)
          setMyData(output.data)
        }
        catch(e)
        {
          console.log(e)
        }
      })
      fetchData()
    },[])
  return (
      
    <BrowserRouter>
    <SearchComponent>
    <CategoryComponent> 
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
<Routes>
        <Route path='/' element={<Card isLoggedIn={isLoggedIn} category={category} setCategory= {setCategory}/>}></Route>
              <Route path='/view/book/:bookNo' element={<View/>}></Route>
              <Route path='/edit/book/:bookNo' element={<Edit/>}></Route>
              {/* <Route path='/add/cart/:bookNo' element={<AddToCart/>}></Route> */}
    <Route path='/my/profile' element={<Profile/>}></Route>
    <Route path='/my/orders' element={<Orders/>}></Route>
    <Route path='/signup' element={<Signup/>}></Route>
    <Route path='/login' element={<Login data={isLoggedIn} initial={setIsLoggedIn}/>}></Route>
    <Route path='/logout' element={<Logout isLoggedIn={isLoggedIn}/>}></Route>
    <Route path='/book/:bookNo' element={<Delete/>}></Route>
    <Route path='/add/product' element={<AddProduct/>}></Route>
    <Route path='/save/wishlist' element={<SaveWishlist/>}></Route>
    <Route path='/make/payment' element={<Payment/>}></Route>
    <Route path='/pay' element={<Complete/>}></Route>
      </Routes>
</CategoryComponent>
    </SearchComponent>
      
    </BrowserRouter>
   
  )
}

export default App;