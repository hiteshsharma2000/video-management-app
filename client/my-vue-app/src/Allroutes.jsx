import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Sign from './components/Sign'
import Login from './components/Login'
import Upload from './components/Upload'
import Videos from './components/Videos'

const Allroutes = () => {
  const navigate=useNavigate()
  return (
    <div>
        <Routes>
            <Route path='/' element={  <div style={{display:"flex",flexDirection:"column",gap:"25px",padding:"20%"}}>
        <button onClick={()=>{navigate('/register')}}>create account</button>
        <button onClick={()=>{navigate('/login')}}>Login account</button>
      </div>} />
            <Route path='/register' element={<Sign/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/video/upload' element={<Upload/>} />
            <Route path='/videos' element={<Videos/>} />

        </Routes>

    </div>
  )
}

export default Allroutes