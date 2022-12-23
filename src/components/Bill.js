import React, { useState, useEffect, useContext } from "react";
import QRCode from "qrcode";

import { AuthContext } from "../contexts/auth-context";
import { useNavigate, useLocation } from "react-router-dom";
import { styledDate } from "../assets/styledDate";

const Bill = () => {
  const auth = useContext(AuthContext);

  const location = useLocation();
  const user = location.state;
  console.log(user);

  if (user !== null) {
    var billdate = styledDate(user.lastBill.dateGenerated);
  } else billdate = "-";

  const navigate = useNavigate();
  const sendToPayment = async () => {
    navigate("/payment", { state: user });
  };
  const print = async () => {
    window.print();
    // document.body.innerHTML = backup;
  };

  const [src, setSrc] = useState("");
  useEffect(() => {
    const generateQR = async (text) => {
      try {
        const qrSrc = await QRCode.toDataURL(
          JSON.stringify({
            Name: user.name,
            Bill_id: user.lastBill.id,
            Date_generated: user.lastBill.dateGenerated,
            Date_paid: user.lastBill.datePaid,
            Reading: user.lastBill.Reading,
            Amount: user.lastBill.Amount,
            Status: user.lastBill.Status,
          })
        );
        setSrc(qrSrc);
      } catch (err) {
        console.error(err);
      }
    };
    generateQR();
  }, [location.state]);

  if (auth.isLoggedIn)
    return (
      <div className="generate">
        <h2>Bill</h2>
        <div className="bill">
          <div className={`${user.lastBill.Status} status`}>
            {user.lastBill.Status === "Paid" ? (
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
            ) : user.lastBill.Status === "Due" ? (
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
            {user.lastBill.Status}
          </div>
          <div className="bill-head">
            <img src={src} alt="qr code" className="qr" />
            <p>{user.name}</p>
          </div>
          <table className="table">
            <tr>
              <th>Bill date</th>
              <td>{billdate}</td>
            </tr>
            <tr>
              <th>Bill Amount</th>
              <td>{user.lastBill.Amount}</td>
            </tr>
            <tr>
              <th>Previous reading</th>
              <td>{user.prevReading}</td>
            </tr>
            <tr>
              <th>Current Reading</th>
              <td>{user.lastBill.Reading}</td>
            </tr>

            {user.lastBill.datePaid !== null &&
              user.lastBill.Status === "Paid" && (
                <tr>
                  <th>Bill Paid on</th>
                  <td>{styledDate(user.lastBill.datePaid)}</td>
                </tr>
              )}
            {user.lastBill.Note !== null && user.lastBill.Note && (
              <tr>
                <th>Note</th>
                <td>{user.lastBill.Note}</td>
              </tr>
            )}
          </table>
        </div>

        <div className="btn-flex">
          <style>{`@media print {.btn-flex{display: none;}}`}</style>
          {user.lastBill.Status === "Due" && (
            <button className="success-btn" onClick={sendToPayment}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2.3rem"
                height="1.7rem"
                viewBox="0 0 23 17"
                fill="none"
              >
                <path
                  d="M19.75 1H2.875C1.83947 1 1 1.83947 1 2.875V14.125C1 15.1605 1.83947 16 2.875 16H19.75C20.7855 16 21.625 15.1605 21.625 14.125V2.875C21.625 1.83947 20.7855 1 19.75 1Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1 6.625H21.625"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>{" "}
              Pay
            </button>
          )}
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
            </svg>{" "}
            Print
          </button>
        </div>
      </div>
    );
  else
    return (
      <div>
      <span className="info">Session time out...Please Login</span>
    </div>
    );
};

export default Bill;
