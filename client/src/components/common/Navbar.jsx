import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({name}) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="home-container">
        <div className="up">
            <i className="ri-customer-service-fill">Have a question? CALL US+00-000-00000</i>
            <div style={{display: "flex", alignItems: "center"}}>
                <i className="ri-user-3-line">Track My Order</i>
                <i className="ri-user-3-line" style={{display: "flex", cursor: "pointer"}}> { name && <h3>{name}</h3> } {name==="" && <h3 onClick={()=>navigate("/login")}>SignIn</h3> } </i>
            </div>
            { name && <div onClick={logout}><i className="ri-logout-circle-r-line" style={{cursor: "pointer"}}>Logout</i></div> }
        </div>
        <div className='up1'>
            <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                <div>  
                    <img src="https://t3.ftcdn.net/jpg/02/47/48/00/240_F_247480017_ST4hotATsrcErAja0VzdUsrrVBMIcE4u.jpg" height={"84px"} alt="" />
                </div>
                <div style={{alignSelf: "center"}}>
                    <input type="text" className='search-input' placeholder='Search'/>
                    <button><i className="ri-search-line"></i></button> 
                </div>
                <div style={{display: "flex"}}>
                    <i className="ri-heart-line" style={{alignSelf: "center", fontSize: "4vh", color: "red"}}></i>
                    <div style={{cursor: "pointer"}} onClick={()=>navigate("/wishlist")}>
                        <p>favorite</p> <h3>WishList</h3>
                    </div>
                </div>
                <div style={{display: "flex", cursor: "pointer"}} onClick={()=>navigate("/cart")}>
                    <i className="ri-shopping-cart-2-line" style={{alignSelf: "center", fontSize: "4vh", color: "blue"}}></i>
                    <div>
                        <p>$0</p> <h3>My Cart</h3>
                    </div>
                </div>
            </div>
        </div>
        <nav className="navbar">
          <ul className="category-nav">
            <li className="category-item"><Link to="/">Home</Link></li>
            <li className="category-item"><Link to="/showproducts/women%27s%20fashion">Women's Fashion</Link></li>
            <li className="category-item"><Link to="/showproducts/men%27s%20fashion">Men's Fashion</Link></li>
            <li className="category-item"><Link to="/showproducts/electronics">Electronics</Link></li>
            <li className="category-item"><Link to="/showproducts/home%20and%20beauty">Home and Beauty</Link></li>
            <li className="category-item"><Link to="/showproducts/home%20and%20garden">Home and Garden</Link></li>
            <li className="category-item"><Link to="/showproducts/computer">Computer</Link></li>
          </ul>
        </nav>
        </div>
    </div>
  )
}

export default Navbar