import React from 'react';
import Home from './pages/Home/home';
import { Routes, Route } from 'react-router';
import logo from "../image/kendesoft-logo.png"
import ClockIn from './components/clockIn/clock-in';
import ClockOut from './components/clockOut/clock-out';
import RegisterNewUser from './components/register/register';

const App: React.FC = () => {

  return (
    <>
    <div className='flex flex-col items-center gap-6'>
      <img src={logo} alt="Kendesoft Logo" className='w-100 h-50' />
    </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/clock-in' element={<ClockIn />} />
        <Route path='/clock-out' element={<ClockOut />} />
        <Route path='/register' element={<RegisterNewUser />} />
      </Routes>
    </>
  )
}

export default App



