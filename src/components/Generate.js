import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../contexts/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../components/UIElements/ErrorModal";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";

const Generate = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const location = useLocation();
  const user = location.state;

  const [currentReading, setCurrentReading] = useState(user.lastBill.Reading);
  const handleChange = (event) => {
    setCurrentReading(event.target.value);
  };

  const navigate = useNavigate();
  const showBill = async (event) => {
    event.preventDefault();
    if (auth.isLoggedIn) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/users/new/${auth.userId}`,
          "PATCH",
          JSON.stringify({
            currentReading: currentReading,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        console.log(responseData);
        navigate("/bill", {
          state: {
            name: user.name,
            lastBill: responseData.newBill,
            prevReading: user.lastBill.Reading,
          },
        });
      } catch (err) {}
    } else navigate("/");
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="generate">
        <span className="my-badge">Generate New Bill</span>
        <figcaption className="blockquote-footer">
          Some Instructions<cite title="Source Title"> Detailed Steps </cite>
        </figcaption>
        <form onSubmit={(event) => showBill(event)}>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Previous reading
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="0"
              value={user.lastBill.Reading}
              aria-label="Username"
              aria-describedby="basic-addon1"
              readOnly={true}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Current reading
            </span>
            <input
              type="number"
              className="form-control"
              placeholder={user.lastBill.Reading}
              aria-label="Username"
              aria-describedby="basic-addon1"
              min={user.lastBill.Reading + 1}
              max={user.lastBill.Reading + 500}
              onChange={handleChange}
              required={true}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Generate
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Generate;
