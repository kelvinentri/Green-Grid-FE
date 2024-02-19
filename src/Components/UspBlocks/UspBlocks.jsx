import React from 'react'
import './UspBlocks.css'
import users from '@assets/users-2-svgrepo-com.svg'
import location from '@assets/locations-svgrepo-com.svg'
import support from '@assets/locations-svgrepo-com.svg'

function UspBlocks() {
  return (
    <div className="d-flex flex-wrap justify-content-center mt-3 brand-promo-container gap-3 ">
    <div className="brand-promo-box text-center">
     
      <h4>10000+</h4>
      <p>Happy Customers </p>
      <img src={users}  height="40px" alt="" />
    </div>
    <div className="brand-promo-box text-center">
      <h4>100+ locations </h4>
      <p> 20+ states in India </p>
      <img src={location}  height="40px" alt="" />
    </div>
    <div className="brand-promo-box text-center">
      <h4>24/7 access</h4>
      <p>choose favorite slots  </p>
      <img src={support}  height="40px" alt="" />
    </div>
    <div className="brand-promo-box text-center">
      <h4>welcome Offers </h4>
      <p>get free acess to all courts  </p>
      
      <img src={support}  height="40px" alt="" />
    </div>
    <div className="brand-promo-box text-center">
      <h4>rented accessories</h4>
      <p>rented accessories </p>
      <img src={support}  height="40px" alt="" />
    </div>
  </div>
  )
}

export default UspBlocks