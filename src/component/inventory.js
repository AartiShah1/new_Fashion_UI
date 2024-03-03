import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom/dist";

const Inventory_list = () => {
  const [auth, setAuth] = useState([]);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProduct = async () => {
    await axios
      .get("http://localhost:4500/inventory/getallinventory")
      .then((response) => {
        setData(response.data); // Update the data state with the fetched data
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  const add_product = () => {
    if (auth) {
      navigate("/product", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  const deleteProduct = async (id) => {
    alert(`id is interted ${id}`);
  };

  const editInventory = async (id, prevQuantity) => {
    if (Number(id) <= 0) return;
    const NewQuantity = prompt("Enter Quantity to Increase");
    if (id > 0 && Number(NewQuantity) > 0) {
      let increasedQuantity = Number(prevQuantity) + Number(NewQuantity);
      let body = {
        quantity: increasedQuantity,
        productId: id,
      };
      if (Number(increasedQuantity) > 0) {
        const result = await axios.put(
          "http://localhost:4500/inventory/increaseInventory",
          body
        );
        if (
          result.data.status === 200 &&
          result.data.message === "Inventory Data updated."
        ) {
          alert(result.data.message);
          window.location.reload();
        } else {
          alert(result.data.message);
          window.location.reload();
        }
      }
    }
  };

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userInfo"));
    setAuth(userData);
    if (!userData) {
      localStorage.clear("userInfo");
      navigate("/login", { replace: true });
    }
    getProduct();
  }, [navigate]);

  const containerStyle = {
    margin: '20px',
  };

  const addButtonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
  };

  const headingStyle = {
    marginTop: '20px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    backgroundColor: 'yellow',
  };

  const tableHeaderStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
    backgroundColor: '#206063',
    color: '#fff',
  };

  const tableCellStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
  };

  const buttonStyle = {
    marginRight: '10px',
    background: 'red',
    color: 'black',
  };

  return (
    <>


<div style={containerStyle}>
      <button style={addButtonStyle} onClick={add_product}>
        Inventory List
      </button>
      <br />
      <br />
      <h1 style={headingStyle}>Inventory List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={tableStyle} className="table">
          <thead>
            <tr>
              <td style={tableHeaderStyle}>Sno.</td>
              <td style={tableHeaderStyle}>Product</td>
              <td style={tableHeaderStyle}>Quantity</td>
              <td style={tableHeaderStyle}>Action</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td style={tableCellStyle}>{index + 1}</td>
                <td style={tableCellStyle}>{item.productName}</td>
                <td style={tableCellStyle}>
                  {item.quantity} {item.unitName}
                </td>
                <td style={tableCellStyle}>
                  {/* <button onClick={() => editInventory(item.id, item.quantity)}>Add Quantity</button> */}
                  {/* <button style={buttonStyle} onClick={() => deleteProduct(item.id)}>
                    Delete
                  </button> */}

                    <button
                      onClick={() => editInventory(item.id, item.quantity)}
                      style={{
                        backgroundColor: '#3a9618',
                        padding: '10px 15px',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      Add Quantity
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>


    </>
  );
};

export default Inventory_list;


