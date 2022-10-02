import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { styledDate } from "../assets/styledDate";
import { AuthContext } from "../contexts/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../components/UIElements/ErrorModal";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";

const AdminHome = () => {
  const auth = useContext(AuthContext);

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
  }, [sendRequest]);
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

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div>
        <form onSubmit={updatePrice}>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="input-group mb-3">
            <span className="input-group-text">Price</span>
            <input
              type="number"
              className="form-control"
              id="inputGroupFile02"
              placeholder={price}
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
            <button
              className="btn btn-primary"
              type="submit"
              id="button-addon2"
            >
              Update
            </button>
          </div>
        </form>
        <div class="card">
          <h5 class="card-header">Users</h5>
          <ul class="list-group list-group-flush">
            {users.map((user, index) => (
              <React.Fragment key={index}>
                <li class="list-group-item user-element">
                  <button
                    type="button"
                    class="btn btn-light"
                    onClick={() => goToHome(user.id)}
                  >
                    <div className="user-element">
                      <h6 className="fw-bold">{user.name}</h6>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-box-arrow-up-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                        />
                      </svg>
                    </div>
                    <table
                      className={`table table-primary ${
                        user.history[user.history.length - 1].Status === "Due"
                          ? "table-danger"
                          : user.history[user.history.length - 1].Status ===
                            "Processing"
                          ? "table-warning"
                          : "table-success"
                      }`}
                    >
                      <tbody>
                        <tr>
                          <td>
                            {styledDate(
                              user.history[user.history.length - 1]
                                .dateGenerated
                            )}
                          </td>
                          <td
                            className={
                              user.history[user.history.length - 1].Status
                            }
                          >
                            {user.history[user.history.length - 1].Status}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </button>
                  <button type="button" class="btn btn-warning">
                    Update
                  </button>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminHome;
