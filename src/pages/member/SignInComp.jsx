import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../utils/supabase';
import { toast } from 'react-toastify';

function SignInComp() {
  const [formData, setFormData] = useState({
    useremail: '',
    userpwd: '',
    userpwd1: '',
  });

  const [errorM, setErrorM] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const eventHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // setFormData((prev) => {
    //   return {
    //     ...prev,
    //     [name]: value,
    //   };
    // });
  };

  const vaildatation = () => {
    if (formData.userpwd.length < 6) {
      return '비밀번호는 6자 이상이여야합니다';
    }
    if (formData.userpwd1.length < 6) {
      return '비밀번호 확인도6자 이상이여야합니다';
    }
    if (formData.userpwd != formData.userpwd1) {
      //   alert('비밀번호틀려');
      return '비밀번호가 일치하지 않습니다';
    }
    return '';
  };
  const confirmHandler = async (e) => {
    e.preventDefault();

    const message = vaildatation();
    if (message) {
      // setErrorM(message);
      toast(message);
      return;
    } else {
      setErrorM('');
    }
    // alert('회원가입');

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: formData.useremail,
      password: formData.userpwd,
    });

    if (!error) {
      toast('회원가입완료');
      setLoading(false);
    } else {
      toast('가입실패!!');
      setLoading(false);
    }
  };
  return (
    <div
      className=" rounded shadow p-4"
      style={{ width: '80%', maxWidth: '400px' }}
    >
      <h3>회원가입</h3>
      <hr />
      <div>{errorM}</div>
      <div>
        <form onSubmit={confirmHandler}>
          <div>
            <label htmlFor="email" className="label-control my-2">
              이메일{formData.useremail}
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="이메일을 입력하세요"
              name="useremail"
              onChange={eventHandler}
              required
              disabled={loading}
            />
            <label htmlFor="pwd" className="label-control my-2">
              비밀번호{formData.userpwd}
            </label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              placeholder="비밀번호입력"
              name="userpwd"
              onChange={eventHandler}
              required
              disabled={loading}
            />
            <label htmlFor="pwd1" className="label-control my-2">
              비밀번호확인{formData.userpwd1}
            </label>
            <input
              type="password"
              className="form-control"
              id="pwd1"
              placeholder="비밀번호입력"
              name="userpwd1"
              onChange={eventHandler}
              disabled={loading}
            />
          </div>
          <div className="py-3 d-flex justify-content-between">
            <div>
              <Link to="/member/signin" className="nav-link">
                로그인
              </Link>
            </div>
            <button className="btn btn-primary">회원가입</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInComp;
