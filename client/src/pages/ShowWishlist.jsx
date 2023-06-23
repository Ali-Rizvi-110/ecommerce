import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css-files/ShowWishlist.css';

const ShowWishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Fetch the wishlist using the security token
    const fetchWishlist = async () => {
      try {
        const accessToken = sessionStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:4500/api/v1/userinfo/wishlist', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const { data } = response;
        setWishlist(data);
        console.log(data);
      } catch (error) {
        console.log({ err: 'Error fetching wishlist', error });
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken');
      const response = await axios.delete(`http://localhost:4500/api/v1/userinfo/wishlist/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { message } = response.data;
      console.log(message);

      // Update the wishlist state after successful removal
      setWishlist((prevWishlist) => prevWishlist.filter((product) => product._id !== productId));
    } catch (error) {
      console.log({ err: 'Error removing product from wishlist', error });
    }
  };

  return (
    <div className="container">
      <h1>Wishlist</h1>
      <div className="wishlist-items">
        {wishlist.map((product) => (
          <div key={product._id} className="wishlist-item">
            <h2>{product.name}</h2>
            <img src={product.imageUrl} alt={product.name} />
            <p>Company: {product.company}</p>
            <p>Description: {product.description}</p>
            <p>Seller: {product.seller}</p>
            <p>Price: {product.price}</p>
            <button
              style={{ color: 'darkred', fontSize: 'medium' }}
              onClick={() => handleRemoveFromWishlist(product._id)}
            >
              Remove (X)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowWishlist;
