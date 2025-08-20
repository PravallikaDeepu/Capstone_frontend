import React, { useEffect, useState } from 'react'
// import View from './View.js'
import Axios from 'axios'
// function Rating({selectRating,setSelectRating}) {
function   Rating(){
    const [selectRating,setSelectRating] = useState("")
    const [review,setReview] = useState("")

    const ratings = [
        {"value": 1, "label": "1-Poor"},
        {"value": 2, "label": "2-Fair"},
        {"value": 3, "label": "3-Good"},
        {"value": 4, "label": "4- Very Good"},
        {"value": 5, "label": "5- Excellent"}
    ]
    function handleSelection(e)
    {
        setSelectRating(e.target.value)
    }

    function handleReview(e)
    {
        setReview(e.target.value)
    }

    // useEffect(()=>{
    //     const fetchData = async () =>
    //     {
    //         await Axios.get("http://localhost:7070/rating")
    //         .then(function(output)
    //     {
    //         console.log(output)
    //         setSelectRating(output.data)
    //     })
    //     .catch(function(err)
    // {
    //     console.log(err)
    // })
    //     }
    // //    fetchData()
    // }, [])

    function handleSubmit(e)
    {
        e.preventDefault()
        const fetchData = async ()=>
        {
            const response = await Axios.post("http://localhost:7070/rating", {
                review: review,
                rating: selectRating
            })
            .then((output)=>
            {
                console.log(output.data)
            })
            .catch((e)=>
            {
                console.log(e)
            })
            console.log(response)
        }
    fetchData()
    }


  return (
    <div>
        <h1>HI</h1>
       <h2>{selectRating}</h2>
       <h4>{review}</h4>
    
    <div className='view'> 
<div className='container'>
    <h1>Write a Customer Review</h1>
    <label >Rating:</label>
    <form style={{margin: "25px"}} method="POST" onSubmit={handleSubmit}>
    <select value={selectRating} onChange={handleSelection}>
        {ratings.map((rating)=>
        {
           return <option key={rating.value} name='rating'>{rating.label}</option>
        })}
        
    </select><br/><br/>
        
            <textarea placeholder='Write a Review' cols={40} rows={5} name='review' onChange={handleReview}></textarea><br/><br/>
           <button className='btn btn-outline-warning'>Submit</button>
        </form> 
    </div>
    </div>
    </div>
  )
}

export default Rating;