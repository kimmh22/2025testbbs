import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '../../context/UserContext';

function SignInComp() {
  const { loading, setLoading, signIn } = useUser();
  const [formData, setFormData] = useState({
    useremail: '',
    userpwd: '',
  });

  const [errorM, setErrorM] = useState('');

  const navigate = useNavigate();

  const eventHandler = (e) => {
    const { name, value } = e.target;
    // setFormData((prev) => ({ ...prev, [name]: value }));
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const vaildatation = () => {
    if (formData.userpwd.length < 6) {
      return '🦄비밀번호는 6자 이상이어야 합니다.';
    }

    return '';
  };

  const confirmHandler = async (e) => {
    e.preventDefault();

    const message = vaildatation();

    if (message) {
      //   setErrorM(message);
      toast(message);

      return;
    } else {
      setErrorM('');
    }
    //alret ('회원가입');
    // setLoading(true);

    // 회원로그인
    const { error } = await signIn(formData.useremail, formData.userpwd);

    if (!error) {
      toast('로그인완료');
      navigate('/');
      setLoading(false);
    } else {
      toast('🦄비밀번호오류');
      setLoading(false);
    }
  };

  return (
    <div
      className=" rounded shadow p-4"
      style={{ width: '80%', maxWidth: '400px' }}
    >
      <h4>로그인</h4>
      <hr />
      <div>{errorM}</div>
      <div>
        <form onSubmit={confirmHandler}>
          <div>
            <label htmlFor="email" className="label-control my-2">
              이메일 {formData.useremail}
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="이메일을 입력하세요"
              name="useremail"
              onChange={eventHandler}
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="pwd" className="label-control my-2">
              비밀번호 {formData.userpwd}
            </label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              placeholder="비밀번호 입력(6자 이상)"
              name="userpwd"
              onChange={eventHandler}
              disabled={loading}
            />
          </div>

          <div className="py-3 d-flex justify-content-between">
            <div>
              <Link to="/member/signup" className="nav-link">
                회원가입
              </Link>
            </div>
            <button className="btn btn-primary" disabled={loading}>
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInComp;
