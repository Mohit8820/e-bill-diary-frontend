import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../contexts/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../components/UIElements/ErrorModal";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";

import qr from "../assets/qr.jpg";

const Payment = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();

  const location = useLocation();
  const user = location.state;
  console.log(user.lastBill.id);
  const [copied, setCopied] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("mohitsah8820@oksbi");
    setCopied(true);
    const myTimeout = setTimeout(closeToast, 5000);

    function closeToast() {
      setCopied(false);
    }
  };

  const [file, setFile] = useState(null);
  const handleFileInput = (e) => {
    // handle validations

    if (e.target.files) {
      console.log(e.target.files.length);
      if (e.target.files.length > 1) alert("select only one file");
      else setFile(e.target.files[0]);
    }
  };
  /*   console.log("abc");
    console.log(file);
    function sendMail(event) {
      event.preventDefault();
      const formData = new FormData();
  
      formData.append("username", "Groucho");
      formData.append("accountnum", 123456); // number 123456 is immediately converted to a string "123456"
  
      // HTML file input, chosen by user
      formData.append("userfile", file);
      for (const value of formData.values()) {
        console.log(value);
      }
  
      fetch("https://formsubmit.co/ajax/lemo040520@gmail.com", {
        method: "POST",
        data: formData,
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }
  */

  const updateToPending = async (event) => {
    if (file !== null) {
      if (auth.isLoggedIn) {
        setDisable(true);
        try {
          await sendRequest(
            `${process.env.REACT_APP_API_URL}/users/update/${user.lastBill.id}`,
            "PATCH",
            JSON.stringify({
              userId: user.userId,
              status: "Processing",
            }),
            {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.token,
            }
          );
        } catch (err) {}
      } else navigate("/");
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="generate">
        <span className="my-badge">Payment</span>

        <div className="payment">
          <figcaption className="blockquote-footer">
            To make payment - Scan the QR code or pay to the given UPI ID
          </figcaption>
          <img src={qr} alt="qr code" className="qr" />
          <p>
            UPI ID : <strong id="myUpi">mohitsah8820@oksbi</strong>
            <button onClick={handleCopy} className="copy-upi">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-clipboard"
                viewBox="0 0 16 16"
              >
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
              </svg>
              {copied && <div className="copiedToast">UPI copied</div>}
            </button>
          </p>
        </div>
        <div>
          <figcaption className="blockquote-footer">
            After payment - Kindly submit the screenshot of the payment done
          </figcaption>
          <form
            action="https://formsubmit.co/lemo040520@gmail.com"
            method="POST"
            //onSubmit={(event) => sendMail(event)}
            encType="multipart/form-data"
          >
            {isLoading && <LoadingSpinner asOverlay />}
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="hidden"
              name="_next"
              value="http://localhost:3000/thanks"
            />
            <div className="dis-none">
              <div>
                <input
                  type="text"
                  name="Username"
                  value={user.name}
                  readOnly={true}
                />
                <input
                  type="text"
                  name="Bill date"
                  value={user.lastBill.dateGenerated}
                  readOnly={true}
                />
                <input
                  type="text"
                  name="Previous reading"
                  value={user.prevReading}
                  readOnly={true}
                />
                <input
                  type="text"
                  name="Current Reading"
                  value={user.lastBill.Reading}
                  readOnly={true}
                />
                <input
                  type="text"
                  name="Bill Amount"
                  value={user.lastBill.Amount}
                  readOnly={true}
                />
              </div>
            </div>
            <div>
              <div className="input-group mb-3">
                <input
                  type="file"
                  id="paid-ss"
                  name="attachment"
                  className="form-control"
                  onChange={(e) => handleFileInput(e)}
                  accept="image/png, image/jpeg"
                  required
                />
              </div>
              <div className="input-group  mb-3">
                <span class="input-group-text">Note (optional)</span>
                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  name="note"
                ></textarea>
              </div>
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              onClick={updateToPending}
            >
              {disable ? "Wait" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Payment;
