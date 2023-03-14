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
          `${process.env.REACT_APP_API_URL}/users/new/${user.userId}`,
          "PATCH",
          JSON.stringify({
            currentReading: currentReading,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        navigate("/bill", {
          state: {
            userId: user.userId,
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
        <h2>Generate</h2>
        <figcaption className="info">
          Enter current meter reading
        </figcaption>
        <form onSubmit={(event) => showBill(event)} className="generate-form">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="input">
            <div className="label">Previous reading</div>
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
          <div className="input">
            <div className="label">Current reading</div>
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
          <button className="primary-btn" type="submit">
            Generate
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Generate;
