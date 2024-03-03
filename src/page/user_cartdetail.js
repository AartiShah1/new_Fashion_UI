import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/user_cartdetail.css"; // Import your external CSS file
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const User_cartdetail = () => {
  const [usercart, setUsercart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [cartDetails, setCartDetails] = useState([]);
  const navigate = useNavigate();
  const [cartIdData, setCartIdData] = useState([]);
  const [auth, setAuth] = useState([]);

  const [userInfo, setUserInfo] = useState([]);


  // const [productId, setProductId] = useState("");
  // const [productName, setProductName] = useState("");
  // const [quantity, setQuantity] = useState("");
  // const [price, setPrice] = useState("");
  // const [unitId, setUnitId] = useState("");
  // const [unit, setUnit] = useState("");
  // const [total, setTotal] = useState("");
  // const [userCartId,setUserCartId]= useState(0);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userInfo"));
    if (!userData) {
      navigate('/login', { replace: true })
    }
    else {
      setAuth(userData);
      fetchData(userData.userId, userData.role)
    };
  }, []);

  const fetchData = async (userId, role) => {
    try {
      let url = '';
      if(role ==='admin') url = `http://localhost:4500/usercart/getCart?userId=${0}`;
      else url = `http://localhost:4500/usercart/getCart?userId=${userId}`  
      
      const response = await axios.get(url);
      setUsercart(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleOrderDetails = async (cartId) => {
    try {
      const cartIdData = await axios.get(`http://localhost:4500/usercart/getCartByCartId?cartId=${cartId}`);
      console.log('cartIdData:', cartIdData.data[0]);
      setCartIdData('');
      setCartDetails('');
      if (cartIdData.data.length > 0) setCartIdData(cartIdData.data[0]);
      else return;
      const response = await axios.get(`http://localhost:4500/usercart/getusercartDetails?cartId=${cartId}`);
      // Handle the response for the specific product ID
      console.log(`Product with ID ${cartId}:`, response.data);
      setCartDetails(response.data);
    } catch (error) {
      console.error(`Error fetching product with ID ${cartId}:`, error);
    }
  };

  const handleCancelCart = async (cartId) => {
    try {
      // Add the logic to delete the cart based on the cartId
      // Example: const response = await axios.delete(`http://localhost:4500/usercart/deleteCart/${cartId}`);

      const response = await axios.delete(`http://localhost:4500/usercart/cancelCart?cartId=${cartId}`);

      // Refresh the user cart data after deletion

      setShow(false); // Close the modal after deletion if needed
     
    } catch (error) {
      console.error(`Error Canceling cart with ID ${cartId}:`, error);
    }
  };

  const handleAcceptOrder = async (cartId) => {
    try {
      // Add the logic to delete the cart based on the cartId
      // Example: const response = await axios.delete(`http://localhost:4500/usercart/deleteCart/${cartId}`);

      const acceptResponse = await axios.put(`http://localhost:4500/usercart/acceptCart?cartId=${cartId}`);

      console.log('acceptResponse',acceptResponse)

      // Refresh the user cart data after deletion

      setShow(false); // Close the modal after deletion if needed
      // window.location.reload();
    } catch (error) {
      console.error(`Error Accepting cart with ID ${cartId}:`, error);
    }
  };

  const tableHeaderCellStyle = {
    border: '1px solid #dddddd',
    textAlign: 'center',
    padding: '8px',
    background: '#206063',//'#f2f2f2',
    color: 'white',//'#333',
  };

  const tableCellStyle = {
    border: '1px solid #dddddd',
    textAlign: 'center',
    padding: '8px',
  };

  // const handleButtonClick = async (userId) => {
  //   try {
  //     const response = await axios.get(`http://localhost:4500/usercart/getCart/${userId}`);
  //     // Handle the response for the specific product ID
  //     console.log(`Product with ID ${userId}:`, response.data);
  //   } catch (error) {
  //     console.error(`Error fetching product with ID ${userId}:`, error);
  //   }
  // };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Order details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         

          <div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <tbody style={{ background: '#7cbef766', color: 'Black' }}>
                <tr>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Name:</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{cartIdData.customer_name}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Email:</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{cartIdData.email}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>PhoneNo:</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{cartIdData.phoneNo}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Address:</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{cartIdData.address}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Date:</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{new Date(cartIdData.date).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Order Status:</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{cartIdData.orderStatus}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#206063', color: 'white', textAlign: 'right' }} >
              <tr>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Sno.</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Product Name</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Quantity</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Unit</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Price/Unit</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartDetails &&
                cartDetails.map((details, index) => (
                  <tr key={details.cartId}>
                    <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{index + 1}</td>
                    <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{details.productName}</td>
                    <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{details.quantity}</td>
                    <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{details.unit}</td>
                    <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{details.price}</td>
                    <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{details.total}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div style={{ background: '#206063', color: 'white', textAlign: 'right' }}>
            <p style={{ marginRight: '10px' }}>Total Price: {cartIdData.total_price}</p>
          </div>

          {auth && (auth.role === 'admin' || (cartIdData.orderStatus === 'placed')) && (
            <button style={{ background: 'red', marginRight: '10px', padding: '10px' }} onClick={() => {handleCancelCart(cartIdData.cartId); window.location.reload();}}>
              Cancel Cart
            </button>
          )} 

{/* DONE */}

          {auth && auth.role !== 'admin' && cartIdData.orderStatus === 'accepted' && (
            <button style={{ background: 'red', marginRight: '10px' }} onClick={() => window.location.reload()}>
              Your Order is accepted
            </button>
          )}

          {auth && auth.role === 'admin' && cartIdData.orderStatus === 'placed' &&(
            <button style={{ marginLeft: '10px' ,padding: '10px',background: '#6ec955'}} onClick={() => {handleAcceptOrder(cartIdData.cartId); window.location.reload();}}>
              Accept Order
            </button>
          )}
        </Modal.Body>
      </Modal>


      <table className="product-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={tableHeaderCellStyle}>S.no</th>
            <th style={tableHeaderCellStyle}>Customer Name</th>
            <th style={tableHeaderCellStyle}>Email</th>
            <th style={tableHeaderCellStyle}>PhoneNo</th>
            <th style={tableHeaderCellStyle}>Address</th>
            <th style={tableHeaderCellStyle}>Total Quantity</th>
            <th style={tableHeaderCellStyle}>Total Price</th>
            <th style={tableHeaderCellStyle}>Date</th>
            <th style={tableHeaderCellStyle}>Order Status</th>
            <th style={tableHeaderCellStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {usercart.map((product, index) => (
            <tr key={product.cartId}>
              <td style={tableCellStyle}>{index + 1}</td>
              <td style={tableCellStyle}>{product.customer_name}</td>
              <td style={tableCellStyle}>{product.email}</td>
              <td style={tableCellStyle}>{product.phoneNo}</td>
              <td style={tableCellStyle}>{product.address}</td>
              <td style={tableCellStyle}>{product.totalQnty} Items</td>
              <td style={tableCellStyle}>Rs. {product.total_price}</td>
              <td style={tableCellStyle}>{new Date(product.date).toLocaleDateString()}</td>
              <td style={tableCellStyle}>{product.orderStatus}</td>
              <td style={tableCellStyle}>
                <button
                  onClick={() => {
                    setShow(true);
                    handleOrderDetails(product.cartId);
               
                  }}
                  style={{ background: '#4CAF50', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px' }}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default User_cartdetail;

