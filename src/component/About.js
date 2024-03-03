import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import "../css/about.css"
import React from 'react';
import { useNavigate } from "react-router-dom";
import  { useEffect, useState } from "react";
import AboutImageSlider from "../component/aboutslider";
import Footer from "./footer";
import ReviewPage from "./global/sliderpage";

import dresses from "../component/image/dresses.jpg";
import hoodie from "../component/image/hoodie.jpg";
import woman_blazer from "../component/image/woman blaz.jpg";
import menblazer from "../component/image/men blazer.jpg";
import aarti from "../component/image/aarti.png";

import jiggg from "../component/image/jiggg.jpg";

import SliderPage from "./global/sliderpage";


const About = () => {

  const [userInfo, setUserInfo] = useState([]);
  const [auth, setAuth] = useState([]);
  const navigate = useNavigate();

  

  const productCardStyle = {
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
    width: '23%',
    cursor: 'pointer',
    marginLeft: '15px', // Adjust the margin-left property
    marginTop: '10px',  // Add margin-top property
    marginBottom: '10px',  // Add margin-bottom property
    textAlign:'center',
  };


  const productRowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1px',
    justifyContent: 'space-between',
    marginTop: '20px',
  };


  const containerStyle = {
    display: 'flex',
    gap: '20px',
    marginLeft: '20px',
    // marginRight: '20px',
  };

  const contentStyle = {
    display: 'flex',
    flex: '0.9',
    gap: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
  };

  const photoStyle = {
    flex: '0.3',
    height: '300px',
    backgroundColor: '#ddd',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  // const photoStyle = {
  //   flex: '0.3',  // Set the flex property to make it take up 30% of the container width
  //   height: '300px',
  //   backgroundColor: '#ddd',
  //   borderRadius: '8px',
  //   overflow: 'hidden',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // };

  const imgStyle = {
    width: '100%',
    height: '100%',
    // objectFit: 'cover',
    objectFit: 'contain',
  };

  

  // const descriptionStyle = {
  //   flex: '1',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  // };
  
  const descriptionStyle = {
    flex: '1',
    padding: '20px',
    // border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
  };


  useEffect(() => {
  
    let userData = JSON.parse(localStorage.getItem("userInfo"));

    if (!userData) {
      //localStorage.clear("userInfo");
      navigate("/about", { replace: true });
    }

    if(userData){
      setUserInfo(auth);
    }
    else{
      localStorage.removeItem('userInfo');
      navigate('/about',{replace:true})
    }


    // setAuth(userData);
    // Make a GET request to the API endpoint when the component mounts
  }, []);



  return (
    <>

<AboutImageSlider/>
    <br />
    <h2 h2 style={{ width: '45%', marginBottom: '10px', padding: '10px', backgroundColor: '#9eedf3', color: 'black', borderRadius: '5px', textAlign: 'center', fontStyle: 'italic' }}>Product Category</h2>

     <div style={productRowStyle}>
      {/* Column 1 */}
      <div style={{ ...productCardStyle, marginLeft: 0 }}>
        <img src={dresses} alt="Product 1" style={{ width: '100%', height: '150px', objectFit: 'contain', borderRadius: '8px' }} />
        <h3>Dresses</h3>
        
      </div>

      {/* Column 2 */}
      <div style={productCardStyle}>
        <img src={hoodie} alt="Product 2" style={{ width: '100%', height: '150px', objectFit: 'contain', borderRadius: '8px' }} />
        <br />
        <h3>Hoodie</h3>
        
      </div>

      {/* Column 3 */}
      <div style={productCardStyle}>
        <img src={woman_blazer} alt="Product 3" style={{ width: '100%', height: '150px', objectFit: 'contain', borderRadius: '8px' }} />
        <h3>Woman Blazer</h3>
     
      </div>

      {/* Column 4 */}
      <div style={productCardStyle}>
        <img src={menblazer} alt="Product 4" style={{ width: '100%', height: '150px', objectFit: 'contain', borderRadius: '8px' }} />
        <h3>Men blazer</h3>
    
      </div>
    </div> 

    <br />
    <h2 h2 style={{ width: '65%', marginBottom: '10px', padding: '10px', backgroundColor: '#9eedf3', color: 'black', borderRadius: '5px', textAlign: 'center', fontStyle: 'italic' }}>Founder of A.S Fashion Store</h2>
    
    
    <br />

    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* Photo Div */}
        <div style={photoStyle}>
          {/* Place your photo or image element here */}
          <img
            img src={aarti} // Placeholder image URL
            alt="Placeholder"
            style={imgStyle}
          />
        </div>

        {/* Description Div */}
        <div style={descriptionStyle}>
          <h2>I'm Aarti Shah , the Founder of "A.S Fashion Store"</h2>
          <p>
            <br />
         <h6>Welcome to our fashion eCommerce store! At FashionHub, we are passionate about providing the latest trends and styles to our customers.</h6> 
       
        
         <p>At "A.S Fashion Store", our journey began with a vision to revolutionize the fashion industry by offering a curated collection of eco-friendly and ethically sourced clothing.
We invite you to explore our carefully curated collection and be a part of our community. 
          </p>
          <h6>Connect with "A.S Fashion Store"  to stay updated on the latest arrivals, and to share your sustainable fashion journey.I value your feedback and am always excited to connect with our community.</h6>
          <p> <FaEnvelope /> aartishah9855@gmail.com</p>
            </p>
        </div>
      </div> 
    </div>
    <br />

    <h2 h2 style={{ width: '65%', marginBottom: '10px', padding: '10px', backgroundColor: '#9eedf3', color: 'black', borderRadius: '5px', textAlign: 'center', fontStyle: 'italic' }}>Customer Experience Manager  of "A.S Fashion Store"</h2>

<br />

    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* Photo Div */}
        <div style={photoStyle}>
          {/* Place your photo or image element here */}
          <img
            img src={jiggg} // Placeholder image URL
            alt="Placeholder"
            style={imgStyle}
          />
        </div>

        {/* Description Div */}
        <div style={descriptionStyle}>
          <h3>I'm Jigyasha Chaudhary, Customer Experience Manager </h3>
          <br />
          <p>
            
         <p>"A.S Fashion Store" stands as a testament to my belief that fashion can be a force for positive change. Every piece curated here is chosen with intention, blending trendsetting designs with a commitment to ethical practices.
Each piece in our collection to ensure a blend of the latest trends, timeless classics, and sustainable choices. 
          </p>
          <h6>Connect with "A.S Fashion Store"  to stay updated on the latest arrivals, and to share your sustainable fashion journey.I value your feedback and am always excited to connect with our community.</h6>
        
            <p> <FaEnvelope /> jigyashachaudhary5@gmail.com</p>
        </p>
        </div>
      </div> 
    </div>

    
<br />
<h2 h2 style={{ width: '45%', marginBottom: '10px', padding: '10px', backgroundColor: '#9eedf3', color: 'black', borderRadius: '5px', textAlign: 'center', fontStyle: 'italic' }}>Message</h2>
<SliderPage/>

    <Footer/>
    </>
  );
};

export default About;



