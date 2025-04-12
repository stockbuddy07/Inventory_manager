import React, { useState } from "react";
import "./AddItemForm.css";

function AddItemForm({ onAddItem }) {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    category: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(formData);
    setFormData({ name: "", quantity: "", category: "", price: "" });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0 text-center">Add New Item</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Item Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label">Quantity</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="quantity" 
                    value={formData.quantity} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="category" 
                    value={formData.category} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  <i className="bi bi-plus-circle"></i>
                  <span>Add New Item</span>
                </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddItemForm;
