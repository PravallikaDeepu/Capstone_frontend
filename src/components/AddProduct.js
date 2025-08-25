import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ProductForm() {
  const [bNo, setbNo] = useState("")
  const [original, setOriginal] = useState("")
  const [bAuthor, setbAuthor] = useState("")
  const [bname, setName] = useState("")
  const [bimage, setImage] = useState("")
  const [bprice, setPrice] = useState("")
  const [bdescription, setDescription] = useState("")
  const [category, setCategory] = useState("Fiction")
  const navigate = useNavigate()
  const API_BASE_URL = process.env.REACT_APP_BACKEND_API_URL || "http://localhost:7070"

  useEffect(() => {
    const generatedDate = Date.now()
    setbNo(generatedDate)
  }, [])

  async function save(e) {
    e.preventDefault()
    const productData = {
      bNo,
      bAuthor,
      bdescription,
      bname,
      bimage,
      original,
      bprice,
      category
    }

    try {
      const res = await Axios.post(`${API_BASE_URL}/add/products`, productData)
      console.log(res.data)
      alert(res.data.message)
      navigate("/")
      setName('')
      setbAuthor('')
      setImage('')
      setOriginal('')
      setPrice('')
      setDescription('')
      setCategory('Fiction')
    } 
    catch (error) {
      console.error(error)
      alert('Failed to add product')
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={save} className="p-4 shadow-lg rounded bg-white" style={{ width: "100%", maxWidth: "500px" }}>
        <h3 className="text-center mb-4 text-primary">📚 Add New Book</h3>

        <div className="mb-3">
          <label className="form-label">Book Number:</label>
          <input type="number" value={bNo} className="form-control" readOnly />
        </div>

        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input type="text" value={bname} onChange={e => setName(e.target.value)} className="form-control" required />
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
          <input type="number" value={bprice} onChange={e => setPrice(e.target.value)} className="form-control" />
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

export default ProductForm
