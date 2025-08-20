import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {
  const { bookNo } = useParams();
  const API_BASE_URL = process.env.REACT_BACKEND_API_URL || "http://localhost:7070";
  const navigate = useNavigate();
  const [edit, setEdit] = useState({
    _id: "",
    title: "",
    category: "",
    price: "",
    image: "",
    description: ""
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Axios.get(`${API_BASE_URL}/edit/books/${bookNo}`);
        const output = response.data.readData;
        setEdit(output);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [bookNo, API_BASE_URL]);

  function handleChange(e) {
    const { name, value } = e.target;
    setEdit(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await Axios.post(`${API_BASE_URL}/edit/books/${bookNo}`, edit);
    alert(result.data.message);
    navigate("/");
  }

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Edit Book Details</h3>
      <form onSubmit={handleSubmit} className="border p-4 shadow rounded" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div className="mb-3">
          <label className="form-label">Book Number</label>
          <input type="text" name="_id" value={edit._id} readOnly className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" name="title" value={edit.title} onChange={handleChange} className="form-control" required autoFocus />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select name="category" value={edit.category} onChange={handleChange} className="form-select">
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>Children Book</option>
            <option>Comic & Graphic Novels</option>
            <option>Others</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" name="price" value={edit.price} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input type="text" name="image" value={edit.image} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" value={edit.description} onChange={handleChange} className="form-control" rows="4"></textarea>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">Update Book</button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
