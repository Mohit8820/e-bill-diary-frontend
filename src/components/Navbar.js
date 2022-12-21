import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/auth-context";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <React.Fragment>
      {auth.isLoggedIn ? (
        <nav>
          <button
            className="nav-btn"
            type="button"
            onClick={() => {
              if (auth.userId === null) navigate("/");
              else if (auth.userId === process.env.REACT_APP_ADMIN_ID) {
                navigate("/adminHome");
              } else navigate("/home", { state: auth.userId });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.8rem"
              height="1.8rem"
              viewBox="0 0 19 19"
              fill="none"
            >
              <path
                d="M9.33333 14.3105V11.8105M6.85 1.68549L2.35833 5.18549C1.60833 5.76882 1 7.01049 1 7.95215V14.1272C1 16.0605 2.575 17.6438 4.50833 17.6438H14.1583C16.0917 17.6438 17.6667 16.0605 17.6667 14.1355V8.06882C17.6667 7.06049 16.9917 5.76882 16.1667 5.19382L11.0167 1.58549C9.85 0.76882 7.975 0.810487 6.85 1.68549Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <button
            className="nav-btn"
            type="button"
            onClick={() => {
              auth.logout();
              navigate("/");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.9rem"
              height="1.9rem"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M21 11.9009C20.8248 13.7963 20.1135 15.6025 18.9493 17.1084C17.785 18.6142 16.216 19.7573 14.4257 20.404C12.6355 21.0506 10.6981 21.174 8.84032 20.7598C6.98251 20.3455 5.28109 19.4108 3.93516 18.0648C2.58923 16.7189 1.65445 15.0175 1.2402 13.1597C0.825954 11.3019 0.949372 9.3645 1.59601 7.57428C2.24266 5.78405 3.38578 4.215 4.89162 3.05074C6.39746 1.88648 8.20374 1.17516 10.0991 1C8.98942 2.50126 8.45544 4.35094 8.59427 6.21263C8.7331 8.07432 9.53553 9.82434 10.8556 11.1444C12.1757 12.4645 13.9257 13.2669 15.7874 13.4057C17.6491 13.5446 19.4987 13.0106 21 11.9009V11.9009Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <button
            className="nav-btn"
            type="button"
            onClick={() => {
              auth.logout();
              navigate("/");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.9rem"
              height="1.9rem"
              viewBox="0 0 18 20"
              fill="none"
            >
              <path
                d="M14.4642 5.06592C15.5669 6.16899 16.3178 7.57425 16.6219 9.10404C16.926 10.6338 16.7697 12.2194 16.1727 13.6604C15.5757 15.1013 14.5648 16.3329 13.2679 17.1994C11.971 18.0659 10.4463 18.5283 8.88663 18.5283C7.32691 18.5283 5.80221 18.0659 4.50532 17.1994C3.20843 16.3329 2.19758 15.1013 1.60058 13.6604C1.00359 12.2194 0.847256 10.6338 1.15135 9.10404C1.45545 7.57425 2.20633 6.16899 3.30903 5.06592"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.89087 1V9.76293"
                stroke="#737373"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </nav>
      ) : (
        <nav>
          <button
            className="nav-btn"
            type="button"
            onClick={() => {
              navigate("/");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.9rem"
              height="1.9rem"
              viewBox="0 0 18 20"
              fill="none"
            >
              <path
                d="M14.4642 5.06592C15.5669 6.16899 16.3178 7.57425 16.6219 9.10404C16.926 10.6338 16.7697 12.2194 16.1727 13.6604C15.5757 15.1013 14.5648 16.3329 13.2679 17.1994C11.971 18.0659 10.4463 18.5283 8.88663 18.5283C7.32691 18.5283 5.80221 18.0659 4.50532 17.1994C3.20843 16.3329 2.19758 15.1013 1.60058 13.6604C1.00359 12.2194 0.847256 10.6338 1.15135 9.10404C1.45545 7.57425 2.20633 6.16899 3.30903 5.06592"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.89087 1V9.76293"
                stroke="#737373"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </nav>
      )}
    </React.Fragment>
  );
};

export default Navbar;
