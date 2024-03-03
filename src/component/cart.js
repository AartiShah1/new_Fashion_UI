import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from './global/cartContext';
import { Link, useNavigate } from 'react-router-dom';
import Icon from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add';
import { ic_remove } from 'react-icons-kit/md/ic_remove';
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline';
import Carousel from 'react-bootstrap/Carousel';

const Cart = () => {
  const { shoppingCart, dispatch, totalPrice, totalQnty } = useContext(CartContext);
  const [user] = useState(JSON.parse(localStorage.getItem('userInfo')));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
      alert('You are not logged in.');
    }
  }, [user, navigate]);

  return (
    <>
      <div>
        {shoppingCart.length !== 0 && <h1>Cart</h1>}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent:"space-evenly" }}>
          {shoppingCart.length === 0 && (
            <>
              <div>no items in your cart or slow internet causing trouble (Refresh the page) or you are not logged in</div>
              <div>
                <Link to="/">Return to Home page</Link>
              </div>
            </>
          )}
          {shoppingCart &&
            shoppingCart.map((cart) => (
              <div
                key={cart.id}
                style={{
                  width: '300px',
                  marginBottom: '20px',
                  border: '1px solid #ddd',
                  padding: '10px',
                }}
              >
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  {/* <Carousel>
                    {Array.isArray(cart.productImg) &&
                      cart.productImg.map((images) => (
                        <Carousel.Item key={images} style={{ width: '300px', height: '200px' }}>
                          <img src={images} alt="prod_img" style={{ maxWidth: '100%', height: 'auto' }} />
                        </Carousel.Item>
                      ))}
                  </Carousel> */}
                  <div className="cart-img">
                    <img
                        src={`http://localhost:4500/images/${cart.image}`}
                        alt="product img here"
                        style={{ maxWidth: "100%", height: "auto" }}
                    ></img>
                </div>
                </div>
                <div style={{ marginTop: '10px' }}>{cart.prductName}</div>
                <div style={{ marginTop: '10px' }}>Rs.{cart.product_price}.00</div>
                <div style={{ display: 'flex', marginTop: '10px' }}>
                  <div onClick={() => dispatch({ type: 'INC', id: cart.id, cart })}>
                    <Icon icon={ic_add} />
                  </div>
                  <div style={{ marginLeft: '10px' }}>{cart.qty}</div>
                  <div onClick={() => dispatch({ type: 'DEC', id: cart.id, cart })} style={{ marginLeft: '10px' }}>
                    <Icon icon={ic_remove} size={24} />
                  </div>
                </div>
                <div style={{ marginTop: '10px' }}>Rs.{cart.TotalProductPrice}.00</div>
                <button
                  onClick={() => dispatch({ type: 'DELETE', id: cart.id, cart })}
                  style={{ marginTop: '10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                >
                  <Icon icon={iosTrashOutline} />
                </button>
              </div>
            ))}
          
        </div>
        {shoppingCart.length > 0 && (
            <div style={{ alignItems:'center'}}>
                <div style={{ width: '20%', marginTop: '20px'}}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' ,}}>
                        <thead>
                        <tr>
                            <th colSpan="2" style={{ textAlign: 'left', borderBottom: '2px solid #333', marginBottom: '10px', padding: '10px' }}>Cart Summary</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Total Price</td>
                            <td style={{ textAlign: 'right' }}>{totalPrice}</td>
                        </tr>
                        <tr>
                            <td>Total Quantity</td>
                            <td style={{ textAlign: 'right' }}>{totalQnty}</td>
                        </tr>
                        </tbody>
                    </table>
                    <Link to="/cashout" style={{ display: 'block', width: '100%', textAlign: 'center' }}>
                        <button style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>
                        Cash on Delivery
                        </button>
                    </Link>
                </div>
            </div>
  
        )}
      </div>
    </>
  );
};

export default Cart;


// import React, { useContext, useEffect } from "react";
// import {CartContext} from './global/cartContext';
// import { Link, useNavigate } from "react-router-dom";
// import Icon from "react-icons-kit";
// import {ic_add} from "react-icons-kit/md/ic_add";
// import {ic_remove} from  "react-icons-kit/md/ic_remove";
// import {iosTrashOutline} from "react-icons-kit/ionicons/iosTrashOutline";

// const Cart = () => {

//     const {shoppingCart,dispatch,totalPrice, totalQnty}=useContext(CartContext);
//     console.log(shoppingCart,"dispatch, totalPrice,totalQnt,",'value check')
//     const navigate=useNavigate();


//     useEffect(() => {
//         let userData = JSON.parse(localStorage.getItem("userInfo"));
    
//         if (!userData) {
//           localStorage.clear("userInfo");
//           navigate("/product", { replace: true });
//         }
//          //eslint-disable-next-line
//       }, []);



//     return(

//         <>
//       <div>
//         {shoppingCart.length === 0 && <h1>Cart</h1>}
//         <div className="cart-container">
//           {shoppingCart.length === 0 && (
//             <>
//               <div>
//                 no item in your cart or slow internet causing trouble (Refresh
//                 the page) or you are not logged in
//               </div>
//               <div>
//                 <Link to="/">Return to Home Page</Link>{" "}
//               </div>
//             </>
//           )}
//           {shoppingCart && (
//             <div className="cart-table">
//               <div className="cart-header">
//                 <div>Image</div>
//                 <div>Name</div>
//                 <div>Price</div>
//                 <div>Quantity</div>
//                 <div>Total</div>
//                 <div>Action</div>
//               </div>
//               {shoppingCart.map((cart) => (
//                 <div className="cart-row" key={cart.id}>
//                   <div className="cart-img">
//                     <img
//                       src={`http://localhost:4500/images/${cart.image}`}
//                       alt="product img here"
//                       style={{ maxWidth: "100%", height: "auto" }}
//                     ></img>
//                   </div>
//                   <div className="cart-details">
//                     <div className="cart-name">{cart.prductName}</div>
//                     <div className="cart-price-orignal">Rs.{cart.product_price}.00</div>
//                     <div className="inc" onClick={() => dispatch({ type: "INC", id: cart.id, cart })}>
//                       <Icon icon={ic_add}></Icon>
//                     </div>
//                     <div className="quantity">{cart.qty}</div>
//                     <div className="dec" onClick={() => dispatch({ type: "DEC", id: cart.id, cart })}>
//                       <Icon icon={ic_remove}></Icon>
//                     </div>
//                     <div className="cart-price">Rs.{cart.product_price * cart.qty}.00</div>
//                     <button className="btn btn-danger btn-md" onClick={() => dispatch({ type: "DELETE", id: cart.id, cart })}>
//                       <Icon icon={iosTrashOutline}></Icon>
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//           {shoppingCart.length > 0 && (
//             <div className="cart-summary">
//               <div className="cart-summary-heading">Cart-Summary</div>
//               <div className="cart-summary-price">
//                 <span>Total Price</span>
//                 <span>{totalPrice}</span>
//               </div>
//               <div className="cart-summary-price">
//                 <span>Total Quantity</span>
//                 <span>{totalQnty}</span>
//               </div>
//               <Link to="/cashout" className="cashout-link">
//                 <button className="btn btn-success btn-md" style={{ marginTop: 5 + "px" }}>
//                   Cash on Delivery
//                 </button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </>

//         // <>
//         //     <>
//         //         {shoppingCart.length===0 && <h1>Cart</h1>}
//         //         <div className="cart-container">
//         //             {
//         //                 shoppingCart.length===0 &&<>
//         //                 <div>no item in your cart or slow internet cousing trouble (Refres the page) of you are not logged in</div>
//         //                 <div><Link to='/'>Return to Home Page</Link> </div>
//         //                 </>
//         //             }
//         //             {
//         //                 shoppingCart && shoppingCart.map(cart=>(
//         //                     <div className="cart-card" key={cart.id}>
//         //                         <div className="cart-img">
//         //                             <img src={`http://localhost:4500/images/${cart.image}`} alt="product img here"></img>
//         //                         </div>
//         //                         <div className="cart-name">{cart.prductName}</div>
//         //                         <div className="cart-price-orignal">Rs.{cart.product_price}.00</div>
//         //                         <div className="inc" onClick={()=> dispatch({type:'INC',id:cart.id,cart})}>
//         //                             <Icon icon={ic_add}></Icon>
//         //                         </div>
//         //                         <div className="quantity">{cart.qty}</div>
//         //                         <div className="dec" onClick={()=> dispatch({type:'DEC',id:cart.id,cart})}>
//         //                             <Icon icon={ic_remove}></Icon>
//         //                         </div>
//         //                         <div className="cart-price">
//         //                             Rs.{cart.product_price}.00
//         //                         </div>
//         //                         <button className="btn btn-danger btn-md" onClick={()=> dispatch({type:'DELETE',id:cart.id,cart})}>
//         //                             <Icon icon={iosTrashOutline}></Icon>
//         //                         </button>
//         //                     </div>
//         //                 ))
//         //             }
//         //             {shoppingCart.length>0 && <div className="cart-summary">
//         //                 <div className="cart-summary-heading">
//         //                     Cart-Summary
//         //                 </div>
//         //                 <div className="cart-summary-price">
//         //                     <span>Total Price</span>
//         //                     <span>{totalPrice}</span>
//         //                 </div>
//         //                 <div className="cart-summary-price">
//         //                     <span>Total Qnty</span>
//         //                     <span>{totalQnty}</span>
//         //                 </div>
//         //                 <Link to='/cashout' className="cashout-link">
//         //                     <button className="btn btn-success btn-md" style={{marginTop:5 + 'px'}}>Cash on Delivery </button>
//         //                 </Link>
//         //                 </div>}
//         //         </div>
//         //     </>
//         // </>
//     )

// }

// export default Cart