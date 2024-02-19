import React from 'react'
import './Loader.css'
import LoaderGif from '../../../assets/football-player.gif'

function Loader() {
  return (
  <div className="loader-container">
    <div className='position-relative spinner-container'>
    <img src={LoaderGif} height={'30px'} alt="" />
    </div>
    <div className="spinner"></div>
  </div>
  )
}

export default Loader