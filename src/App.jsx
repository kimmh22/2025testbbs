import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomeComp from './pages/home/HomeComp';
import AboutComp from './pages/about/AboutComp';
import BoardComp from './pages/board/BoardComp';
import MemberComp from './pages/member/MemberComp';
import { ToastContainer } from 'react-toastify';
import { useUser } from './context/UserContext';
import MenuComp from './components/MenuComp';

function App() {
  const { user } = useUser();

  return (
    <BrowserRouter>
      <MenuComp />
      <Routes>
        <Route path="/" element={<HomeComp />}></Route>
        <Route path="/about/*" element={<AboutComp />}></Route>
        <Route path="/board/*" element={<BoardComp />}></Route>
        <Route path="/member/*" element={<MemberComp />}></Route>
      </Routes>
      <div className="container-fluid py-5 mt-5" style={{ background: '#ddd' }}>
        <div className="container">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
          ratione?
        </div>
      </div>
      {JSON.stringify(user)}
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
