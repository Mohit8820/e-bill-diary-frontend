import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../contexts/auth-context";
import { styledDate } from "../assets/styledDate";
import { useHttpClient } from "../hooks/http-hook";
import Modal from "./UIElements/Modal";
import ErrorModal from "../components/UIElements/ErrorModal";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";

const History = () => {
  const auth = useContext(AuthContext);

  const location = useLocation();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [user, setUser] = useState(location.state);
  const [updateModal, setUpdateModal] = useState(false);
  const [statusBody, setStatusBody] = useState({
    status: "",
    note: "",
    datePaid: null,
    bill_id: "",
    userId: auth.userId,
  });
  console.log(statusBody);
  var billDate = [];
  user.history.forEach((bill) => {
    var newdate = styledDate(bill.dateGenerated);
    billDate.push(newdate);
  });

  const updateStatus = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_API_URL}/users/update/${statusBody.bill_id}`,
        "PATCH",
        JSON.stringify({ ...statusBody, billUserId: user.id }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      console.log(responseData);
      setUser(responseData.user);
      setUpdateModal(false);
    } catch (err) {}
  };

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
    <React.Fragment>
      <Modal
        onCancel={() => setUpdateModal(false)}
        show={updateModal}
        header="Update Status"
        onSubmit={updateStatus}
        footer={
          <div>
            <button onClick={() => setUpdateModal(false)} className="text-btn">
              Cancel
            </button>
            <button className="filled-btn">Okay</button>
          </div>
        }
      >
        {statusBody.status === "Paid" && (
          <input
            type="datetime-local"
            required={true}
            onChange={(event) => {
              setStatusBody((prev) => {
                return { ...prev, datePaid: event.target.value };
              });
            }}
          />
        )}
        <div className="input-group  mb-3">
          <span class="input-group-text">
            Note <br />
            (optional)
          </span>
          <textarea
            className="form-control"
            aria-label="With textarea"
            name="note"
            value={statusBody.note}
            onChange={(event) => {
              setStatusBody((prev) => {
                return { ...prev, note: event.target.value };
              });
            }}
          ></textarea>
        </div>
      </Modal>

      <ErrorModal error={error} onClear={clearError} />

      <div className="home">
        {isLoading && <LoadingSpinner asOverlay />}
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
                      {auth.userId !== process.env.REACT_APP_ADMIN_ID && (
                        <td className={bill.Status}>
                          {bill.Status}
                          {bill.Status === "Paid" &&
                            ` on
                              ${styledDate(bill.datePaid)}`}
                        </td>
                      )}
                      {auth.userId === process.env.REACT_APP_ADMIN_ID && (
                        <div class="btn-group">
                          <button
                            class="btn btn-secondary btn-sm dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {bill.Status}
                            {bill.Status === "Paid" &&
                              ` on
                              ${styledDate(bill.datePaid)}`}
                          </button>
                          <ul class="dropdown-menu">
                            <li
                              class="dropdown-item"
                              onClick={() => {
                                setUpdateModal(true);
                                setStatusBody({
                                  bill_id: bill.id,
                                  status: "Due",
                                  userId: auth.userId,
                                });
                              }}
                            >
                              Due
                            </li>
                            <li
                              class="dropdown-item"
                              onClick={() => {
                                setUpdateModal(true);
                                setStatusBody({
                                  bill_id: bill.id,
                                  status: "Processing",
                                  userId: auth.userId,
                                });
                              }}
                            >
                              Processing
                            </li>
                            <li
                              class="dropdown-item"
                              onClick={() => {
                                setUpdateModal(true);
                                setStatusBody({
                                  bill_id: bill.id,
                                  status: "Paid",
                                  userId: auth.userId,
                                  datePaid: new Date(),
                                });
                              }}
                            >
                              Paid
                            </li>
                          </ul>
                        </div>
                      )}
                      <td>{bill.Note}</td>
                      <button
                        onClick={() =>
                          openBill(user.history.length - 1 - index)
                        }
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
    </React.Fragment>
  );
};

export default History;
