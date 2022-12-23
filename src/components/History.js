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
    console.log(statusBody);
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
        userId: user.id,
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
            <button onClick={() => setDeleteBill(false)} className="sec-btn">
              Cancel
            </button>
            <button onClick={deleteBillRequest} className="primary-btn Due">
              Okay
            </button>
          </div>
        }
      >
        Do you want to delete the bill
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
              className="sec-btn"
              type="button"
            >
              Cancel
            </button>
            <button className="primary-btn" type="submit">
              Okay
            </button>
          </div>
        }
      >
        <ul className="status-menu">
          <li>
            <button
              type="button"
              className={`Due ${
                statusBody.status === "Due" ? "active-btn" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setStatusBody((prev) => {
                  return { ...prev, status: "Due" };
                });
              }}
            >
              Due
            </button>
          </li>
          <li>
            <button
              className={`Processing ${
                statusBody.status === "Processing" ? "active-btn" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setStatusBody((prev) => {
                  return { ...prev, status: "Processing" };
                });
              }}
            >
              Processing
            </button>
          </li>
          <li>
            <button
              className={`Paid ${
                statusBody.status === "Paid" ? "active-btn" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setStatusBody((prev) => {
                  return { ...prev, status: "Paid", datePaid: new Date() };
                });
              }}
            >
              Paid
            </button>
          </li>
        </ul>
        {statusBody.status === "Paid" && (
          <div className="input">
            <div className="label">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.9rem"
                height="2.1rem"
                viewBox="0 0 19 21"
                fill="none"
              >
                <path
                  d="M16.1111 2.88892H2.88889C1.84568 2.88892 1 3.7346 1 4.7778V18C1 19.0432 1.84568 19.8889 2.88889 19.8889H16.1111C17.1543 19.8889 18 19.0432 18 18V4.7778C18 3.7346 17.1543 2.88892 16.1111 2.88892Z"
                  stroke="var(--sec-color)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.2778 1V4.77778"
                  stroke="var(--sec-color)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.72217 1V4.77778"
                  stroke="var(--sec-color)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1 8.55542H18"
                  stroke="var(--sec-color)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <input
              type="datetime-local"
              className=""
              required={true}
              onChange={(event) => {
                setStatusBody((prev) => {
                  return { ...prev, datePaid: event.target.value };
                });
              }}
            />
            <span className="primary-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="1.5rem"
                viewBox="0 0 20 15"
                fill="none"
              >
                <path
                  d="M18.1831 1.56982L6.49561 13.2573L1.18311 7.94482"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>
        )}
        <div className="input note">
          <div className="label">
            Note <br />
            (optional)
          </div>
          <textarea
            className=""
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

                    <div className={`status ${bill.Status}`}>
                      {bill.Status === "Paid" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                          stroke-linejoin="round"
                          stroke-miterlimit="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" />
                        </svg>
                      ) : bill.Status === "Due" ? (
                        <svg
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                          stroke-linejoin="round"
                          stroke-miterlimit="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m12.002 21.534c5.518 0 9.998-4.48 9.998-9.998s-4.48-9.997-9.998-9.997c-5.517 0-9.997 4.479-9.997 9.997s4.48 9.998 9.997 9.998zm0-1.5c-4.69 0-8.497-3.808-8.497-8.498s3.807-8.497 8.497-8.497 8.498 3.807 8.498 8.497-3.808 8.498-8.498 8.498zm0-6.5c-.414 0-.75-.336-.75-.75v-5.5c0-.414.336-.75.75-.75s.75.336.75.75v5.5c0 .414-.336.75-.75.75zm-.002 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"
                            fill-rule="nonzero"
                          />
                        </svg>
                      ) : (
                        <svg
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                          stroke-linejoin="round"
                          stroke-miterlimit="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m21.897 13.404.008-.057v.002c.024-.178.044-.357.058-.537.024-.302-.189-.811-.749-.811-.391 0-.715.3-.747.69-.018.221-.044.44-.078.656-.645 4.051-4.158 7.153-8.391 7.153-3.037 0-5.704-1.597-7.206-3.995l1.991-.005c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-4.033c-.414 0-.75.336-.75.75v4.049c0 .414.336.75.75.75s.75-.335.75-.75l.003-2.525c1.765 2.836 4.911 4.726 8.495 4.726 5.042 0 9.217-3.741 9.899-8.596zm-19.774-2.974-.009.056v-.002c-.035.233-.063.469-.082.708-.024.302.189.811.749.811.391 0 .715-.3.747-.69.022-.28.058-.556.107-.827.716-3.968 4.189-6.982 8.362-6.982 3.037 0 5.704 1.597 7.206 3.995l-1.991.005c-.414 0-.75.336-.75.75s.336.75.75.75h4.033c.414 0 .75-.336.75-.75v-4.049c0-.414-.336-.75-.75-.75s-.75.335-.75.75l-.003 2.525c-1.765-2.836-4.911-4.726-8.495-4.726-4.984 0-9.12 3.654-9.874 8.426z"
                            fill-rule="nonzero"
                          />
                        </svg>
                      )}
                      {bill.Status}
                    </div>
                    {auth.userId === process.env.REACT_APP_ADMIN_ID && (
                      <button
                        className="update-btn"
                        onClick={() => {
                          setUpdateModal(true);
                          setStatusBody({
                            bill_id: bill.id,
                            userId: auth.userId,
                            status: bill.Status,
                          });
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="2rem"
                          height="2rem"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M9.99996 12.4545C11.3556 12.4545 12.4545 11.3556 12.4545 9.99996C12.4545 8.64435 11.3556 7.54541 9.99996 7.54541C8.64435 7.54541 7.54541 8.64435 7.54541 9.99996C7.54541 11.3556 8.64435 12.4545 9.99996 12.4545Z"
                            stroke="var(--accent-text-color)"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16.0545 12.4545C15.9456 12.7013 15.9131 12.9751 15.9613 13.2405C16.0094 13.5059 16.1359 13.7508 16.3245 13.9436L16.3736 13.9927C16.5258 14.1447 16.6465 14.3252 16.7288 14.5238C16.8112 14.7225 16.8536 14.9354 16.8536 15.1505C16.8536 15.3655 16.8112 15.5784 16.7288 15.7771C16.6465 15.9757 16.5258 16.1562 16.3736 16.3082C16.2217 16.4603 16.0412 16.581 15.8425 16.6634C15.6439 16.7457 15.431 16.7881 15.2159 16.7881C15.0009 16.7881 14.7879 16.7457 14.5893 16.6634C14.3906 16.581 14.2102 16.4603 14.0582 16.3082L14.0091 16.2591C13.8163 16.0705 13.5714 15.9439 13.3059 15.8958C13.0405 15.8477 12.7668 15.8802 12.52 15.9891C12.278 16.0928 12.0716 16.265 11.9263 16.4845C11.7809 16.704 11.7029 16.9613 11.7018 17.2245V17.3636C11.7018 17.7976 11.5294 18.2138 11.2225 18.5207C10.9157 18.8276 10.4994 19 10.0655 19C9.63146 19 9.21525 18.8276 8.90837 18.5207C8.60149 18.2138 8.42909 17.7976 8.42909 17.3636V17.29C8.42276 17.0192 8.3351 16.7565 8.17751 16.5362C8.01992 16.3159 7.79969 16.1481 7.54545 16.0545C7.29868 15.9456 7.02493 15.9131 6.75952 15.9613C6.4941 16.0094 6.24919 16.1359 6.05636 16.3245L6.00727 16.3736C5.8553 16.5258 5.67483 16.6465 5.47617 16.7288C5.27752 16.8112 5.06459 16.8536 4.84955 16.8536C4.6345 16.8536 4.42157 16.8112 4.22292 16.7288C4.02426 16.6465 3.84379 16.5258 3.69182 16.3736C3.53967 16.2217 3.41898 16.0412 3.33663 15.8425C3.25428 15.6439 3.21189 15.431 3.21189 15.2159C3.21189 15.0009 3.25428 14.7879 3.33663 14.5893C3.41898 14.3906 3.53967 14.2102 3.69182 14.0582L3.74091 14.0091C3.92953 13.8163 4.05606 13.5714 4.10419 13.3059C4.15231 13.0405 4.11982 12.7668 4.01091 12.52C3.90719 12.278 3.73498 12.0716 3.51547 11.9263C3.29596 11.7809 3.03873 11.7029 2.77545 11.7018H2.63636C2.20237 11.7018 1.78616 11.5294 1.47928 11.2225C1.1724 10.9157 1 10.4994 1 10.0655C1 9.63146 1.1724 9.21525 1.47928 8.90837C1.78616 8.60149 2.20237 8.42909 2.63636 8.42909H2.71C2.98081 8.42276 3.24346 8.3351 3.46379 8.17751C3.68412 8.01992 3.85195 7.79969 3.94545 7.54545C4.05437 7.29868 4.08686 7.02493 4.03873 6.75952C3.99061 6.4941 3.86408 6.24919 3.67545 6.05636L3.62636 6.00727C3.47422 5.8553 3.35352 5.67483 3.27118 5.47617C3.18883 5.27752 3.14644 5.06459 3.14644 4.84955C3.14644 4.6345 3.18883 4.42157 3.27118 4.22292C3.35352 4.02426 3.47422 3.84379 3.62636 3.69182C3.77834 3.53967 3.95881 3.41898 4.15746 3.33663C4.35611 3.25428 4.56905 3.21189 4.78409 3.21189C4.99913 3.21189 5.21207 3.25428 5.41072 3.33663C5.60937 3.41898 5.78984 3.53967 5.94182 3.69182L5.99091 3.74091C6.18374 3.92953 6.42865 4.05606 6.69406 4.10419C6.95948 4.15231 7.23322 4.11982 7.48 4.01091H7.54545C7.78745 3.90719 7.99383 3.73498 8.1392 3.51547C8.28457 3.29596 8.36259 3.03873 8.36364 2.77545V2.63636C8.36364 2.20237 8.53604 1.78616 8.84292 1.47928C9.14979 1.1724 9.56601 1 10 1C10.434 1 10.8502 1.1724 11.1571 1.47928C11.464 1.78616 11.6364 2.20237 11.6364 2.63636V2.71C11.6374 2.97328 11.7154 3.23051 11.8608 3.45002C12.0062 3.66953 12.2126 3.84174 12.4545 3.94545C12.7013 4.05437 12.9751 4.08686 13.2405 4.03873C13.5059 3.99061 13.7508 3.86408 13.9436 3.67545L13.9927 3.62636C14.1447 3.47422 14.3252 3.35352 14.5238 3.27118C14.7225 3.18883 14.9354 3.14644 15.1505 3.14644C15.3655 3.14644 15.5784 3.18883 15.7771 3.27118C15.9757 3.35352 16.1562 3.47422 16.3082 3.62636C16.4603 3.77834 16.581 3.95881 16.6634 4.15746C16.7457 4.35611 16.7881 4.56905 16.7881 4.78409C16.7881 4.99913 16.7457 5.21207 16.6634 5.41072C16.581 5.60937 16.4603 5.78984 16.3082 5.94182L16.2591 5.99091C16.0705 6.18374 15.9439 6.42865 15.8958 6.69406C15.8477 6.95948 15.8802 7.23322 15.9891 7.48V7.54545C16.0928 7.78745 16.265 7.99383 16.4845 8.1392C16.704 8.28457 16.9613 8.36259 17.2245 8.36364H17.3636C17.7976 8.36364 18.2138 8.53604 18.5207 8.84292C18.8276 9.14979 19 9.56601 19 10C19 10.434 18.8276 10.8502 18.5207 11.1571C18.2138 11.464 17.7976 11.6364 17.3636 11.6364H17.29C17.0267 11.6374 16.7695 11.7154 16.55 11.8608C16.3305 12.0062 16.1583 12.2126 16.0545 12.4545V12.4545Z"
                            stroke="var(--accent-text-color)"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
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
