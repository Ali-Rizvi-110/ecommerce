import React, { useEffect, useState } from 'react';
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
    price: 0,
    category: ''
  });
  const [imageUpload, setImageUpload] = useState('');
  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  const CLOUD_LINK = import.meta.env.VITE_CLOUD_LINK;
  // console.log(UPLOAD_PRESET, CLOUD_NAME, CLOUD_LINK);
  useEffect(()=>{
    console.log(product);
  }, [product]);

  const handleImageUpload = async (event) => {
    try {
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', UPLOAD_PRESET);
      formData.append('cloud_name', CLOUD_NAME)
      console.log("handleImageUplaod");
      setImageUpload("Wait for image to be uploaded")
      const accessToken = sessionStorage.getItem('accessToken');
      // console.log(accessToken);
      if(!accessToken){
        setImageUpload('First Login to upload the Image');
        console.log("Access token not found. Aborting image upload.");
        return;
      }
      await axios.post('http://localhost:4500/api/v1/admin/verify-image', {accessToken});
      const response = await axios.post(CLOUD_LINK, formData);
      const imageUrl = response.data.secure_url;
      console.log("image URL", imageUrl)
      setProduct((prevProduct) => ({ ...prevProduct, imageUrl }));
      setImageUpload("");
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
        price: product.price,
        category: product.category
      },{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log(`Product ${product.name} added to the database`);
      navigate('/admin-products');
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
            type="number"
            id="price"
            name="price"
            value={product.price? product.price : ""}
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
        {imageUpload}
        <div className='form-group options' style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <label>Categories:</label>
          <div>
            <label>
              <input
                type="radio"
                name="category"
                value="women's fashion"
                checked={product.category === "women's fashion"}
                onChange={handleChange}
              />
              &nbsp;
              Women's Fashion
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="category"
                value="men's fashion"
                checked={product.category === "men's fashion"}
                onChange={handleChange}
              />
              &nbsp;
              Men's Fashion
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="category"
                value="electronics"
                checked={product.category === "electronics"}
                onChange={handleChange}
              />
              &nbsp;
              Electronics
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="category"
                value="home and beauty"
                checked={product.category === "home and beauty"}
                onChange={handleChange}
              />
              &nbsp;
              Home and Beauty
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="category"
                value="home and garden"
                checked={product.category === "home and garden"}
                onChange={handleChange}
              />
              &nbsp;
              Home and Garden
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="category"
                value="computer"
                checked={product.category === "computer"}
                onChange={handleChange}
              />
              &nbsp;
              Computer
            </label>
          </div>
          {/* <div>
            <label>
              <input
                type="radio"
                name="category"
                value="category7"
                checked={product.category === "category7"}
                onChange={handleChange}
              />
              &nbsp;
            men's fashion
            </label>
          </div> */}

          {/* Add more categories as needed */}
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
