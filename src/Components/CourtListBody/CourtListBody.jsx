import React,{useEffect,useState} from 'react'
import Cards from '../Cards/Cards'
import AxiosInstance from '../../Config/apicall'
import { ErrorToast } from '../../Plugins/Toast/Toast'

function CourtListBody() {
  const [courtData,setCourtData]=useState([])
  useEffect(()=>{
    getAllCourtData()
  },[])

  const getAllCourtData =()=>{
    AxiosInstance.get('/users/getallcourtdata').then((resp)=>{
      setCourtData(resp.data)

    })
    .catch((err)=>{
console.log(err);
ErrorToast('some thing wrong')
    })
  }
  return (
    <div className="court_list_body flex-flex-grow-1 d-flex flex-wrap justify-content-center  overflow-y-auto  gap-3 p-3">

{courtData.map((court)=><Cards court={court}/>)}

    </div>
  )
}

export default CourtListBody