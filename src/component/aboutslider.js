import React from "react";
import { useNavigate } from 'react-router-dom';
import "../css/dashboard.css"; // Make sure the path is correct
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import man from "../component/image/man.jpg";
import girl from "../component/image/m.jpg";
import blackmen from "../component/image/10.jpg";
import girls from "../component/image/13.jpg";



function AboutImageSlider() {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const navigate = useNavigate();

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slide">
          <img src={girl} alt="Slider 1" />
          <div className="slide-content left">
            <h1 className="left">"Elevate Your Style, Elevate Your Life"</h1>
            <button type="button" class="btn btn-success" onClick={()=>{navigate('/About', {replace:true})}}>Shop All</button>
          </div>
        </div>
        <div className="slide">
          <img src={man} alt="Slider 2" />
          <div className="slide-content left">
            <h1 className="left">Curated Collections, Endless Styles.</h1>
            <button type="button" class="btn btn-success " onClick={()=>{navigate('/About', {replace:true})}}>Shop Now </button>
          </div>
        </div>
        <div className="slide">
          <img src={blackmen} alt="Slider 3" />
          <div className="slide-content right">
            <h1 className="right">Curated Collections, Endless Styles.</h1>
            <button type="button" class="btn btn-success " onClick={()=>{navigate('/About', {replace:true})}}>Shop Now</button>
          </div>
        </div>
        <div className="slide">
          <img src={girls} alt="Slider 4" />
          <div className="slide-content right">
            <h1 className="right">Where Trends Come to Life.</h1>
            <button type="button" class="btn btn-success " onClick={()=>{navigate('/About', {replace:true})}}>Browse Product</button>
          </div>
        </div>
        {/* Add more slides as needed */}
      </Slider>
    </div>
  );
}

export default AboutImageSlider;
