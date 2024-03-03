

import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'; // Import icons
import '../css/footer.css'; // Import the CSS file for additional styling if needed
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="row">
        <div className="col-lg-5 col-md-6 col-sm-12">
          <div className="footer-info">
            <h3 className="footer-heading">About Us</h3>
            
            <h6 className="subtitle">Unlock Your Unique Elegance: Because Your Style Deserves a Spotlight.</h6>
            <h4 className="subtitle" style={{ fontStyle: 'italic' }}>Your Ultimate Fashion Destination</h4>

            {/* Address Information */}
            <div className="address-info">
              <p><FaMapMarkerAlt /> Murli Bagaicha-12, Birgunj , Nepal</p>
             
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="footer-links">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to='/about'>About Page</Link></li>
              <li className="mb-2"><Link to='/login'>Login Page</Link></li>
              <li className="mb-2"><Link to='/signup'>SignUp Page</Link></li>
              {/* Add more links as needed */}
            </ul>
          </div>
        </div>
        <div className="col-lg-2 col-md-6 col-sm-12">
          <div className="footer-social">
            <h3 className="footer-heading">Connect With Us</h3>
            <div className="social-icons">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
              <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-6 col-sm-12">
          <div className="footer-admin">
            <h3 className="footer-heading">Contact The Admin</h3>
            <p> <FaEnvelope /> aartishah9855@gmail.com</p>
            <p> <FaEnvelope /> jigyashachaudhary5@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12 text-center">
          <h3 className="copyright-text"><h6>Copyright &copy; 2023 Your A.S Fashion Website. All Rights Reserved.</h6></h3>
        </div>
      </div>

      {/* <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
  
      <div style={{ width: '22%', border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }}>
        <img src={cloth} alt="Product 1" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
        <h3>Title 1</h3>
        <p>Description 1</p>
      </div>

     
      <div style={{ width: '22%', border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }}>
        <img src="image2.jpg" alt="Product 2" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
        <h3>Title 2</h3>
        <p>Description 2</p>
      </div>

      
      <div style={{ width: '22%', border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }}>
        <img src="image3.jpg" alt="Product 3" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
        <h3>Title 3</h3>
        <p>Description 3</p>
      </div>

     
      <div style={{ width: '22%', border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }}>
        <img src="image4.jpg" alt="Product 4" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
        <h3>Title 4</h3>
        <p>Description 4</p>
      </div>
    </div> */}


    </footer>
  );
};

export default Footer;
