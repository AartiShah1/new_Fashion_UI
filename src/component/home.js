// Import necessary libraries
import React, { useState, useContext } from 'react';
import { ProductContext } from "./global/productContext";
import { CartContext } from "./global/cartContext";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "../css/home.css";
import ImageSlider from "../component/imageslider";
import Footer from './footer';

const Home = () => {
  const data = useContext(ProductContext);
  const productList = Object.values(data.products);
  const { dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = productList.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productCardStyle = {
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
    width: '250px',
    cursor: 'pointer',
    margin: '10px',
  };

  const productImgContainerStyle = {
    marginBottom: '10px',
    height: '150px',
    overflow: 'hidden',
  };

  const productImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  };

  const productDetailsStyle = {
    marginTop: '10px',
  };

  const productNameStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const productCategoryStyle = {
    fontSize: '12px',
    // fontWeight: 'bold',
    marginBottom: '5px',
  };

  const productPriceStyle = {
    color: '#007bff',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  const addCartBtnStyle = {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '10px',
  };

  const viewBtnStyle = {
    backgroundColor: ' #c0de15',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '10px',
    marginRight: '5px',
  };

  const containerStyle = {
    backgroundColor: '#9eedf3',
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    let userData = JSON.parse(localStorage.getItem('userInfo'));
    if (userData) {
      dispatch({
        type: 'ADD_TO_CART',
        id: product.productId,
        product,
      });
      alert(`${product.product_name} has been added to your cart!`);
    } else {
      alert('Please login to add products to your cart.');
    }
  };

  return (
    <>
      <ImageSlider />
      <div className="welcomeMessage" style={containerStyle}>
        <h1>Welcome to A.S Fashion Shop</h1>
        <p>Step into a world of style at A.S Online Fashion Store, where the latest trends and timeless elegance converge seamlessly. We're thrilled to welcome you to an online shopping experience tailored just for you. Embrace the ease of shopping from the comfort of your home as you explore curated collections designed to elevate your wardrobe. Your style journey begins here – welcome to a world of fashion possibilities!</p>
      </div>

      <h2 h2 style={{ width: '45%', marginBottom: '10px', padding: '10px', backgroundColor: '#9eedf3', color: 'black', borderRadius: '5px', textAlign: 'center', fontStyle: 'italic' }}>Search the Product</h2>

  <input
  type="text"
  placeholder="Type to search..."
  value={searchTerm}
  onChange={handleSearchChange}
  style={{
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    width: '30%', // Set width to 30% of the container
    boxSizing: 'border-box',
    backgroundColor: '#f0f0f0', // Change background color to a light gray
    color: '#333', // Set text color
  }}
/>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }} className="products-container">
        {filteredProducts.length === 0 && <div>No matching products found.</div>}
        {filteredProducts.map((product) => (
          <div key={product.id} style={productCardStyle}>
            <div style={productImgContainerStyle}>
              <img
                src={`http://localhost:4500/images/${product.image}`}
                alt="Product Image"
                style={productImageStyle}
              />
            </div>
            <div style={productDetailsStyle}>
              <div style={productNameStyle}>{product.product_name}</div>
              <div style={productCategoryStyle}>({product.categoryName})</div>
              <div style={productPriceStyle}>Rs{product.product_price}</div>
            </div>
            <button
              style={viewBtnStyle}
              onClick={() => handleViewDetails(product)}
            >
              VIEW
            </button>
            <button
              style={addCartBtnStyle}
              onClick={() => handleAddToCart(product)}
            >
              ADD TO CART
            </button>
          </div>
        ))}
      </div>

      {/* Modal for displaying product details */}
      <Modal show={selectedProduct !== null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct?.product_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
            src={`http://localhost:4500/images/${selectedProduct?.image}`}
            alt="Product"
          />

          <div>
            <br />
            <h3><b>Product Name:</b> {selectedProduct?.product_name}</h3>
            
            <h6><b> Description:</b> {selectedProduct?.description}</h6>
            
            <h4 style={{ color: 'green' }}>
        <b>Price:</b> Rs{selectedProduct?.product_price}
      </h4>

            {/* Add more details as needed */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default Home;

