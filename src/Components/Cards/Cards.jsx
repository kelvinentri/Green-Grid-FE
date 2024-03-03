import React from 'react'
import './Cards.css'
import { useNavigate } from 'react-router-dom'

function Cards({court}) {
    const naviagte=useNavigate()
  return (
    <div className='card' onClick={()=>naviagte('/courts/courtdetails/'+court._id)} >

<img src={`${process.env.REACT_APP_BASE_URL}/assets/${court?.courtPics?.[0]?.name}`} alt="" />
<div className='card-content'>
<h2>
   {court.name}
</h2>
<p>
    {court.location}<br />
  {court.type}
</p>
</div>
    </div>
  )
}

export default Cards