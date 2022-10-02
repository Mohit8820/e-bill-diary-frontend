import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/auth-context";

const Thanks = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const goHome = async () => {
    if (auth.userId === null) navigate("/");
    else if (auth.userId === process.env.REACT_APP_ADMIN_ID) {
      navigate("/adminHome");
    } else navigate("/home", { state: auth.userId });
  };

  return (
    <div className="home">
      <span className="my-badge">Thank You</span>
      <p className="lead">Your payment will be reviewed and updated soon...</p>
      <button type="button" className="btn btn-lg btn-primary" onClick={goHome}>
        Go Home
      </button>
    </div>
  );
};

export default Thanks;
