import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../components/UIElements/ErrorModal";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";
import logo from "../assets/logo.jpg";

const Login = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const handleChange = (event) => {
    var { name, value } = event.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };
  const navigate = useNavigate();
  const authSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_API_URL + "/users/login",
        "POST",
        JSON.stringify(user),
        { "Content-Type": "application/json" }
      );
      console.log(responseData);
      auth.login(responseData.userId, responseData.token);
      if (responseData.userId === process.env.REACT_APP_ADMIN_ID)
        navigate("/adminHome");
      else navigate("/home", { state: responseData.userId });
    } catch (err) {
      console.log(err);

      setUser({
        name: "",
        password: "",
      });
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="form-signin w-100 m-auto">
        {isLoading && <LoadingSpinner asOverlay />}
        <form onSubmit={authSubmitHandler}>
          <img className="mb-4" src={logo} alt="" width="72" height="72" />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name="name"
              onChange={handleChange}
              value={user.name}
              placeholder="name"
              required={true}
            />
            <label htmlFor="floatingInput">Name</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              name="password"
              onChange={handleChange}
              value={user.password}
              placeholder="Password"
              minLength="6"
              required={true}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          {/* <input type="datetime-local" value="2017-06-13T13:00" /> */}
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">© Mohit 2022</p>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
