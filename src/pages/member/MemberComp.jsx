import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import SignInComp from './SignInComp';
import SignUpComp from './SignUpComp';

function MemberComp() {
  return (
    <div className="container" style={{ minHeight: '500px' }}>
      <h3>회원</h3>

      <div className="d-flex gap-3">
        <Link to="/member/signin" className="nav-link">
          로그인
        </Link>
        <Link to="/member/signup" className="nav-link">
          회원가입
        </Link>
      </div>

      <div
        style={{ height: '500px' }}
        className="d-flex justify-content-center align-items-center"
      >
        <Routes>
          <Route index element={<SignInComp />} />
          <Route path="signin" element={<SignInComp />} />
          <Route path="signup" element={<SignUpComp />} />
        </Routes>
      </div>
    </div>
  );
}

export default MemberComp;
