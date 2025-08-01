import { useState } from 'react'
import './App.css' ;
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
import Scoring from './Components/Match';
import InningSummary from './Components/InningSummary'
import TeamManage from './Components/TeamManage';
import Matches from './Components/Matches';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/matches" element={<Matches />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> 
         <Route path="/matchsetup" element={<Matchsetup />} /> 
          <Route path="/teamsetup" element={<Teamsetup />} /> 
          <Route path="/scoring" element={<Scoring />} /> 
          <Route path="/inningSummary" element={<InningSummary />} /> 
           <Route path="/inningSummary" element={<InningSummary />} /> 
        <Route path="/teammanage" element={<TeamManage />} />

      </Routes>
      <Footer />
    </>
  )
}

export default App
