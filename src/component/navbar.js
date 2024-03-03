import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/navbar.css";
import logo from "./image/logo AS.jpg";
import { CartContext } from "./global/cartContext";
import { Icon } from "react-icons-kit";
import { cart } from "react-icons-kit/entypo";


const Navbar=()=>{
  const [auth, setAuth] = useState();
  const navigate=useNavigate();
  const { totalQnty } = useContext(CartContext);

  useEffect(()=>{
    let userData = JSON.parse(localStorage.getItem('userInfo'));
    setAuth(userData);
    if(userData){
      setAuth(userData)
      // localStorage.setItem("userInfo",JSON.stringify(userData))
      // navigate('/',{replace:true});
    }
    else{
      localStorage.clear('userInfo');
    }
  },[navigate])

  const logoutUser = () =>{
    localStorage.removeItem('userInfo');
    window.location.reload();
}

  return(
    <>
      <div className=" navbar">
        <div className="logo">
          <Link to='/'><img src={logo} alt=" logo" height="50px" width="50px" style={{ marginLeft: '10px' }}/></Link>
        </div>
        <div >
        {
            !auth &&
            <div className="navitem">
            
              <Link to='/'><li>Home</li></Link>
              <Link to='/about'><li>About</li></Link>
              <Link to='/login'><li>Login</li></Link>
              <Link to='/signup'><li>Sign Up</li></Link>
              
            </div>
          }
          {
            auth &&
            <div className="navitem">
                   
              <Link to='/'><li>Home</li></Link>
              <Link to='/about'><li>About</li></Link>
              <Link to ='/user_cartdetail'><li>User Cartdetail</li></Link>

              {auth.role === 'admin' && (
                <>
                  <Link to='/addProduct'><li>Add Product</li></Link>
                  <Link to='/inventory'><li>Inventory</li></Link>
                  <Link to='/product_list'><li>ProductList</li></Link>
                  <Link to='/userDetail_Handler'><li>UserDetail_Handler</li></Link>
                  
                  <Link to='/dashboard'><li>Dashboard</li></Link>
                </>
              )}

              <span>
              <Link to="cartproducts">
                <Icon icon={cart}></Icon>{" "}
              </Link>
              </span>
              <div className="relative">
                <span className="no-of-products">{totalQnty}</span>
              </div>
              <span></span>
              <button className="btn btn-danger" onClick={()=>logoutUser()}>{auth.name} (Logout)</button>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default Navbar