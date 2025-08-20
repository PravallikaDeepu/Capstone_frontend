import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import CategoryComponent, { FictionContext } from './CategoryComponent'
import Axios  from 'axios'
function Categories(props) {
    const [myData,setMyData] = useState([])
    const API_URL =process.env.REACT_BACKEND_API_URL
    useEffect(()=>{
        const fetchData = (async()=>{
            try{
                const output = await Axios.get(`${API_URL}/display/books`)
                setMyData(output)
            }
            catch(e){
              console.log(e)
            }
        })
        fetchData()
    },[props.category])

    const filteredData = myData.filter((val)=>
    {
      return  val.category.includes()
    })

  function handleAll(categoryName) {
  props.setCategory(categoryName);
  // console.log("Selected category:", categoryName);
}

  return (
    <div className='category'>
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