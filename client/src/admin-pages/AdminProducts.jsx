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

  const deleteHandler = async (productId) => {
    try{
        const accessToken = sessionStorage.getItem('accessToken');
        const response = await axios.post('http://localhost:4500/api/v1/productinfo/delete', {productId}, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
        console.log(response.data.name, "deleted");
        fetchData();
    }catch(error){
        console.log({err: "Error in deleteHandlerProduct", error});
    }
  }

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
            <button onClick={()=>deleteHandler(product._id)}>Delete Product</button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default ShowProduct;
