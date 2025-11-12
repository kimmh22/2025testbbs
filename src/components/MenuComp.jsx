import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function MenuComp() {
  const { user, signOut } = useUser();
  return (
    <div>
      <>
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
            {/* <li className="d-flex align-items-center">
            <NavLink to="/member" className="nav-link">
              member
            </NavLink>
          </li> */}

            {user && (
              <>
                <li className="d-flex align-items-center gap-3">
                  <span>{user?.name} 님 안녕하세요!!!</span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={async () => {
                      await signOut();
                    }}
                  >
                    로그아웃
                  </button>
                </li>
              </>
            )}
            {!user && (
              <>
                <li className="d-flex align-items-center">
                  <Link className="nav-link" to="/member/signin">
                    로그인
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </>
    </div>
  );
}

export default MenuComp;
