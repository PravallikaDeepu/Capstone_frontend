import Axios from 'axios'
import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function Product() {
    const [bNo, setbNo] = useState("")
      const [original, setOriginal] = useState("")
      const [bAuthor, setbAuthor] = useState("")
      const [bTitle, setBTitle] = useState("")
      const [bimage, setImage] = useState("")
  const [discountedPrice, setDiscountedPrice] = useState("")
      const [bdescription, setDescription] = useState("")
      const [category, setCategory] = useState("Fiction")
      const navigate = useNavigate()
    // const API = process.env.REACT_APP_BACKEND_API_URL || "http://localhost:8080";
    const API = "http://localhost:7070"
    console.log(API)

    
      useEffect(() => {
        const generatedDate = Date.now()
        setbNo(generatedDate)
      }, [])

    async function handleText(e)
    {
        e.preventDefault()
        const pData = {
           bNo,bTitle,bAuthor,category,bimage,original, discountedPrice,bdescription
        }
        console.log(pData,"pData")

        const res = await Axios.post(`${API}/producting`, pData)
        console.log(res,"RESULting response")
        console.log(res.data.message)
        alert(res.data.message)
        navigate("/")
    }
    return (
    // <div>
    //     <form onSubmit={handleText}>
    //         <h1>Add Product</h1>
    //        <label>Book Name</label>
    //        <input type='text' placeholder='Enter Book Name' value={bTitle} onChange={e=>setBTitle(e.target.value)}/><br/><br/>

    //        <label>Book Author</label>
    //        <input type='text' placeholder='Enter Author Name' value={bAuthor} onChange={e=>setBAuthor(e.target.value)}/><br/><br/>
    //        <button type='submit'>Submit</button>

    //     </form>
    // </div>
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleText} className="p-4 shadow-lg rounded bg-white" style={{ width: "100%", maxWidth: "500px", marginTop: "300px" }}>
        <h3 className="text-center mb-4 text-primary">📚 Add New Book</h3>

        <div className="mb-3">
          <label className="form-label">Book Number:</label>
          <input type="number" value={bNo} className="form-control" readOnly />
        </div>

        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input type="text" value={bTitle} onChange={e => setBTitle(e.target.value)} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Author Name:</label>
          <input type="text" value={bAuthor} onChange={e => setbAuthor(e.target.value)} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Category:</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="form-select">
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>Children Book</option>
            <option>Comic & Graphic Novels</option>
            <option>Others</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Original Price:</label>
          <input type="number" value={original} onChange={e => setOriginal(e.target.value)} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Discounted Price:</label>
          <input type="number" value={discountedPrice} onChange={e => setDiscountedPrice(e.target.value)} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL:</label>
          <input type="text" value={bimage} onChange={e => setImage(e.target.value)} className="form-control" required />
        </div>

        <div className="mb-4">
          <label className="form-label">Description:</label>
          <textarea value={bdescription} onChange={e => setDescription(e.target.value)} rows="4" className="form-control" />
        </div>

        <button type="submit" className="btn btn-success w-100">Submit Book ✅</button>
      </form>
    </div>
  )
}

export default Product