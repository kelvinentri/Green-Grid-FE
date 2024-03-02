import React, { useRef, useState } from "react";
import "./AddNewCourtBox.css";
import CustomInput from "../Common/CustomInput/CustomInput";
import  addIcon from '@assets/addicon.svg'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AxiosInstance from "../../Config/apicall";
import { ErrorToast, successToast } from "../../Plugins/Toast/Toast";
import { useNavigate } from "react-router-dom";

function AddNewCourtBox() {
    const [courtData,setCourtData]=useState({})
    const fileInputRef=useRef()
    const [selelctedFiles,setSelectedFiles]=useState([])
    const navigate=useNavigate()
    const handlechange=(e)=>{
setCourtData({...courtData,[e.target.name]:e.target.value})
    }
    const handleInputFileChange=(e)=>{
const files=Array.from(e.target.files)
const validFiles=files.filter((file)=>{return file.type.startsWith('image/')||file.type.startsWith('video/')
})

setSelectedFiles(prevState=>[...prevState,...validFiles])
    }
    const handleAddIconClick =()=>{
        fileInputRef.current.click()
    }
    const handleDescriptionChanage=(e)=>{
setCourtData({...courtData,description:e})
    }
    const handleCreateCourt=()=>{
        const formDatatoSend=new FormData()
        selelctedFiles.forEach((file)=>{
            formDatatoSend.append('files',file)
        })

        Object.entries(courtData).forEach(([key,value])=>{
            formDatatoSend.append(key,value)
        })
        AxiosInstance({
            url:'/admin/createnewcourt',
            method:'post',
            data:formDatatoSend,
            headers:{
                'Content-Type':'multipart/form-data'
            }

        }).then((res)=>{
        successToast('new court added successfully')
        navigate('/home')
        })
        .catch((err)=>{
            ErrorToast('something went wrong')
        })
    }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="d-flex justify-content-between gap-3 px-3 mt-3">
          <h3>Add New Court</h3>
          <span className="d-flex gap-3">
            <button className="common-button bg-black text-white">
              {" "}
              Cancel
            </button>
            <button className="common-button "  onClick={handleCreateCourt}> Create</button>
          </span>
        </div>

        <div className="col-lg-4  col-md-6 mt-3">
            <CustomInput type={'text'}   name={'name'} label={'Name'} value={courtData.name} onchange={handlechange}/>
        </div>
        <div className="col-lg-4 col-md-6 mt-3">
            <CustomInput type={"text"} value={courtData.location} label={"location"} name={'location'} onchange={handlechange} />
          </div>
          <div className="col-lg-4 col-md-6 mt-3">
            <CustomInput type={"text"} value={courtData.type} label={"type"} name={'type'} onchange={handlechange} />
          </div>
          <div className="col-lg-4 col-md-6 mt-3">
            <CustomInput type={"text"} value={courtData.address1} label={"address line  1"}  name={'address1'}onchange={handlechange} />
          </div>
          <div className="col-lg-4 col-md-6 mt-3">
            <CustomInput type={"text"} value={courtData.address2} label={"address line 2"}  name={'address2'} onchange={handlechange} />
          </div>
          <div className="col-lg-4 col-md-6 mt-3">
            <CustomInput type={"text"} value={courtData.address3} label={"address line 3"} name={'address3'} onchange={handlechange} />
          </div>
          <div className="col-lg-4 col-md-6 mt-3">
            <CustomInput type={"text"} value={courtData.landMark} label={"land mark"} name={'landMark'} onchange={handlechange} />
          </div>
          <div className="col-lg-4 col-md-6 mt-3">
            <CustomInput type={"number"} value={courtData.pin} label={"Pin code"} name={'pin'} onchange={handlechange} />
          </div>
          <div className="col-lg-4 col-md-6 mt-3">
            <CustomInput type={"number"} value={courtData.contactNumber} label={"contact number"} name={'contactNumber'} onchange={handlechange} />
          </div>

          <div className="mt-3 d-flex flex-wrap gap-2">

            {selelctedFiles.map((file,index)=>
            <>
            {file.type.startsWith('image/')&& <img  src={URL.createObjectURL(file)} height={150}/>}
            {file.type.startsWith('video/')&& <video  src={URL.createObjectURL(file)} height={150}/>}
            </>
            )}
            <div>
            <input
             type="file"
             ref={fileInputRef}
             onChange={handleInputFileChange}
             multiple
             accept="image/*, video/*"
             style={{display:'none'}}
             />
             <img src={addIcon} alt="" width={'150px'} height={'150px'} onClick={handleAddIconClick}/>
          </div>
          </div>
          <ReactQuill className=" my-3" style={{height:'300px'}} theme="snow" value={courtData.description} onChange={handleDescriptionChanage} />
      </div>
    </div>
  );
}

export default AddNewCourtBox;
