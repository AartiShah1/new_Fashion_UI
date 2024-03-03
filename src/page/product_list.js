import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/product_list.css";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import update from "../component/image/update.jpg";
// import Sidebar from "../component/Sidebar";

const Product_list = () => {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState([]);

  const [userInfo, setUserInfo] = useState([]);
  const [auth, setAuth] = useState([]);
  // const [edit, setEdit] = useState();

  const [productId, setProductId] = useState(0)
  const [product_name, setProduct_name] = useState("");
  const [product_price, setProduct_price] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
  const [category, setCategory] = useState("");
  const [listUnit, setListUnit] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [image, setImage] = useState("");
  const [files, setFiles] = useState([]);
  const [discount, setDiscount] = useState("");

  const navigate = useNavigate();
  


  const getProduct = () => {
    axios
      .get("http://localhost:4500/product/getallProducts")
      .then((response) => {
        setData(response.data); // Update the data state with the fetched data
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  const listData = async () => {
    try {
      var response = await axios.get(`http://localhost:4500/product/unit`);
      if (Array.isArray(response.data)) {
        console.log(response.data);
        setListUnit(response.data);
      } else {
        console.error("Respone data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching address data:", error);
    }
  };

  const listCategoryData = async () => {
    try {
      var response = await axios.get(`http://localhost:4500/product/category`);
      if (Array.isArray(response.data)) {
        console.log(response.data);
        setListCategory(response.data);
      } else {
        console.error("Respone data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching address data:", error);
    }
  };


  useEffect(() => {
    getProduct();
    listData();
    listCategoryData();
    let userData = JSON.parse(localStorage.getItem("userInfo"));
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






  const add_product = () => {
    if (auth) {
      navigate("/product", { replace: true });
    } else {
      navigate("/", { replace: true });
    }

  };

 

  // handle file inputs
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      let files = e.target.files;
      let x = [];
      for (let i = 0; i < files.length; i++) {
        x.push(files[i]);
      }
      setFiles(x);
      console.log("files:", x);
    }
  };

  const updateProduct = async (e) => {
    if (productId <= 0) return;
    e.preventDefault();

    const images = new FormData();
    for (let i = 0; i < files.length; i++) {
      images.append("files", files[i]);
    }

    console.log('images', images)

    const confirmed = window.confirm(
      "Are you sure you want to update this item?"
    );

    if (confirmed) {
      // Validation for product_name (at least 4 characters)
      if (product_name.length < 4) {
        alert("Product Name should be at least 4 characters.");
        return;
      }

      // Validation for description (at least 6 characters, if provided)
      if (description && description.length < 6) {
        alert("Description should be at least 6 characters.");
        return;
      }

      // Validation for product_price (greater than zero)
      if (parseFloat(product_price) <= 0 || isNaN(parseFloat(product_price))) {
        alert("Product Price should be greater than zero.");
        return;
      }

      // Validation for discount (must contain numbers)
      if (!/^\d+$/.test(discount)) {
        alert("Discount should only contain numbers.");
        return;
      }


      try {
        if (files.length > 0) {
          await axios.post("http://localhost:4500/upload", images).then(async res => {
            let productDetails = {
              "product_name": product_name,
              "product_price": product_price,
              "description": description,
              "category": category,
              "unit": unit,
              "image": res.data.body.files[0].length > 0 ? res.data.body.files[0] : image,
              "discount": discount,
              "id": productId,
            }
            const response = await axios.put(`http://localhost:4500/product/updateProduct?id=${editData.productId}`, productDetails);
            if (response.status === 200) {
              alert(response.data.message);
              navigate("/product_list", { replace: true });
              window.location.reload();
            } else {
              console.error(`Error updating product. Status: ${response.status}`);
            }
          })
        }
        else {
          let productDetails = {
            "product_name": product_name,
            "product_price": product_price,
            "description": description,
            "category": category,
            "unit": unit,
            "image": image,
            "discount": discount,
            "id": productId,
          }
          const response = await axios.put(`http://localhost:4500/product/updateProduct?id=${editData.productId}`, productDetails);
          if (response.status === 200) {
            alert(response.data.message);
            navigate("/product_list", { replace: true });
            window.location.reload();
          } else {
            console.error(`Error updating product. Status: ${response.status}`);
          }
        }


      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };


  const deleteProduct = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to disable this item?"
    );

    if (confirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:4500/product/deleteProduct?id=${id}`
        );

        if (response.status === 200) {
          alert(response.data.message);
          navigate("/product_list", { replace: true });
          window.location.reload();
        } else {
          console.error(`Error deleting product. Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // const editProducts = async (e) => {

  // };

  const containerStyle = {
    padding: '20px',
     // Set the background color
  };

  const addButtonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    marginBottom: '20px',
    cursor: 'pointer',
  };

  const headingStyle = {
    fontSize: '34px',
    marginBottom: '20px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const tableHeaderStyle = {
    backgroundColor: '#206063',
    color: '#fff',
    padding: '10px',
    textAlign: 'left',
  };

  const tableBodyStyle = {
    backgroundColor: 'white', // Pink color for table body

  };

  const tableCellStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
  };

  const productImageStyle = {
    width: '100%',
    height: '100%',
    // objectFit: 'contain',
  };

  const buttonContainerStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const buttonStyle = {
    marginRight: '10px',
    cursor: 'pointer',
  };

  return (
    <>

  

      <Modal
  show={show}
  onHide={() => setShow(false)}
  dialogClassName="modal-90w"
  aria-labelledby="example-custom-modal-styling-title"
>
<Modal.Header closeButton style={{ backgroundColor: '#206063', color: 'white' }}>
  <Modal.Title id="example-custom-modal-styling-title">
    Update Product details
  </Modal.Title>
</Modal.Header>

    {/* className="form-control my-input" */}
  <Modal.Body style={{ backgroundColor: ' #739698', color: '#333' }}>
    {editData && (
      <form
        autoComplete="off"
        className="form-group"
        onSubmit={(e) => updateProduct(e)}
      >
        <label htmlFor="product_name">Product Name</label>
        <input
          type="text"
          className="form-control my-input"
          required
          onChange={(e) => setProduct_name(e.target.value)}
          value={product_name}
        />

        <label htmlFor="product_price">Product Price</label>
        <input
          type="number"
          className="form-control my-input"
          required
          onChange={(e) => setProduct_price(e.target.value)}
          value={product_price}
        />

        <label htmlFor="description">Description</label>
        <textarea
          className="form-control my-input"
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />

          <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  id="category"
                >
                  <option>Select Category</option>
                  {listCategory.map((item) => (
                    <option key={item.id} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="unit">Unit:</label>
                <select
                  className="form-control"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  id="unit"
                >
                  <option>Select Unit</option>
                  {listUnit.map((item) => (
                    <option key={item.id} value={item.unit}>
                      {item.unit}
                    </option>
                  ))}
                </select>
              </div>

        <label htmlFor="files">Product Image:</label>
        <div className="form-group">
          <small className="inputLabels">Picture</small>
          <input
            className="text my-input"
            type="file"
            id="files"
            name="files"
            multiple
            onChange={handleFileChange}
            accept="image/png, image/jpg, image/jpeg"
          />
        </div>

        <label htmlFor="discount">Discount:</label>
        <input
          type="text"
          className="form-control my-input"
          required
          onChange={(e) => setDiscount(e.target.value)}
          value={discount}
        />

        <button style={{backgroundColor: '#46cfb1',padding: '6px 10px', }}>
          Apply Changes
        </button>
      </form>
    )}
  </Modal.Body>
</Modal>



<div style={containerStyle}>
      <button style={addButtonStyle} onClick={() => add_product()}>
        Add Product
      </button>
      <br />
      <br />
      <h1 style={headingStyle}>Product List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={tableStyle} className="table table-width" id="myTable">
          <thead>
            <tr>
            <th style={tableHeaderStyle}>Sno</th>
            <th style={tableHeaderStyle}>product_name</th>
            <th style={tableHeaderStyle}>product_price</th>
            <th style={tableHeaderStyle}>description</th>
            <th style={tableHeaderStyle}>categoryName</th>
            <th style={tableHeaderStyle}>unitName</th>
            <th style={tableHeaderStyle}>image</th>
            <th style={tableHeaderStyle}>discount</th>
            <th style={tableHeaderStyle}>Actions</th>



              {/* {Object.keys(data[0] || {}).map((key) => (
                <th key={key} style={tableHeaderStyle}>
                  {key}
                </th>
              ))}
              <th style={tableHeaderStyle}>Actions</th> Add a new header for actions */}
            </tr>
          </thead>
          <tbody style={tableBodyStyle}>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td style={tableCellStyle}>{index+1}</td>
                <td style={tableCellStyle}>{item.product_name}</td>
                <td style={tableCellStyle}>{item.product_price}</td>
                <td style={tableCellStyle}>{item.description}</td>
                <td style={tableCellStyle}>{item.categoryName}</td>
                <td style={tableCellStyle}>{item.unitName}</td>
                <td style={tableCellStyle}>{<img src={`http://localhost:4500/images/${item.image}`} alt="Product Image" style={productImageStyle}/>}</td>
                <td style={tableCellStyle}>{item.discount}</td>
                {/* <td style={tableCellStyle}>{item.}</td> */}
                {/* {Object.entries(item).map(([key, value], index) => (
                  <td key={index} style={tableCellStyle}>
                    {key === 'file' ? ( // Assuming 'image' is the key for the image URL
                      <img src={value} alt="Product" className="circular-image" />
                    ) : key === 'description' ? (
                      <div style={{ width: '150px' }}>{value}</div> // Adjust the width as needed
                    ) : (
                      value
                    )}
                  </td>
                ))} */}
                <td style={buttonContainerStyle}>
                  <Button
                    style={{
                      ...buttonStyle,
                      background: '#28a745', // Green color for update button
                      color: '#fff',
                    }}
                    onClick={() => {
                      setShow(true);
                      setEditData(item);
                      setProductId(item.id);
                      setCategory(item.categoryName)
                      setUnit(item.unitName)
                      setImage(item.image);
                      setProduct_name(item.product_name);
                      setProduct_price(item.product_price);
                      setDescription(item.description);
                      setDiscount(item.discount);
                    }}
                  >
                    Update
                  </Button>
                  <button
          style={{
            ...buttonStyle,
            background: '#e84b3c', 
            margin: '30px 0', 
            padding: '6px 10px', 
            fontSize: '16px', 
          }}
          onClick={() => deleteProduct(item.id)}
        >
          Disable
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

export default Product_list;
