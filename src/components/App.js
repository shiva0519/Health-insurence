import React from 'react'
import Loginpage from './Loginpage'
import Registration from './Registration'
import PolicyDetails from './PolicyDetails';
import Quotationpage from './Quotationpage';
import CheckDetails from './CheckDetails';
import Payment from './Payment';
import Healthinsurence from './Healthinsurence';
import Profile from "./Profile";


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>

      <Router>
        <Routes>
          <Route exact path='/' element={<Loginpage/>}></Route>
          <Route path='/Registration' element={<Registration/>}></Route>
          <Route path='/PolicyDetails' element={<PolicyDetails/>}></Route>
          <Route path='/Quotationpage' element={<Quotationpage/>}></Route>
          <Route path='/CheckDetails' element={< CheckDetails/>}></Route>
          <Route path='/Payment' element={< Payment/>}></Route>
          <Route path='/Healthinsurence' element={< Healthinsurence/>}></Route>
          <Route path='/Profile' element={<Profile/>}></Route>
        </Routes>
      </Router>

    </div>
  )
}

export default App
