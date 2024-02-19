import React, { useState } from 'react'
import './LoginBox.css'
import CustomInput from '../Common/CustomInput/CustomInput'

function SignUpBox({setBoxType}) {
  const [signupData,setSignupData]=useState({})
const handleChange=(e)=>{
  setSignupData({...signupData,[e.target.name]:e.target.value})
}
const doSignup=()=>{
  
}
  return (
    <div className="d-flex flex-column">
    <div className="mt-4">
      <CustomInput label={"First name"} name={'firstName'} value={signupData.firstName}  onchange={handleChange}/>
    </div>
    <div className="mt-4">
      <CustomInput label={"Last Name"} name={'lastName'} value={signupData.lastName} onchange={handleChange} />
    </div>

    <div className=" mt-4">
      <CustomInput label={"Email"} name={'email'} value={signupData.email} onchange={handleChange}/>
    </div>
    <div className=" mt-4">
      <CustomInput label={"Mobile Number"} name={'mobileNumber'} value={signupData.mobileNumber} onchange={handleChange} />
    </div>
    <div className=" mt-4">
      <CustomInput label={"Password"} name={'passowrd'} value={signupData.passowrd} onchange={handleChange}/>
    </div>
    <div className=" mt-4">
      <CustomInput label={"Confirm Password"} name={'confirmPassword'} value={signupData.confirmPassword} onchange={handleChange} />
    </div>
    <button className="common-button mt-4 align-self-center " onClick={doSignup}> Sign up</button>
    <p className="already-account mt-4" >already  have an account <i onClick={()=>setBoxType('login')}>login here </i></p>
  </div>
  )
}

export default SignUpBox