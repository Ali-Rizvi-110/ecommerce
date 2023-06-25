import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import { useParams } from 'react-router-dom';

const ShowProductsCategory = () => {
    const [products, setProducts] = useState([]);
    const {category} = useParams();

  useEffect(() => {
    fetchData();
    console.log(category);
  }, [category]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4500/api/v1/productinfo/products?category=${category}`);
      const productsData = response.data.products;
      setProducts(productsData);
    } catch (error) {
      console.error('Error in Fetching Products', error);
    }
  };

  return (
    <div>
        <Navbar/>
        <h2>Products in {category? category: "Database"}</h2>
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
  );
};

export default ShowProductsCategory;
