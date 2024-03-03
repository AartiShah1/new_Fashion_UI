import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./global/cartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cashout = () => {
  const { totalPrice, totalQnty, shoppingCart } = useContext(CartContext);

  const [user, setUser] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const placeOrder = async (e) => {
    e.preventDefault();

    if (address === "" || !address) {
      alert("Address is missing");
      return;
    } else if (contact === "" || !contact) {
      alert("Contact is missing");
      return;
    }

    const addressRegex = /^[a-zA-Z ]+$/;

if (!addressRegex.test(address)) {
  alert("Address should only contain alphabetical characters");
  return;
}

if (address.length < 5) {
  alert("Address should be greater than or equal to 5 characters");
  return;
}
  
    // Validate contact number starts with 9 and has 10 digits
    if (!contact.match(/^[9]\d{9}$/)) {
      alert("Contact number should start with 9 and have 10 digits");
      return;
    }
    

    let date = new Date();
    let time = new Date().getTime();

    let body = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      contact: contact,
      address: address,
      totalPrice: totalPrice,
      totalQnty: totalQnty,
      date: date,
      time: time,
      shoppingCart: shoppingCart,
    };

    if (!user){
      alert('User is not loggedIn');
      return;
    }
    await axios
      .post("http://localhost:4500/usercart/createCart", body)
      .then(async (userOrderData) => {
        if(userOrderData.data.message === 'Cart inserted.'){
          setSuccessMsg(userOrderData.data.message)
          alert(userOrderData.data.message);
          navigate("/", { replace: true });
          window.location.reload();
        }else{
          throw Error();
        }
    })
    .catch((err) => {
      alert(err.message);
    });
    
  };

  useEffect(() => {
    try {
      let userData = JSON.parse(localStorage.getItem("userInfo"));
      console.log("userDatacasjout", userData);
      if (userData) setUser(userData);
      else {
        localStorage.clear("userInfo");
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError(err)
      alert(err.message);
    }
  }, [navigate]);

  const formStyles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      maxWidth: "800px",
      margin: "0 auto",
      backgroundColor:"#206063"
    },
    leftContainer: {
      flex: 1,
      padding: "20px",
    },
    rightContainer: {
      flex: 1,
      padding: "20px",
    },
    form: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    label: {
      display: "block",
      marginTop: "10px",
    },
    input: {
      width: "100%",
      padding: "8px",
      marginTop: "5px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxSizing: "border-box",
    },
    submitButton: {
      backgroundColor: "#5bc0de",
      color: "#fff",
      padding: "10px 15px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    errorMessage: {
      color: "#d9534f",
      marginTop: "15px",
    },
  };

  return (
    <>
    
      {/* <div className="container">
        <br />
        <h2>Place Order</h2>
        <br />
        {successMsg && <div className="success-msg">{successMsg}</div>}
        <form autoComplete="off" className="form-group" onSubmit={placeOrder}>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            className="form-control"
            required
            value={user.name}
          />
          <br />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            required
            value={user.email}
            disabled
          />
          <br />

          <label htmlFor="contactNo">Mobile/Contact No:</label>
          <input
            type="number"
            className="form-control"
            required
            onChange={(e) => setContact(e.target.value)}
            value={contact}
            placeholder="Type mobile number...9886"
          />
          <br />

          <label htmlFor="deliveryAddress">Delivery Address:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <br />

          <label htmlFor="priceToPay">Price To Pay:</label>
          <input
            type="number"
            className="form-control"
            required
            value={totalPrice}
            disabled
          />
          <br />

          <label htmlFor="totalNumberOfProducts">
            Total number of products:
          </label>
          <input
            type="text"
            className="form-control"
            required
            value={totalQnty}
            disabled
          />
          <br />

          <button type="submit" className="btn btn-success btn-md mybtn">
            PLACE ORDER
          </button>
        </form>
        {error && <div></div>}
      </div> */}
    <div style={formStyles.container}>
      <div style={formStyles.leftContainer}>
        <h2>Place Order</h2>
        {successMsg && <div className="success-msg">{successMsg}</div>}
        <form autoComplete="off" style={formStyles.form} onSubmit={placeOrder}>
          <label htmlFor="name" style={formStyles.label}>Full Name:</label>
          <input
            type="text"
            style={formStyles.input}
            required
            value={user.name}
          />
          <br />

          <label htmlFor="email" style={formStyles.label}>Email:</label>
          <input
            type="email"
            style={formStyles.input}
            required
            value={user.email}
            disabled
          />
          <br />

          <label htmlFor="contactNo" style={formStyles.label}>Mobile/Contact No:</label>
          <input
            type="number"
            style={formStyles.input}
            required
            onChange={(e) => setContact(e.target.value)}
            value={contact}
            placeholder="Type mobile number...9886"
          />
          <br />

          <label htmlFor="deliveryAddress" style={formStyles.label}>Delivery Address:</label>
          <input
            type="text"
            style={formStyles.input}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <br />

          <label htmlFor="priceToPay" style={formStyles.label}>Price To Pay:</label>
          <input
            type="number"
            style={formStyles.input}
            required
            value={totalPrice}
            disabled
          />
          <br />

          <label htmlFor="totalNumberOfProducts" style={formStyles.label}>Total number of products:</label>
          <input
            type="text"
            style={formStyles.input}
            required
            value={totalQnty}
            disabled
          />
          <br />

          <button type="submit" style={formStyles.submitButton}>
            PLACE ORDER
          </button>
        </form>
        {error && <div style={formStyles.errorMessage}>{error}</div>}
      </div>

      
    </div>

    </>
  );
};

export default Cashout;
