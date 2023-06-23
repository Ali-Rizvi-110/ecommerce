import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterProduct = () => {

  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    company: '',
    description: '',
    seller: '',
    imageUrl: '',
    price: 0
  });

  const handleImageUpload = async (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'firstPreset');
    formData.append('cloud_name', 'dgyftncun')

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dgyftncun/image/upload', formData);
      const imageUrl = response.data.secure_url;
      console.log("image URL", imageUrl)
      setProduct((prevProduct) => ({ ...prevProduct, imageUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(product)
      const accessToken = sessionStorage.getItem('accessToken');
      const response = await axios.post('http://localhost:4500/api/v1/productinfo/products', {
        name: product.name,
        company: product.company,
        description: product.description,
        seller: product.seller,
        imageUrl: product.imageUrl,
        price: product.price
      },{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log(`Product ${product.name} added to the database`);
      navigate('/showproducts');
    } catch (error) {
      console.log({ err: 'Error in submitting form', error });
    }
  };

  return (
    <div className='register-page'>
      <h2>Register Product</h2>
      <form onSubmit={handleSubmit} className='register-form'>
        <div className='form-group'>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor="price">Product Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            name="company"
            value={product.company}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor="seller">Seller:</label>
          <input
            type="text"
            id="seller"
            name="seller"
            value={product.seller}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageUpload}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
      {/* {product.imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={product.imageUrl} alt="Uploaded" />
        </div>
      )} */}
    </div>
  );
};

export default RegisterProduct;
