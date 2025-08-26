import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import CategoryComponent, { FictionContext } from './CategoryComponent'
import Axios  from 'axios'
function Categories(props) {
    const [myData,setMyData] = useState([])
    const API_URL =process.env.REACT_APP_BACKEND_API_URL
    useEffect(()=>{
        const fetchData = (async()=>{
            try{
                const output = await Axios.get(`${API_URL}/display/books`)
                setMyData(output.data)
                console.log(output.data,"OUT")
            }
            catch(e){
              console.log(e)
            }
        })
        fetchData()
    },[props.category])

    const filteredData = myData.filter((val)=>
    {
      if(props.category === "All") return true;
      return val.category.includes(props.category)
    })

  function handleAll(categoryName) {
    const btn = document.getElementsByClassName("category")
    btn.forEach((e)=>{
      console.log(e)
    })
 console.log("Selected category:", categoryName);
  props.setCategory(categoryName);
 
}

  return (
   
    <div className="category">
  {/* <button type="button" class="btn btn-outline-primary">Left</button>
  <button type="button" class="btn btn-outline-primary">Middle</button>
  <button type="button" class="btn btn-outline-primary">Right</button>
</div> */}

        <button key="all" onClick={()=>handleAll("All")}>All</button>
        <button key="fiction" onClick={()=>handleAll("Fiction")}>Fiction</button>
        <button key="non-fiction" onClick={()=> handleAll("Non-Fiction")}>Non-Fiction</button>
        <button key="childrenBook" onClick={()=> handleAll("Children Book")}>Children Book</button>
        <button key="comic" onClick={()=> handleAll("Comic & Graphic Novels")}>Comic & Graphic Novels</button>
        <button key="others" onClick={()=> handleAll("Others")}>Others</button>
    </div>
    
  )
}

export default Categories