import React, { useState, useEffect, useContext } from "react";
import QRCode from "qrcode";

import { AuthContext } from "../contexts/auth-context";
import { useNavigate, useLocation } from "react-router-dom";
import { styledDate } from "../assets/styledDate";

const Current = () => {
  const auth = useContext(AuthContext);

  const location = useLocation();
  const user = location.state;

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
        const qrSrc = await QRCode.toDataURL(JSON.stringify(location.state));
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
        <span className="my-badge">Bill</span>
        <div className="bill">
          <table className="table">
            {/* <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead> */}
            <tbody>
              <tr>
                <th scope="row">Name</th>
                <td>{user.name}</td>
              </tr>
              <tr>
                <th scope="row">Bill date</th>
                <td>{billdate}</td>
              </tr>
              <tr>
                <th scope="row">Previous reading</th>
                <td>{user.prevReading}</td>
              </tr>
              <tr>
                <th scope="row">Current Reading</th>
                <td>{user.lastBill.Reading}</td>
              </tr>
              <tr>
                <th scope="row">Bill Amount</th>
                <td>{user.lastBill.Amount}</td>
              </tr>
              <tr>
                <th scope="row">Bill Status</th>
                <td className={user.lastBill.Status}>{user.lastBill.Status}</td>
              </tr>
              {user.lastBill.datePaid !== null &&
                user.lastBill.Status === "Paid" && (
                  <tr>
                    <th scope="row">Bill Paid on</th>
                    <td>{styledDate(user.lastBill.datePaid)}</td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
        <div className="payment">
          <figcaption className="blockquote-footer">
            To verify - Scan the QR code
          </figcaption>
          <img src={src} alt="qr code" className="qr" />
        </div>
        <div className="btn-flex">
          <style>{`@media print {.btn-flex{display: none;}}`}</style>
          {user.lastBill.Status === "Due" && (
            <button
              type="button"
              className="btn btn-lg btn-primary"
              onClick={sendToPayment}
            >
              Pay
            </button>
          )}
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
  else
    return (
      <div class="spinner-grow text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
};

export default Current;
