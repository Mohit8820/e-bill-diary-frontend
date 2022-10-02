import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../contexts/auth-context";
import { styledDate } from "../assets/styledDate";
import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../components/UIElements/ErrorModal";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";

const History = () => {
  const auth = useContext(AuthContext);

  const location = useLocation();

  const [user, setUser] = useState(location.state);

  var billDate = [];
  user.history.forEach((bill) => {
    var newdate = styledDate(bill.dateGenerated);
    billDate.push(newdate);
  });

  const navigate = useNavigate();
  const sendToHome = async () => {
    navigate("/home", { state: user.id });
  };
  const print = async () => {
    window.print();
    // document.body.innerHTML = backup;
  };

  const openBill = (index) => {
    console.log(index);
    var prevReading;
    if (index <= 0) prevReading = 0;
    else prevReading = user.history[index - 1].Reading;
    navigate("/bill", {
      state: {
        name: user.name,
        lastBill: user.history[index],
        prevReading: prevReading,
      },
    });
  };

  return (
    <div className="home">
      <span className="my-badge">Your Bill History</span>

      <div className="bill">
        <p className="lead" id="lead">
          Name : <strong>{user.name}</strong>
        </p>
        <table className="table table-striped">
          <thead id="bill">
            <tr>
              <th scope="col">Bill Date</th>
              <th scope="col">Reading</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col">Note</th>
            </tr>
          </thead>
          <tbody>
            {user.history
              .slice(0)
              .reverse()
              .map((bill, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>{billDate[user.history.length - 1 - index]}</td>
                    <td>{bill.Reading}</td>
                    <td>{bill.Amount}</td>
                    <td className={bill.Status}>{bill.Status}</td>
                    <td>{bill.Note}</td>
                    <button
                      onClick={() => openBill(user.history.length - 1 - index)}
                    >
                      view
                    </button>
                  </tr>
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
      <div className="btn-flex">
        <style>{`@media print {.btn-flex{display: none;}}`}</style>
        <button
          type="button"
          className="btn btn-lg btn-primary"
          onClick={sendToHome}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-lg btn-success"
          onClick={print}
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default History;
