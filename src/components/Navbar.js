import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/auth-context";
var r = document.querySelector(":root");

function toggleLight() {
  r.style.setProperty("--text-color", "#404040");
  r.style.setProperty("--bg", "#f5f5f5");
  r.style.setProperty("--sec-color", "#737373");
  r.style.setProperty("--sec-color-02", "#73737320");
  r.style.setProperty("--light-bg", " rgba(255, 255, 255, 0.7)");
  r.style.setProperty("--faded-bg-1", " rgb(255 255 255 / 50%)");
  r.style.setProperty("--faded-bg-2", " rgb(255 255 255 / 30%)");
  r.style.setProperty("--backdrop-bg", "#ffffff70");
  r.style.setProperty("--ball-bg", "rgba(254, 254, 254, 0.5)");
}

function toggleDark() {
  r.style.setProperty("--text-color", "#F3F4F6");
  r.style.setProperty("--bg", "#2B2B2B");
  r.style.setProperty("--sec-color", "#e5e5e5");
  r.style.setProperty("--sec-color-02", "#e5e5e520");
  r.style.setProperty("--light-bg", " rgba(255, 255, 255, 0.3)");
  r.style.setProperty("--faded-bg-1", " rgb(255 255 255 / 30%)");
  r.style.setProperty("--faded-bg-2", " rgb(255 255 255 / 5%)");
  r.style.setProperty("--backdrop-bg", "#00000070");
  r.style.setProperty("--ball-bg", "rgba(0, 0, 0, 0.2)");
}

const Navbar = () => {
  const auth = useContext(AuthContext);

  const [light, setLight] = useState(true);
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
            className="nav-btn display-mode"
            type="button"
            onClick={() => {
              var rs = getComputedStyle(r);
              // Alert the value of the --blue variable
              if (rs.getPropertyValue("--bg") === "#2B2B2B") {
                setLight(true);
                toggleLight();
              } else {
                setLight(false);
                toggleDark();
              }
            }}
          >
            {light ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.9rem"
                height="1.9rem"
                viewBox="0 0 22 22"
                fill="none"
                className="dark"
              >
                <path
                  d="M21 11.9009C20.8248 13.7963 20.1135 15.6025 18.9493 17.1084C17.785 18.6142 16.216 19.7573 14.4257 20.404C12.6355 21.0506 10.6981 21.174 8.84032 20.7598C6.98251 20.3455 5.28109 19.4108 3.93516 18.0648C2.58923 16.7189 1.65445 15.0175 1.2402 13.1597C0.825954 11.3019 0.949372 9.3645 1.59601 7.57428C2.24266 5.78405 3.38578 4.215 4.89162 3.05074C6.39746 1.88648 8.20374 1.17516 10.0991 1C8.98942 2.50126 8.45544 4.35094 8.59427 6.21263C8.7331 8.07432 9.53553 9.82434 10.8556 11.1444C12.1757 12.4645 13.9257 13.2669 15.7874 13.4057C17.6491 13.5446 19.4987 13.0106 21 11.9009V11.9009Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 20 20"
                fill="none"
                className="light"
              >
                <path
                  d="M10.4749 14.1804C12.6087 14.1804 14.3385 12.4506 14.3385 10.3168C14.3385 8.18294 12.6087 6.45313 10.4749 6.45313C8.34106 6.45313 6.61125 8.18294 6.61125 10.3168C6.61125 12.4506 8.34106 14.1804 10.4749 14.1804Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.4749 1.81676V3.36222"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.4749 17.2713V18.8168"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.46306 4.30494L5.56033 5.40222"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.3894 15.2313L16.4867 16.3286"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.97488 10.3168H3.52034"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.4294 10.3168H18.9749"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.46306 16.3286L5.56033 15.2313"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.3894 5.40222L16.4867 4.30494"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
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
                stroke="currentColor"
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
            className="nav-btn display-mode"
            type="button"
            onClick={() => {
              var rs = getComputedStyle(r);
              // Alert the value of the --blue variable
              if (rs.getPropertyValue("--bg") === "#2B2B2B") {
                setLight(true);
                toggleLight();
              } else {
                setLight(false);
                toggleDark();
              }
            }}
          >
            {light ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.9rem"
                height="1.9rem"
                viewBox="0 0 22 22"
                fill="none"
                className="dark"
              >
                <path
                  d="M21 11.9009C20.8248 13.7963 20.1135 15.6025 18.9493 17.1084C17.785 18.6142 16.216 19.7573 14.4257 20.404C12.6355 21.0506 10.6981 21.174 8.84032 20.7598C6.98251 20.3455 5.28109 19.4108 3.93516 18.0648C2.58923 16.7189 1.65445 15.0175 1.2402 13.1597C0.825954 11.3019 0.949372 9.3645 1.59601 7.57428C2.24266 5.78405 3.38578 4.215 4.89162 3.05074C6.39746 1.88648 8.20374 1.17516 10.0991 1C8.98942 2.50126 8.45544 4.35094 8.59427 6.21263C8.7331 8.07432 9.53553 9.82434 10.8556 11.1444C12.1757 12.4645 13.9257 13.2669 15.7874 13.4057C17.6491 13.5446 19.4987 13.0106 21 11.9009V11.9009Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 20 20"
                fill="none"
                className="light"
              >
                <path
                  d="M10.4749 14.1804C12.6087 14.1804 14.3385 12.4506 14.3385 10.3168C14.3385 8.18294 12.6087 6.45313 10.4749 6.45313C8.34106 6.45313 6.61125 8.18294 6.61125 10.3168C6.61125 12.4506 8.34106 14.1804 10.4749 14.1804Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.4749 1.81676V3.36222"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.4749 17.2713V18.8168"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.46306 4.30494L5.56033 5.40222"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.3894 15.2313L16.4867 16.3286"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.97488 10.3168H3.52034"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.4294 10.3168H18.9749"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.46306 16.3286L5.56033 15.2313"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.3894 5.40222L16.4867 4.30494"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
          </button>
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
                stroke="currentColor"
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
