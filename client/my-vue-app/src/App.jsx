import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Allroutes from './Allroutes'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate=useNavigate()
  const [count, setCount] = useState(0)

  return (
    <div  >

    
      <Allroutes/>
    </div>
  )
}

export default App
