import { useState } from 'react'

import Login from './Components/Login'
import { Routes,Route
 } from 'react-router-dom'
import Signup from './Components/Signup'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
     <Route path="/" element = {<Login/>}/>
      <Route path="/signup" element = {<Signup/>}/>

     </Routes>
    </>
  )
}

export default App
