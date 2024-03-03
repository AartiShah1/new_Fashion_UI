import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const [product_name, setProduct_name] = useState("");
  const [product_price, setProduct_price] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [listUnit, setListUnit] = useState([]);
  const [listCategory, setListCategory] = useState([]);

  const [userInfo, setUserInfo] = useState([]);
  const [auth, setAuth] = useState([]);

  // const [quantity, setQuantity] = useState("");

  // const [image, setImage] = useState("");
  const [files, setFiles] = useState([]);
  const [discount, setDiscount] = useState("");
  const navigate = useNavigate();

  const onClick = async (e) => {
    e.preventDefault();
    const images = new FormData();
    for (let i = 0; i < files.length; i++) {
      images.append("files", files[i]);
    }



    if (product_name.length < 4) {
      alert("Product Name should be at least 4 characters.");
      return;
    }

    if (!/^\d+$/.test(product_price) || +product_price <= 0) {
      alert("Product price should be a positive number");
      return;
    }

    if (description && description.length < 6) {
      alert("Description should be at least 6 characters.");
      return;
    }

    if (category === "") {
      alert("Please select a category");
      return;
    }

    if (unit === "") {
      alert("Please select a unit");
      return;
    }

    if (files.length === 0) {
      alert("Please select an image");
      return;
    }

    if (!/^\d+$/.test(discount)) {
      alert("Discount should be a numeric value");
      return;
    }



    if (images) {
      await axios.post("http://localhost:4500/upload", images)
        .then(async (res) => {
          console.log("images", res);
          let body = {
            product_name: product_name,
            product_price: product_price,
            description: description,
            category: category,
            unit: unit,
            discount: discount,
            file: res.data.body.files[0],
          };

          await axios
            .post("http://localhost:4500/product/createProduct", body)
            .then(async (result) => {
              console.log(result);

              try {
                if (
                  result.status === 200 &&
                  result.data.message === "Product Data inserted."
                ) {
                  alert(result.data.message);
                  navigate("/product_list", { replace: true });

                } else {
                  alert(result.data.message);
                  // localStorage.clear();
                  navigate("/product", { replace: true });
                  window.location.reload();
                }
              } catch (err) {
                console.log(err);
              }
            });
        }
        )
    };
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

  const listDataCategory = async () => {
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
    listData();
    listDataCategory();

    let userData = JSON.parse(localStorage.getItem("userInfo"));

    if (!userData) {
      //localStorage.clear("userInfo");
      navigate("/product", { replace: true });
    }

    if(userData){
      setUserInfo(auth);
    }
    else{
      localStorage.removeItem('userInfo');
      navigate('/',{replace:true})
    }


    //eslint-disable-next-line
  }, []);




const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    marginRight: '20px', // Add spacing to the right
    marginLeft: '450px',  // Add margin from the bottom of the screen
    marginBottom: '20px',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
    backgroundColor: '#739698',
    padding: '30px',
    borderRadius: '10px',
    width: '45vw' , // Set container width to 75% of viewport width
    // height: '100vh',
  };

  const formStyle = {
    maxWidth: '500px',
    margin: 'auto',
    width: '100%'
  };

  const buttonStyle = {
    marginTop: '10px'
 
   
  };





const headingStyle = {
    textAlign: 'center',
    marginTop: '20px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', 
    backgroundColor: '#206063', 
    padding: '10px',
    borderRadius: '5px',
    color:'white'
  };

  

  return (

   

    <div style={containerStyle}>
      <h3 style={headingStyle}>Product Form</h3>
      <form autoComplete="off" className="form-group" onSubmit={onClick} style={formStyle}>
      <div className="form-group">
        <label htmlFor="product_name">Product Name:</label>
        <input
          type="text"
          id="product_name"
          name="product_name"
          className="form-control"
          required
          onChange={(e) => {
            setProduct_name(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="product_price">Product Price:</label>
        <input
          type="number"
          id="product_price"
          name="product_price"
          className="form-control"
          required
          onChange={(e) => {
            setProduct_price(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          className="form-control"
          required
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} id="category">
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
        <select className="form-control" value={unit} onChange={(e) => setUnit(e.target.value)} id="unit">
          <option>Select Unit</option>
          {listUnit.map((item) => (
            <option key={item.id} value={item.unit}>
              {item.unit}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <small className="inputLabels">Picture</small>
        <label htmlFor="files" className="file">
          <input
            className="form-control-file"
            type="file"
            id="files"
            name="files"
            multiple
            onChange={handleFileChange}
            accept="image/png, image/jpg, image/jpeg"
          />
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="discount">Discount:</label>
        <input
          type="number"
          id="discount"
          name="discount"
          className="form-control"
          onChange={(e) => {
            setDiscount(e.target.value);
          }}
        />
      </div>

      <button type="submit" className="btn btn-primary">Add to Product</button>
    </form>

      <div className="text-center note" style={{ marginTop: '20px' }}>
        Already have an account?{' '}
        <Link to="/login" className="link">
          Login
        </Link>
      </div>
    </div>
    
  );
};



export default AddProduct;
