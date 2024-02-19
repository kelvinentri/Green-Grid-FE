import React from 'react'
import  './Home.css'
import CusNavBar from '../../Components/Common/CusNavBar/CusNavBar'
import CustomCarousal from '../../Components/CustomCarousal/CustomCarousal'
import Blocks from '../../Components/Blocks/Blocks'
import UspBlocks from '../../Components/UspBlocks/UspBlocks'

function Home() {
  return (
    <div>
<CusNavBar/>
<CustomCarousal/>
<Blocks/>
<UspBlocks/>

    </div>
  )
}

export default Home