import React, { useState, useContext, useRef } from "react";
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
  const [copied, setCopied] = useState(false);
  const [disable, setDisable] = useState(true);

  const handleCopy = () => {
    navigator.clipboard.writeText("mohitsah8820@oksbi");
    setCopied(true);
    const myTimeout = setTimeout(closeToast, 3000);

    function closeToast() {
      setCopied(false);
    }
  };

  const hiddenFileInput = useRef(null);
  const submitBtn = useRef(null);

  const [fileName, setFileName] = useState("Select file");

  const [file, setFile] = useState(null);
  const handleFileInput = (e) => {
    // handle validations

    if (e.target.files) {
      if (e.target.files.length > 1) alert("select only one file");
      else {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        setDisable(false);
      }
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
    event.preventDefault();
    if (file !== null) {
      if (auth.isLoggedIn) {
        try {
          await sendRequest(
            `${process.env.REACT_APP_API_URL}/users/update/${user.lastBill.id}`,
            "PATCH",
            JSON.stringify({
              billUserId: user.userId,
              userId: user.userId,
              status: "Processing",
            }),
            {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.token,
            }
          );
          setDisable(true);
          submitBtn.current.click();
        } catch (err) {}
      } else navigate("/");
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="generate">
        <h2>Payment</h2>

        <div className="payment-card">
          <img src={qr} alt="qr code" className="payment-qr" />
          <figcaption className="">Scan the QR code to pay</figcaption>
          <p>
            UPI ID : <strong id="myUpi">mohitsah8820@oksbi</strong>
            <button onClick={handleCopy} className="copy-upi">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.7rem"
                height="1.7rem"
                viewBox="0 0 17 17"
                fill="none"
              >
                <path
                  d="M14.5 6.25H7.75C6.92157 6.25 6.25 6.92157 6.25 7.75V14.5C6.25 15.3284 6.92157 16 7.75 16H14.5C15.3284 16 16 15.3284 16 14.5V7.75C16 6.92157 15.3284 6.25 14.5 6.25Z"
                  stroke="var(--text-color)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.25 10.75H2.5C2.10218 10.75 1.72064 10.592 1.43934 10.3107C1.15804 10.0294 1 9.64782 1 9.25V2.5C1 2.10218 1.15804 1.72064 1.43934 1.43934C1.72064 1.15804 2.10218 1 2.5 1H9.25C9.64782 1 10.0294 1.15804 10.3107 1.43934C10.592 1.72064 10.75 2.10218 10.75 2.5V3.25"
                  stroke="var(--text-color)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {copied && <div className="copiedToast">copied</div>}
            </button>
          </p>
        </div>
        <div className="payment-form">
          <figcaption className="info">
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
              value="http://ebilldiary.netlify.app/thanks"
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
            <div className="input">
              <input
                type="file"
                id="paid-ss"
                name="attachment"
                className="form-control"
                ref={hiddenFileInput}
                onChange={(e) => handleFileInput(e)}
                accept="image/png, image/jpeg"
                required
              />
              <div
                className="label"
                onClick={() => {
                  hiddenFileInput.current.click();
                }}
              >
                Choose file
              </div>
              <input
                type="text"
                readOnly
                onClick={() => {
                  hiddenFileInput.current.click();
                }}
                value={fileName}
              />
            </div>
            <div className="input note">
              <div className="label">
                Note <br /> (optional)
              </div>
              <textarea
                className=""
                aria-label="With textarea"
                name="note"
              ></textarea>
            </div>

            <button
              className={`primary-btn ${disable ? "disable-btn" : ""}`}
              onClick={updateToPending}
              disabled={disable}
            >
              {disable && file !== null ? "Wait" : "Submit"}
            </button>
            <button className="dis-none" type="submit" ref={submitBtn}>
              actual submit btn
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Payment;
