

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/user_cartdetail.css'; // Import your external CSS file

const Order_cartdetail = () => {
  const [usercart, setUsercart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userInfo"));
    fetchData(userData.cartId);
  }, []);

  const fetchData = async (cartId) => {
    try {
      const response = await axios.get(`http://localhost:4500/usercart/getusercartDetails?cartId=${cartId}`);
      setUsercart(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
 



  // const handleOrder = async (cartId) => {
  //   try {
  //     const response = await axios.get(`http://localhost:4500/usercart/getusercartDetails/${cartId}`);
  //     // Handle the response for the specific product ID
  //     console.log(`Product with ID ${cartId}:`, response.data);
  //   } catch (error) {
  //     console.error(`Error fetching product with ID ${cartId}:`, error);
  //   }
  // };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Sno</th>
          <th>productName</th>
          <th>quantity</th>
          <th>price</th>
          <th>unitId</th>
          <th>totalQnty</th>
          <th>total_price</th>
          <th>unitId</th>
          <th>unit</th>
          <th>total</th>
        </tr>
      </thead>
      <tbody>
        {usercart.map((product,index) => (
          <tr key={product.cartId}>
            <td>{index+1}</td>
            <td>{product.productName}</td>
            <td>{product.quantity}</td>
            <td>{product.price}</td>
             <td>{product.unitId}</td>
             <td>{product.unit}</td>
             <td>${product.total}</td>
            <td>
              <button onClick={() => handleOrder(product.id)}>
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Order_cartdetail;
