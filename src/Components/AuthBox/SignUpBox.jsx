import React, { useState } from 'react'
import './LoginBox.css'
import CustomInput from '../Common/CustomInput/CustomInput'
import { ErrorToast, successToast } from '../../Plugins/Toast/Toast'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { showorhideLoader } from '../../redux/generalSlice'

function SignUpBox({setBoxType}) {
  const [signupData,setSignupData]=useState({})
  const {showLoader} =useSelector((store=>store.general))
  const dispatch=useDispatch()
const handleChange=(e)=>{
  setSignupData({...signupData,[e.target.name]:e.target.value})
}
const doSignup=()=>{
dispatch(showorhideLoader(true))
  if(signupData.password===signupData.confirmPassword){

axios({
  method:'POST',
  url:process.env.REACT_APP_BASE_URL+'/auth/dosignup',
  data:signupData
}).then((res)=>{
  successToast(res.message)
  setBoxType('login')
  dispatch(showorhideLoader(false))
})
.catch((err)=>{
  dispatch(showorhideLoader(false))
  ErrorToast(err?.response?.data.message || 'something went wrong')
})
  }else{
    ErrorToast('passwords are not matching')

  }
  

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
      <CustomInput type={'email'} label={"Email"} name={'email'} value={signupData.email} onchange={handleChange}/>
    </div>
    <div className=" mt-4">
      <CustomInput type={'number'} label={"Mobile Number"} name={'mobileNumber'} value={signupData.mobileNumber} onchange={handleChange} />
    </div>
    <div className=" mt-4">
      <CustomInput type={'password'} label={"Password"} name={'password'} value={signupData.passowrd} onchange={handleChange}/>
    </div>
    <div className=" mt-4">
      <CustomInput type={'password'} label={"Confirm Password"} name={'confirmPassword'} value={signupData.confirmPassword} onchange={handleChange} />
    </div>
    <button className="common-button mt-4 align-self-center " onClick={doSignup}> Sign up</button>
    <p className="already-account mt-4" >already  have an account <i onClick={()=>setBoxType('login')}>login here </i></p>
  </div>
  )
}

export default SignUpBox