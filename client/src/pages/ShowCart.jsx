import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css-files/showCart.css';

const ShowCart = () => {
  const [cart, setCart] = useState([]);
  const [temp, setTemp] = useState(0);

  const fetchCart = async () => {
    try {
      const accessToken = sessionStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:4500/api/v1/userinfo/cart', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const { data } = response;
      setCart(data);
      console.log(data);
    } catch (error) {
      console.log({ err: 'Error fetching cart', error });
    }
  };

  useEffect(() => {
    // Fetch the cart using the security token
    fetchCart();
  }, []);

  const increaseCount = async (productId) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken');
      await axios.put(
        `http://localhost:4500/api/v1/userinfo/cart/increase/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      // Update the count of the item in the cart state
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === productId ? { ...item, count: item.count + 1 } : item
        )
      );
    } catch (error) {
      console.log({ err: 'Error increasing item count', error });
    }
  };

  const decreaseCount = async (productId) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken');
      await axios.put(
        `http://localhost:4500/api/v1/userinfo/cart/decrease/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      // Update the count of the item in the cart state
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === productId ? { ...item, count: item.count - 1 } : item
        )
      );
    } catch (error) {
      console.log({ err: 'Error decreasing item count', error });
    }
  };

  if (cart.length === 0) {
    return (
      <div className='container'>
        <h1>Cart</h1>
        <p>Cart is Empty</p>
      </div>
    );
  }

  const filteredCart = cart.filter((item) => item.count > 0);

  return (
    <div className="container">
      <h1>Cart</h1>
      <div className="cart-items">
        {filteredCart.map((item) => (
          <div key={item.productId} className="cart-item">
            <>
              <h2>{item.name}</h2>
              <img src={item.imageUrl} alt={item.name} />
              <p>Company: {item.company}</p>
              <p>Description: {item.description}</p>
              <p>Seller: {item.seller}</p>
              <p>Price: {item.price}</p>
            </>
            <p>Count: {item.count}</p>
            <div className="cart-item-buttons">
              <button onClick={() => decreaseCount(item.productId)}>Decrease (-)</button>
              <button onClick={() => increaseCount(item.productId)}>Increase (+)</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ShowCart;
