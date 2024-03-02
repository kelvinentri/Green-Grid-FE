import React from 'react'
import CusNavBar from '../../Components/Common/CusNavBar/CusNavBar'
import CourtListBody from '../../Components/CourtListBody/CourtListBody'

function CourtListPage() {
  return (
    <div className='d-flex flex-column vh-100 bg-body-secondary'>
<CusNavBar/>
<CourtListBody/>


    </div>
  )
}

export default CourtListPage