import React from 'react';
import Slider from 'react-slick';

import '../global/sliderpage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const customerReviews = [
    {
        name: 'Aarti Shah',
        review: 'Welcome to a shopping destination where trends meet timeless elegance. With a commitment to quality, style, and a seamless experience, our website is not just a marketplace – it is your passport to a wardrobe that speaks volumes. Discover the joy of shopping intelligently; shop with us today',
        stars: 5,
      },
      {
        name: 'Jigyasha Chaudhary',
        review: 'Step into a world of style and substance, where each purchase is a testament to your discerning taste. With a commitment to quality craftsmanship and the latest trends, our website is not just a marketplace; it is an invitation to upgrade your style quotient effortlessly. Elevate your look, elevate your life – shop with us today.',
        stars: 5,
      },
      {
        name: 'Aarti Shah',
        review: 'Discover a world of possibilities in every click. Our online store is more than just a shopping platform; its a celebration of your unique style. From runway trends to timeless classics, each piece is selected to resonate with your individuality. Unleash your fashion instincts – shop with us and make every outfit count.',
        stars: 5,
      },
      {
        name: 'Jigyasha Chaudhary',
        review: 'Welcome to a shopping destination where trends meet timeless elegance. With a commitment to quality, style, and a seamless experience, our website is not just a marketplace – it is your passport to a wardrobe that speaks volumes. Discover the joy of shopping intelligently; shop with us today.',
        stars: 5,
      },
      {
        name: 'Aarti Shah',
        review: 'Your style, your rules – that is the mantra of our online fashion destination. Explore a curated collection that transcends trends, offering pieces that resonate with your personality. Elevate your shopping experience with us, where each purchase is a step towards a more confident and stylish version of yourself.',
        stars: 5,
      },
      
  // Add more reviews here
];

const SliderPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,            // Auto-slide enabled
    autoplaySpeed: 3000, 
  };

  return (
    <div className="slider-page">
      {/* <h1>Customer Reviews</h1> */}
      <Slider {...settings}>
        {customerReviews.map((review, index) => (
          <div key={index} className="customer-review">
            <div className="stars">
              {Array.from({ length: review.stars }).map((_, index) => (
                <FontAwesomeIcon key={index} icon={faStar} className="star-icon" />
              ))}
            </div>
            <div className="review">{review.review}</div>
            <div className="name">- {review.name}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderPage;


