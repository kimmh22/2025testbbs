import React from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import HomeComp from './pages/home/HomeComp';
import AboutComp from './pages/about/AboutComp';
import BoardComp from './pages/board/BoardComp';

function App() {
  return (
    <BrowserRouter>
      <div className="container d-flex justify-content-between">
        <h1>
          <Link to="/" className="nav-link">
            LOGO
          </Link>
        </h1>
        <ul className="d-flex gap-3 menu">
          <li className="d-flex align-items-center">
            {/* <Link to="/" className="nav-link">
              home
            </Link> */}
            <NavLink to="/" className="nav-link">
              home
            </NavLink>
          </li>
          <li className="d-flex align-items-center">
            <NavLink to="/about" className="nav-link">
              about
            </NavLink>
          </li>
          <li className="d-flex align-items-center">
            <NavLink to="/board" className="nav-link">
              board
            </NavLink>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<HomeComp />}></Route>
        <Route path="/about/*" element={<AboutComp />}></Route>
        <Route path="/board/*" element={<BoardComp />}></Route>
      </Routes>
      <div className="container-fluid py-5 mt-5" style={{ background: '#ddd' }}>
        <div className="container">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
          ratione?
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
