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
            className="btn btn-outline-success me-2"
            type="button"
            onClick={() => {
              if (auth.userId === null) navigate("/");
              else if (auth.userId === process.env.REACT_APP_ADMIN_ID) {
                navigate("/adminHome");
              } else navigate("/home", { state: auth.userId });
            }}
          >
            Home
          </button>
          <button
            className="btn btn-primary "
            type="button"
            onClick={() => {
              auth.logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        </nav>
      ) : (
        <nav>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              navigate("/");
            }}
          >
            Login
          </button>
        </nav>
      )}
    </React.Fragment>
  );
};

export default Navbar;
