import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { styledDate } from "../assets/styledDate";
import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../components/UIElements/ErrorModal";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";

const Home = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let url = `${process.env.REACT_APP_API_URL}/users/${location.state}`;

    const getUser = async () => {
      try {
        const responseData = await sendRequest(url);
        setUser(responseData.user);
      } catch (err) {}
    };
    getUser();
  }, [sendRequest, location.state]);

  if (user !== null) {
    var lastBill = user.history[user.history.length - 1];
    var newdate = styledDate(lastBill.dateGenerated);
  } else newdate = "-";

  const navigate = useNavigate();
  const sendToGenerate = async () => {
    var prevReading;
    if (user.history.length <= 1) prevReading = 0;
    else prevReading = user.history[user.history.length - 2].Reading;
    navigate(lastBill.Status === "Paid" ? "/generate" : "/bill", {
      state: {
        name: user.name,
        lastBill: lastBill,
        prevReading: prevReading,
      },
    });
  };
  const showHistory = async () => {
    navigate("/history", { state: user });
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {user !== null && !isLoading && (
        <div className="home">
          <span className="my-badge">Hello,{user.name}</span>

          <div className="bill">
            <p className="lead">Last bill details</p>
            <table className="table">
              {/* <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead> */}
              <tbody>
                <tr>
                  <th scope="row">Bill date</th>
                  <td>{newdate}</td>
                </tr>
                <tr>
                  <th scope="row">Reading</th>
                  <td>{lastBill.Reading}</td>
                </tr>
                <tr>
                  <th scope="row">Bill Amount</th>
                  <td>{lastBill.Amount}</td>
                </tr>
                <tr>
                  <th scope="row">Bill Status</th>
                  <td className={lastBill.Status}>{lastBill.Status}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button
            type="button"
            className="w-100 btn btn-lg btn-primary"
            onClick={sendToGenerate}
            disabled={lastBill.Status === "Processing" ? true : false}
          >
            {lastBill.Status === "Paid"
              ? "Generate new bill"
              : lastBill.Status === "Due"
              ? "View Bill"
              : "Please Wait while bill is processing"}
          </button>
          <button
            type="button"
            className="btn btn-outline-info"
            onClick={showHistory}
          >
            Payment History
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
