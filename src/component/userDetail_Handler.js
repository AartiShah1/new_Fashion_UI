

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

import "../css/userDetail_Handler.css"; // Import your CSS file

const UserDetail_Handler = () => {
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [auth, setAuth] = useState([]);
  const navigate = useNavigate();

  // const handleDelete = (id) => {
  //   axios.delete(`http://localhost:4500/users/deleteUser?id=${id}`)
  //     .then((response) => {
  //       setData(data.filter(item => item.id !== id));
  //       console.log("Data deleted successfully");
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting data:", error);
  //     });
  // }

  const handleDelete = (id) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm("This user cannot be deleted at the moment as they have initiated a purchase.");
  
    if (isConfirmed) {
      axios.delete(`http://localhost:4500/users/deleteUser?id=${id}`)
        .then((response) => {
          setData(data.filter(item => item.id !== id));
          console.log("Data deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        });
    } else {
      // User canceled the deletion
      alert("User Deleted");
    }
  }
  

  useEffect(() => {
    axios.get("http://localhost:4500/users/getUsers")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
  
    let userData = JSON.parse(localStorage.getItem("userInfo"));

    if (!userData) {
      //localStorage.clear("userInfo");
      navigate("/userSetail_Handler", { replace: true });
    }

    if(userData){
      setUserInfo(auth);
    }
    else{
      localStorage.removeItem('userInfo');
      navigate('/',{replace:true})
    }


    // setAuth(userData);
    // Make a GET request to the API endpoint when the component mounts
  }, []);


  const styles = {
    customTable: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    tableHeader: {
      backgroundColor: "#206063",
      color: "#fff",
      padding: "12px",
      textAlign: "left",
    },
    tableCell: {
      border: "1px solid #ddd",
      padding: "12px",
      textAlign: "left",
    },
    evenRow: {
      backgroundColor: "#f2f2f2",
    },
    button: {
      backgroundColor: "#d9534f",
      color: "#fff",
      border: "none",
      padding: "8px 12px",
      cursor: "pointer",
    },
    hoverRow: {
      backgroundColor: "#ddd",
    },
  };

  return (
    <>
     

<div> 
  <br /> 
  <h2>User Detail</h2>
        <table style={styles.customTable}>
        
          <thead>
            <tr>
              <th style={styles.tableHeader}>ID</th>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Address</th>
              <th style={styles.tableHeader}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id}
                style={index % 2 === 0 ? styles.evenRow : null}
              >
                <td style={styles.tableCell}>{item.id}</td>
                <td style={styles.tableCell}>{item.name}</td>
                <td style={styles.tableCell}>{item.email}</td>
                <td style={styles.tableCell}>{item.address}</td>
                <td style={styles.tableCell}>
                  <Button
                    style={styles.button}
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



    </>
  );
};

export default UserDetail_Handler;
