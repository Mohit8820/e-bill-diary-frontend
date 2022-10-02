import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../contexts/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../components/UIElements/ErrorModal";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";

const AdminHome = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let url = `${process.env.REACT_APP_API_URL}/admin/`;

    const getUser = async () => {
      try {
        const responseData = await sendRequest(url);
        setPrice(responseData.pricePerUnit);
      } catch (err) {}
    };
    getUser();
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
            <li class="list-group-item user-element">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <button>log in</button>
              <button>log in</button>
            </li>
            <li class="list-group-item">A second item</li>
            <li class="list-group-item">A third item</li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminHome;
