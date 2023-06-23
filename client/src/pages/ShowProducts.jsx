import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css-files/ShowProduct.css';
import { useNavigate } from 'react-router-dom';

const ShowProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/v1/productinfo/products');
      const productsData = response.data.products;
      setProducts(productsData);
    } catch (error) {
      console.error("Error in Fetching Products", error);
    }
  };
  
  const wishlistHandle = async (productId) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken');
      if(!accessToken){
        navigate("/login")
      }  
      // Make the API request to add the product to the user's wishlist
      const response = await axios.post(
        'http://localhost:4500/api/v1/userinfo/wishlist',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
  
      // Handle the response as needed
      console.log('Product added to wishlist');
    } catch (error) {
      console.error("Error in adding product to wishlist", error);
    }
  };
  
  const cartHandle = async (productId) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken');
      
      if(!accessToken){
        navigate("/login")
      }  
      // Make the API request to add the product to the user's cart
      const response = await axios.post(
        'http://localhost:4500/api/v1/userinfo/cart',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
  
      // Handle the response as needed
      console.log('Product added to cart');
    } catch (error) {
      console.error("Error in adding product to cart", error);
    }
  };
  

  return (
    <div className="product-container">
      <h1>Products List</h1>
      <div className="product-container1">
        {products.map((product) => (
            <div key={product._id} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Company: {product.company}</p>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Seller: {product.seller}</p>
            <button onClick={() => wishlistHandle(product._id)}>Add to WishList</button>
            <button onClick={() => cartHandle(product._id)}>Add to Cart</button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default ShowProduct;
