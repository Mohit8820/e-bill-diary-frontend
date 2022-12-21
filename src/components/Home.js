import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { getDay, getMonth, getYear } from "../assets/styledDate";
import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../components/UIElements/ErrorModal";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";

const Home = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [user, setUser] = useState(null);
  const location = useLocation();

  const [price, setPrice] = useState(0);

  useEffect(() => {
    let url = `${process.env.REACT_APP_API_URL}/users/${location.state}`;

    let priceurl = `${process.env.REACT_APP_API_URL}/admin/`;

    const getPrice = async () => {
      try {
        const responseData = await sendRequest(priceurl);
        setPrice(responseData.pricePerUnit);
      } catch (err) {}
    };
    getPrice();

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
    var day = getDay(lastBill.dateGenerated);
    var month = getMonth(lastBill.dateGenerated);
    var year = getYear(lastBill.dateGenerated);
  } else {
    day = "-";
    month = "-";
    year = "-";
  }

  const navigate = useNavigate();
  const sendToGenerate = async () => {
    var prevReading;
    if (user.history.length <= 1) prevReading = 0;
    else prevReading = user.history[user.history.length - 2].Reading;
    navigate(lastBill.Status === "Paid" ? "/generate" : "/bill", {
      state: {
        userId: user.id,
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
          <h2>Hi,{user.name}</h2>

          <div className="price-info">
            Price Per Unit : <span>₹ {price}</span>
          </div>

          <div className="last-bill">
            <h3 className="">Last bill details</h3>
            <div className="last-bill-card">
              <div className={`${lastBill.Status} status`}>
                {lastBill.Status === "Paid" ? (
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
                ) : lastBill.Status === "Due" ? (
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
                {lastBill.Status}
              </div>
              <div className="date">
                {month}
                <p>{day}</p>
                {year}
              </div>
              <div>
                <div className="amount">
                  <span>₹ </span>
                  {lastBill.Amount}
                </div>
                <div className="reading">Reading : {lastBill.Reading}</div>
              </div>
            </div>
          </div>
          <button
            className={`primary-btn ${
              lastBill.Status === "Processing" ? "disable-btn" : ""
            }`}
            onClick={sendToGenerate}
            disabled={lastBill.Status === "Processing" ? true : false}
          >
            {lastBill.Status === "Paid"
              ? "Generate new bill"
              : lastBill.Status === "Due"
              ? "View Bill"
              : "Please Wait while bill is processing"}
          </button>
          <div className="btn-flex">
            <button className="sec-btn" onClick={showHistory}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.9rem"
                height="1.9em"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M24 12c0 6.627-5.373 12-12 12s-12-5.373-12-12h2c0 5.514 4.486 10 10 10s10-4.486 10-10-4.486-10-10-10c-2.777 0-5.287 1.141-7.099 2.977l2.061 2.061-6.962 1.354 1.305-7.013 2.179 2.18c2.172-2.196 5.182-3.559 8.516-3.559 6.627 0 12 5.373 12 12zm-13-6v8h7v-2h-5v-6h-2z" />
              </svg>
              History
            </button>
            <button
              className="sec-btn"
              onClick={() => {
                navigate("/chart", { state: user });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.9rem"
                height="1.9rem"
                viewBox="0 0 21 22"
                fill="none"
              >
                <g clip-path="url(#clip0_64_180)">
                  <path
                    d="M2.35986 1.77368V16.8496C2.35986 18.3218 3.48546 19.5101 4.87986 19.5101H19.1599"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M4.87988 15.076L8.73548 10.3226C9.37388 9.54221 10.5079 9.489 11.1967 10.2251L11.9947 11.0675C12.6835 11.7947 13.8175 11.7504 14.4559 10.97L18.3199 6.20776"
                    stroke="#737373"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_64_180">
                    <rect
                      width="20.16"
                      height="21.2837"
                      fill="white"
                      transform="translate(0.679932)"
                    />
                  </clipPath>
                </defs>
              </svg>
              Chart
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
