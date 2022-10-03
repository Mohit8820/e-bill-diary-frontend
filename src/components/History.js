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

  useEffect(() => {
    console.log(location.state);
    setUser(location.state);
  }, [location.state]);
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
      navigate("/history", { state: responseData.user });
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

  const [deleteBill, setDeleteBill] = useState(false);
  const [billId, setBillId] = useState(null);

  const deleteBillRequest = async () => {
    setDeleteBill(false);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_API_URL}/users/deleteBill?user_id=${user.id}&bill_id=${billId}`,
        "PATCH",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate("/history", { state: responseData.user });
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <Modal
        onCancel={() => setDeleteBill(false)}
        show={deleteBill}
        header="Delete Bill"
        footer={
          <div className="btn-flex">
            <button
              onClick={() => setDeleteBill(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button onClick={deleteBillRequest} className="btn btn-warning">
              Okay
            </button>
          </div>
        }
      >
        Do you want to delete the question
      </Modal>
      <Modal
        onCancel={() => setUpdateModal(false)}
        show={updateModal}
        header="Update Status"
        onSubmit={updateStatus}
        footer={
          <div className="btn-flex">
            <button
              onClick={() => setUpdateModal(false)}
              className="btn btn-secondary"
              type="button"
            >
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              Okay
            </button>
          </div>
        }
      >
        {statusBody.status === "Paid" && (
          <div className="input-group mb-3">
            <span className="input-group-text">Date Paid</span>
            <input
              type="datetime-local"
              className="form-control"
              id="inputGroupFile02"
              required={true}
              onChange={(event) => {
                setStatusBody((prev) => {
                  return { ...prev, datePaid: event.target.value };
                });
              }}
            />
            <span className="btn btn-primary" id="button-addon2">
              Set date
            </span>
          </div>
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
          <div className=" history-table">
            <div>
              <div id="bill" className="table-head">
                <div className="col1">Bill Date</div>
                <div className="col2">Reading</div>
                <div className="col3">Amount</div>
                <div className="col4">Status</div>
                <div className="col5">Note</div>
              </div>
            </div>
            <div className="table-body">
              {user.history
                .slice(0)
                .reverse()
                .map((bill, index) => (
                  <React.Fragment key={index}>
                    <div
                      className={`table-row ${
                        index % 2 === 0 ? "shaded-bg" : ""
                      }`}
                    >
                      <div className="col1">
                        {billDate[user.history.length - 1 - index]}
                      </div>
                      <div className="col2">{bill.Reading}</div>
                      <div className="col3">{bill.Amount}</div>
                      {auth.userId !== process.env.REACT_APP_ADMIN_ID && (
                        <div className={`col4 ${bill.Status}`}>
                          {bill.Status}
                          <br />
                          {bill.Status === "Paid" && (
                            <span>{styledDate(bill.datePaid)}</span>
                          )}
                        </div>
                      )}
                      {auth.userId === process.env.REACT_APP_ADMIN_ID && (
                        <div className="btn-group col4">
                          <button
                            class="btn update-btn"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{
                              backgroundColor:
                                bill.Status === "Paid"
                                  ? "#d1e7dd"
                                  : bill.Status === "Due"
                                  ? "#f8d7da"
                                  : "#fff3cd",
                            }}
                          >
                            {bill.Status}{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-caret-down-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                            </svg>
                            <br />
                            {bill.Status === "Paid" && (
                              <span>{styledDate(bill.datePaid)}</span>
                            )}
                          </button>
                          <ul class="dropdown-menu">
                            <li>
                              {" "}
                              <button
                                type="button"
                                class="btn btn-danger"
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
                              </button>
                            </li>
                            <li>
                              <button
                                class="btn btn-warning"
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
                              </button>
                            </li>
                            <li>
                              <button
                                class="btn btn-success"
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
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                      <div className="col5">{bill.Note}</div>
                      <button
                        className="btn btn-outline-primary view-btn"
                        onClick={() =>
                          openBill(user.history.length - 1 - index)
                        }
                      >
                        view
                      </button>
                      {auth.userId === process.env.REACT_APP_ADMIN_ID && (
                        <button
                          className="btn delete-btn"
                          onClick={() => {
                            setBillId(bill.id);
                            setDeleteBill(true);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-trash-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </React.Fragment>
                ))}
            </div>
          </div>
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
