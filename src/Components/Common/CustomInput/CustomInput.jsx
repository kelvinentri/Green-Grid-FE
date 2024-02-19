import React from 'react'
import './CustomInput.css'

function CustomInput({type,value,onblur,onchange,label, name}) {
  return (
    <div className='common-input-box'>
   
<input type={type}  required className='common-input' name={name} value={value} onChange={onchange} onBlur={onblur}/>
<label htmlFor="">{label}</label>
    </div>
  )
}

export default CustomInput