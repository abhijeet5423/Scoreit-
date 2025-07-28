import { useState } from 'react'

import Login from './Components/Login'
import { Routes,Route
 } from 'react-router-dom'
import Signup from './Components/Signup'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Contact from './Components/Contact'
import About from './Components/About'
import Matchsetup from'./Components/Matchsetup'
import Teamsetup from './Components/Teamsetup'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/matches" element={<Matches />} />
        <Route path="/teams" element={<Teams />} />*/}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> 
         <Route path="/matchsetup" element={<Matchsetup />} /> 
          <Route path="/teamsetup" element={<Teamsetup />} /> 

      </Routes>
      <Footer />
    </>
  )
}

export default App
