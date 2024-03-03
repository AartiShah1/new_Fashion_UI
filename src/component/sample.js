import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/product_list.css";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Product_list = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState([]);
  const [productId, setProductId] = useState(0);
  const [product_name, setProduct_name] = useState("");
  const [product_price, setProduct_price] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
  const [listUnit, setListUnit] = useState([]);
  const [image, setImage] = useState("");
  const [files, setFiles] = useState([]);
  const [discount, setDiscount] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useState([]);

  const getProduct = () => {
    axios
      .get("http://localhost:4500/product/getallProducts")
      .then((response) => {
        setData(response.data);
        setLoading(false);
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
        setListUnit(response.data);
      } else {
        console.error("Response data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching address data:", error);
    }
  };

  useEffect(() => {
    getProduct();
    listData();
    let userData = JSON.parse(localStorage.getItem("userInfo"));
    setAuth(userData);
  }, []);

  const add_product = () => {
    if (auth) {
      navigate("/product", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      let files = e.target.files;
      let x = [];
      for (let i = 0; i < files.length; i++) {
        x.push(files[i]);
      }
      setFiles(x);
    }
  };

  const updateProduct = async (e) => {
    if (productId <= 0) return;
    e.preventDefault();

    const images = new FormData();
    for (let i = 0; i < files.length; i++) {
      images.append("files", files[i]);
    }

    const confirmed = window.confirm(
      "Are you sure you want to update this item?"
    );

    if (confirmed) {
      // Validation for product_name (accept characters and numbers)
      if (!/^[a-zA-Z0-9 ]+$/.test(product_name)) {
        alert("Product Name should only contain characters and numbers.");
        return;
      }

      // Validation for description (accept characters and numbers, optional)
      if (description && !/^[a-zA-Z0-9 ]+$/.test(description)) {
        alert("Description should only contain characters and numbers.");
        return;
      }

      // Validation for discount (must contain numbers)
      if (!/^\d+$/.test(discount)) {
        alert("Discount should only contain numbers.");
        return;
      }

      try {
        await axios.post("http://localhost:4500/upload", images).then(async (res) => {
          let productDetails = {
            "product_name": product_name,
            "product_price": product_price,
            "description": description,
            "unit": unit,
            "image": res.data.body.files[0].length > 0 ? res.data.body.files[0] : image,
            "discount": discount,
            "id": productId,
          };
          const response = await axios.put(`http://localhost:4500/product/updateProduct?id=${editData.productId}`, productDetails);
          if (response.status === 200) {
            alert(response.data.message);
            navigate("/product_list", { replace: true });
            window.location.reload();
          } else {
            console.error(`Error updating product. Status: ${response.status}`);
          }
        });
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  const deleteProduct = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
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

  return (
    <>
      {/* ... (existing code) */}
    </>
  );
};

export default Product_list;
