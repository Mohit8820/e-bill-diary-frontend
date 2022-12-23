import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { styledDate } from "../assets/styledDate";
import { AuthContext } from "../contexts/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import Modal from "./UIElements/Modal";
import ErrorModal from "../components/UIElements/ErrorModal";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";

const AdminHome = () => {
  const auth = useContext(AuthContext);
  const [success, setSuccess] = useState(false);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let url = `${process.env.REACT_APP_API_URL}/admin/`;

    const getPrice = async () => {
      try {
        const responseData = await sendRequest(url);
        setPrice(responseData.pricePerUnit);
      } catch (err) {}
    };
    getPrice();

    const getUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/users/`
        );
        setUsers(responseData.users);
      } catch (err) {}
    };
    getUsers();
  }, [sendRequest, success]);
  const updatePrice = async (event) => {
    event.preventDefault();
    if (auth.isLoggedIn) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/admin/update`,
          "PATCH",
          JSON.stringify({
            price: price,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        console.log(responseData);
      } catch (err) {}
    } else navigate("/");
  };

  const goToHome = (userId) => {
    navigate("/home", { state: userId });
  };

  const [updateModal, setUpdateModal] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    userId: null,
    name: "",
    password: "",
  });

  const updateUser = async (event) => {
    event.preventDefault();

    if (updatedUser.name !== "" || updatedUser.password !== "") {
      var ubody = {};
      if (updatedUser.name === "")
        ubody = {
          password: updatedUser.password,
        };
      else if (updatedUser.password === "")
        ubody = {
          name: updatedUser.name,
        };
      console.log("ubody");
      console.log(ubody);
      try {
        await sendRequest(
          `${process.env.REACT_APP_API_URL}/users/updateUser/${updatedUser.userId}`,
          "PATCH",
          JSON.stringify(ubody),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        setSuccess(!success);
        setUpdateModal(false);
      } catch (err) {}
    }
  };
  console.log(updatedUser);

  if (auth.userId === process.env.REACT_APP_ADMIN_ID)
    return (
      <React.Fragment>
        <Modal
          onCancel={() => setUpdateModal(false)}
          show={updateModal}
          header="Update User"
          footer={
            <div className="btn-flex">
              <button
                onClick={() => setUpdateModal(false)}
                className="sec-btn"
                type="button"
              >
                Cancel
              </button>
            </div>
          }
        >
          <div className="input">
            {/* <div className="label">Name</div> */}
            <input
              type="text"
              value={updatedUser.name}
              placeholder="Name"
              onChange={(event) => {
                setUpdatedUser((prev) => {
                  return { ...prev, password: "", name: event.target.value };
                });
              }}
            />
            <button
              className="primary-btn Processing"
              id="button-addon2"
              onClick={updateUser}
              disabled={updatedUser.name === "" ? true : false}
            >
              Reset
            </button>
          </div>
          <div className="input">
            {/* <span className="input-group-text">Password</span> */}
            <input
              type="text"
              value={updatedUser.password}
              placeholder="Password"
              onChange={(event) => {
                setUpdatedUser((prev) => {
                  return { ...prev, name: "", password: event.target.value };
                });
              }}
            />
            <button
              className="primary-btn Processing"
              onClick={updateUser}
              disabled={updatedUser.password === "" ? true : false}
            >
              Reset
            </button>
          </div>
        </Modal>
        <ErrorModal error={error} onClear={clearError} />
        <div className="home">
          <h2>Hi, Sir</h2>
          {isLoading && <LoadingSpinner asOverlay />}
          <form onSubmit={updatePrice}>
            <div className="input">
              <div className="label">Price</div>
              <input
                type="number"
                placeholder={price}
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
              <button className="primary-btn" type="submit">
                Update
              </button>
            </div>
          </form>
          <div className="users">
            <h2>Users</h2>
            <ul className="users-list">
              {users.map((user, index) => (
                <React.Fragment key={index}>
                  <li className="user-item">
                    <button
                      className="user-btn"
                      onClick={() => goToHome(user.id)}
                    >
                      <h3
                        className={`uname ${
                          user.history[user.history.length - 1].Status
                        }`}
                      >
                        {user.name}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="2rem"
                          height="2rem"
                          viewBox="0 0 20 20"
                          fill="none"
                          className="open-btn"
                        >
                          <path
                            d="M12.856 1.91577H16.6337C17.1347 1.91577 17.6151 2.11478 17.9694 2.46901C18.3236 2.82325 18.5226 3.3037 18.5226 3.80466V17.0269C18.5226 17.5278 18.3236 18.0083 17.9694 18.3625C17.6151 18.7168 17.1347 18.9158 16.6337 18.9158H12.856"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.13379 15.138L12.856 10.4158L8.13379 5.6936"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12.8558 10.4158H1.52246"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </h3>

                      <p>
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
                        {styledDate(
                          user.history[user.history.length - 1].dateGenerated
                        )}
                      </p>

                      <aside>
                        <small>₹</small>
                        {user.history[user.history.length - 1].Amount}
                      </aside>
                    </button>
                    <button
                      className="update-btn"
                      onClick={() => {
                        setUpdatedUser((prev) => {
                          return { userId: user.id, name: "", password: "" };
                        });
                        setUpdateModal(true);
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
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  else
    return (
      <div className="spinner-grow text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
};

export default AdminHome;
