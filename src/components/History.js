import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../contexts/auth-context";
import { styledDate, getDay, getMonth, getYear } from "../assets/styledDate";
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
  // const sendToHome = async () => {
  //   navigate("/home", { state: user.id });
  // };
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
          <span className="input-group-text">
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

      <div className="history">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>History</h2>

        <div className="bill-list">
          {user.history
            .slice(0)
            .reverse()
            .map((bill, index) => (
              <React.Fragment key={index}>
                <div className="bill-item">
                  <div className="main-portion">
                    <div className="date">
                      {getMonth(bill.dateGenerated)}
                      <p>{getDay(bill.dateGenerated)}</p>
                      {getYear(bill.dateGenerated)}
                    </div>
                    <div className="main-portion-details">
                      <h3 className="amount">
                        <small>₹</small>
                        {bill.Amount}
                      </h3>
                      {bill.Status === "Paid" && (
                        <p>
                          {"Paid on : "}
                          {styledDate(bill.datePaid)}
                        </p>
                      )}
                      <p>
                        {"Reading : "}
                        {bill.Reading}
                      </p>
                    </div>

                    {auth.userId !== process.env.REACT_APP_ADMIN_ID && (
                      <div className={`status ${bill.Status}`}>
                        {bill.Status}
                        <br />
                      </div>
                    )}
                    {auth.userId === process.env.REACT_APP_ADMIN_ID && (
                      <div className="status" style={{ display: "none" }}>
                        <button
                          className="btn update-btn"
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
                          {bill.Status}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-caret-down-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                          </svg>
                          <br />
                          {bill.Status === "Paid" && (
                            <span>{styledDate(bill.datePaid)}</span>
                          )}
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <button
                              type="button"
                              className="btn btn-danger"
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
                              className="btn btn-warning"
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
                              className="btn btn-success"
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
                    <button
                      className="view-btn"
                      onClick={() => openBill(user.history.length - 1 - index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1rem"
                        height="1.7rem"
                        viewBox="0 0 10 17"
                        fill="none"
                      >
                        <path
                          d="M1 16L8.5 8.5L1 1"
                          stroke="var(--sec-color)"
                          stroke-opacity="0.61"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    {auth.userId === process.env.REACT_APP_ADMIN_ID && (
                      <button
                        className="delete-btn"
                        onClick={() => {
                          setBillId(bill.id);
                          setDeleteBill(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.6rem"
                          height="1.7rem"
                          viewBox="0 0 16 17"
                          fill="none"
                        >
                          <path
                            d="M1 4H2.5H14.5"
                            stroke="var(--sec-color)"
                            stroke-opacity="0.6"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M13 4V14.5C13 14.8978 12.842 15.2794 12.5607 15.5607C12.2794 15.842 11.8978 16 11.5 16H4C3.60218 16 3.22064 15.842 2.93934 15.5607C2.65804 15.2794 2.5 14.8978 2.5 14.5V4M4.75 4V2.5C4.75 2.10218 4.90804 1.72064 5.18934 1.43934C5.47064 1.15804 5.85218 1 6.25 1H9.25C9.64782 1 10.0294 1.15804 10.3107 1.43934C10.592 1.72064 10.75 2.10218 10.75 2.5V4"
                            stroke="var(--sec-color)"
                            stroke-opacity="0.6"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                  {bill.Note && (
                    <div className="aside-portion">Note : {bill.Note}</div>
                  )}
                </div>
              </React.Fragment>
            ))}
        </div>

        <div className="bill" style={{ display: "none" }}>
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
                            className="btn update-btn"
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
                              className="bi bi-caret-down-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                            </svg>
                            <br />
                            {bill.Status === "Paid" && (
                              <span>{styledDate(bill.datePaid)}</span>
                            )}
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <button
                                type="button"
                                className="btn btn-danger"
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
                                className="btn btn-warning"
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
                                className="btn btn-success"
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
                            className="bi bi-trash-fill"
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
          {/* <button className="sec-btn" onClick={sendToHome}>
            Back
          </button> */}
          <button className="primary-btn" onClick={print}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.9rem"
              height="1.9rem"
              viewBox="0 0 19 19"
              fill="none"
            >
              <path
                d="M4.3999 6.95V1H14.5999V6.95"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.4 14.6H2.7C2.24913 14.6 1.81673 14.4208 1.49792 14.102C1.17911 13.7832 1 13.3508 1 12.9V8.64995C1 8.19908 1.17911 7.76668 1.49792 7.44787C1.81673 7.12906 2.24913 6.94995 2.7 6.94995H16.3C16.7509 6.94995 17.1833 7.12906 17.5021 7.44787C17.8209 7.76668 18 8.19908 18 8.64995V12.9C18 13.3508 17.8209 13.7832 17.5021 14.102C17.1833 14.4208 16.7509 14.6 16.3 14.6H14.6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.5999 11.2H4.3999V18H14.5999V11.2Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default History;
