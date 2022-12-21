import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../components/UIElements/ErrorModal";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";

const Login = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const handleChange = (event) => {
    var { name, value } = event.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };
  const navigate = useNavigate();
  const authSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_API_URL + "/users/login",
        "POST",
        JSON.stringify(user),
        { "Content-Type": "application/json" }
      );
      console.log(responseData);
      auth.login(responseData.userId, responseData.token);
      if (responseData.userId === process.env.REACT_APP_ADMIN_ID)
        navigate("/adminHome");
      else navigate("/home", { state: responseData.userId });
    } catch (err) {
      console.log(err);

      setUser({
        name: "",
        password: "",
      });
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="login">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="93"
          height="115"
          viewBox="0 0 93 115"
          fill="none"
        >
          <g filter="url(#filter0_d_90_230)">
            <path
              d="M30.606 28.7502L66.106 33.5002C66.106 33.5002 70.6061 33.7502 70.3561 38.2502V45.7502V53.155L70.5614 84.7501C70.5963 84.5976 70.4931 85.0001 70.4931 85.0001C72.2431 84.5001 72.3561 82.0001 72.3561 82.0001V78.5001L74.3561 76.0002C77.3561 75.2502 77.3561 71.2502 77.3561 71.2502V57.7502V24.0002C77.6061 20.0002 73.6061 20.0002 73.6061 20.0002L57.8561 18.0002L43.8561 16.5002L35.356 16.0002C29.356 15.5002 25.856 18.2502 25.856 18.2502C24.856 19.0002 24.0739 19.8214 23.7702 20.4474L23.3561 21.2502C22.9993 22.0609 22.9288 22.8008 23.0641 23.4723C23.7988 27.1199 30.606 28.7502 30.606 28.7502Z"
              fill="#A8CBE8"
            />
            <path
              d="M66.106 33.5002L30.606 28.7502C30.606 28.7502 23.7988 27.1199 23.0641 23.4723L23.3561 47.7502L23.1061 76.5002C23.1061 80.5002 28.356 81.2501 28.356 81.2501L48.1061 84.0001L61.3561 85.7501L67.8561 86.5001C69.8625 86.9014 70.4197 85.3703 70.5614 84.7501L70.3561 53.155V45.7502V38.2502C70.6061 33.7502 66.106 33.5002 66.106 33.5002Z"
              fill="url(#paint0_linear_90_230)"
            />
            <g filter="url(#filter1_ii_90_230)">
              <path
                d="M44.356 20.5L54.856 21.75V27.25L44.356 26V20.5Z"
                fill="url(#paint1_linear_90_230)"
              />
            </g>
            <g filter="url(#filter2_f_90_230)">
              <path
                d="M33.3559 16.0001C42.1059 15.2501 75.3559 20.5001 75.3559 20.5001L76.8559 21.5001L34.356 16.5001L23.856 20.5001C23.856 20.5001 24.6059 16.7501 33.3559 16.0001Z"
                fill="black"
                fill-opacity="0.08"
              />
            </g>
            <g filter="url(#filter3_f_90_230)">
              <path
                d="M34.0808 79.5C39.4701 81.5 68.7135 84.9209 68.7135 84.9209L69.356 86.5L50.4935 84.25L32.856 81.25L34.0808 79.5Z"
                fill="black"
                fill-opacity="0.08"
              />
            </g>
            <g filter="url(#filter4_f_90_230)">
              <path
                d="M27.356 27.795C27.3559 25.9436 34.6059 28.1392 32.7198 27.795C45.9037 30.2165 67.6051 33.8492 68.3719 33.8492C69.8212 33.8492 69.2414 36.0001 69.2414 36.0001L31.606 31.0001C30.4085 29.9428 28.8909 29.2208 27.356 27.795Z"
                fill="white"
                fill-opacity="0.15"
              />
            </g>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M41.8558 20C35.3559 20.5 34.606 25.75 39.3559 26.5C39.3559 26.5 36.106 25.5 38.356 23.5C38.356 23.5 39.106 22.75 40.856 22.25C40.856 22.25 41.606 22 42.606 22.25L62.356 24.5L72.106 25.75C72.106 25.75 74.106 26 74.106 28V76.3125L74.356 76C75.856 75.5 75.856 75 75.856 75L75.6059 27C75.606 24 73.1058 23.75 73.1058 23.75L41.8558 20Z"
              fill="#326DCD"
              fill-opacity="0.29"
            />
            <path
              d="M67.8559 30C72.6059 30.25 72.3558 34.6295 72.3558 34.6295L72.356 78.5L74.106 76.3125V28C74.106 26 72.106 25.75 72.106 25.75L62.356 24.5L42.606 22.25C41.606 22 40.856 22.25 40.856 22.25C39.106 22.75 38.356 23.5 38.356 23.5C36.106 25.5 39.3559 26.5 39.3559 26.5L60.3559 29L67.8559 30Z"
              fill="white"
            />
            <g filter="url(#filter5_f_90_230)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M74.356 27.5L75.006 26.2V75.7434C74.7904 75.8039 74.5758 75.8017 74.356 75.75V27.5ZM72.2251 56.7696L72.556 78.5L75.006 76.7415V75.7434C75.7062 75.5468 76.4175 74.6877 77.356 72.7069V21.5L75.006 26.2V25.25L71.856 32.5268L71.856 32.5313L69.356 35.3448L69.731 85L72.356 83.7069L72.2251 56.7696ZM72.2251 56.7696L71.856 32.5313L72.106 32.25L72.2251 56.7696Z"
                fill="black"
                fill-opacity="0.25"
              />
            </g>
            <g filter="url(#filter6_f_90_230)">
              <path
                d="M41.606 20L58.606 22L67.356 23.25L71.606 23.75C73.8035 23.9828 74.5847 24.433 75.606 25.5L74.356 27.25C73.2544 26.8216 74.328 26.0863 73.106 25.75C69.3358 24.7124 62.882 24.4357 59.106 24C52.606 23.25 46.856 23 41.356 22L41.606 20Z"
                fill="black"
                fill-opacity="0.25"
              />
            </g>
            <g filter="url(#filter7_ii_90_230)">
              <path
                d="M51.356 19.5L61.856 20.75V26.25L51.356 25V19.5Z"
                fill="url(#paint2_linear_90_230)"
              />
            </g>
            <g filter="url(#filter8_ii_90_230)">
              <path
                d="M44.356 20.5L54.856 21.75V27.25L44.356 26V20.5Z"
                fill="url(#paint3_linear_90_230)"
              />
            </g>
            <g filter="url(#filter9_dii_90_230)">
              <path
                d="M35.356 44.9167C35.356 43.1058 36.9483 41.7077 38.744 41.9419L55.744 44.1593C57.2382 44.3542 58.356 45.6272 58.356 47.1341V48.3148C58.356 50.1322 56.7529 51.5322 54.9521 51.2875L37.9521 48.9777C36.465 48.7757 35.356 47.5058 35.356 46.005V44.9167Z"
                fill="#CA7008"
              />
            </g>
            <g filter="url(#filter10_diiii_90_230)">
              <path
                d="M67.5897 84.4002L72.8114 78.1659C72.844 78.127 72.8613 78.0777 72.86 78.0277L72.7558 74.1198C72.7506 73.9254 72.5009 73.8593 72.392 74.0235L68.7794 79.4683C68.6787 79.6202 68.4494 79.5775 68.4185 79.4011L68.1417 77.8174C68.1098 77.6353 67.8692 77.598 67.7744 77.7604L61.9754 87.6914C61.8503 87.9056 62.1376 88.1061 62.297 87.9158L66.7864 82.5559C66.903 82.4166 67.1244 82.4847 67.1359 82.6635L67.2402 84.2926C67.2516 84.4714 67.473 84.5395 67.5897 84.4002Z"
                fill="#FACC15"
              />
            </g>
            <g filter="url(#filter11_diiii_90_230)">
              <path
                d="M59.0601 83.2969L68.4343 71.047C68.4787 70.9889 68.499 70.9158 68.4904 70.8441L67.6467 63.7658C67.6164 63.5118 67.2862 63.4474 67.1526 63.6694L60.6354 74.4988C60.5131 74.7021 60.2152 74.6697 60.1501 74.4461L59.2213 71.2574C59.154 71.0264 58.8418 71.0021 58.7279 71.2191L48.3372 91.0168C48.1815 91.3133 48.5798 91.5676 48.7833 91.3017L57.5809 79.8052C57.7256 79.616 58.0182 79.6845 58.0557 79.9163L58.5853 83.1858C58.6228 83.4175 58.9154 83.486 59.0601 83.2969Z"
                fill="#FACC15"
              />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_90_230"
              x="0"
              y="0.926758"
              width="92.3674"
              height="113.487"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-4" dy="4" />
              <feGaussianBlur stdDeviation="9.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_90_230"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_90_230"
                result="shape"
              />
            </filter>
            <filter
              id="filter1_ii_90_230"
              x="43.856"
              y="20.5"
              width="11"
              height="7.25"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="1" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_90_230"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-0.5" dy="0.5" />
              <feGaussianBlur stdDeviation="0.25" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
              />
              <feBlend
                mode="normal"
                in2="effect1_innerShadow_90_230"
                result="effect2_innerShadow_90_230"
              />
            </filter>
            <filter
              id="filter2_f_90_230"
              x="21.856"
              y="13.9268"
              width="57"
              height="9.57324"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="1"
                result="effect1_foregroundBlur_90_230"
              />
            </filter>
            <filter
              id="filter3_f_90_230"
              x="30.856"
              y="77.5"
              width="40.5"
              height="11"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="1"
                result="effect1_foregroundBlur_90_230"
              />
            </filter>
            <filter
              id="filter4_f_90_230"
              x="25.356"
              y="25.0435"
              width="46"
              height="12.9565"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="1"
                result="effect1_foregroundBlur_90_230"
              />
            </filter>
            <filter
              id="filter5_f_90_230"
              x="67.356"
              y="19.5"
              width="12"
              height="67.5"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="1"
                result="effect1_foregroundBlur_90_230"
              />
            </filter>
            <filter
              id="filter6_f_90_230"
              x="37.356"
              y="16"
              width="42.25"
              height="15.25"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="2"
                result="effect1_foregroundBlur_90_230"
              />
            </filter>
            <filter
              id="filter7_ii_90_230"
              x="50.856"
              y="19.5"
              width="11"
              height="7.25"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="1" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_90_230"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-0.5" dy="0.5" />
              <feGaussianBlur stdDeviation="0.25" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
              />
              <feBlend
                mode="normal"
                in2="effect1_innerShadow_90_230"
                result="effect2_innerShadow_90_230"
              />
            </filter>
            <filter
              id="filter8_ii_90_230"
              x="43.856"
              y="20.5"
              width="11"
              height="7.25"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="1" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_90_230"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-0.5" dy="0.5" />
              <feGaussianBlur stdDeviation="0.25" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
              />
              <feBlend
                mode="normal"
                in2="effect1_innerShadow_90_230"
                result="effect2_innerShadow_90_230"
              />
            </filter>
            <filter
              id="filter9_dii_90_230"
              x="32.856"
              y="39.4163"
              width="29"
              height="15.3992"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="0.5" dy="0.5" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_90_230"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_90_230"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-0.5" dy="0.5" />
              <feGaussianBlur stdDeviation="1" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect2_innerShadow_90_230"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="0.5" dy="-0.5" />
              <feGaussianBlur stdDeviation="1" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="effect2_innerShadow_90_230"
                result="effect3_innerShadow_90_230"
              />
            </filter>
            <filter
              id="filter10_diiii_90_230"
              x="60.5183"
              y="72.5039"
              width="13.7683"
              height="16.9145"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-0.228238" dy="0.228238" />
              <feGaussianBlur stdDeviation="0.542066" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_90_230"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_90_230"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-1.42649" dy="-1.42649" />
              <feGaussianBlur stdDeviation="1.42649" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect2_innerShadow_90_230"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-0.285298" dy="-0.285298" />
              <feGaussianBlur stdDeviation="0.285298" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
              />
              <feBlend
                mode="normal"
                in2="effect2_innerShadow_90_230"
                result="effect3_innerShadow_90_230"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="0.285298" dy="0.285298" />
              <feGaussianBlur stdDeviation="0.285298" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"
              />
              <feBlend
                mode="normal"
                in2="effect3_innerShadow_90_230"
                result="effect4_innerShadow_90_230"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="1.42649" dy="1.42649" />
              <feGaussianBlur stdDeviation="1.42649" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"
              />
              <feBlend
                mode="normal"
                in2="effect4_innerShadow_90_230"
                result="effect5_innerShadow_90_230"
              />
            </filter>
            <filter
              id="filter11_diiii_90_230"
              x="47.3035"
              y="62.5354"
              width="22.1875"
              height="29.8767"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-0.159767" dy="0.159767" />
              <feGaussianBlur stdDeviation="0.379446" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_90_230"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_90_230"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-0.998543" dy="-0.998543" />
              <feGaussianBlur stdDeviation="0.998543" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect2_innerShadow_90_230"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-0.199709" dy="-0.199709" />
              <feGaussianBlur stdDeviation="0.199709" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
              />
              <feBlend
                mode="normal"
                in2="effect2_innerShadow_90_230"
                result="effect3_innerShadow_90_230"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="0.199709" dy="0.199709" />
              <feGaussianBlur stdDeviation="0.199709" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"
              />
              <feBlend
                mode="normal"
                in2="effect3_innerShadow_90_230"
                result="effect4_innerShadow_90_230"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="0.998543" dy="0.998543" />
              <feGaussianBlur stdDeviation="0.998543" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"
              />
              <feBlend
                mode="normal"
                in2="effect4_innerShadow_90_230"
                result="effect5_innerShadow_90_230"
              />
            </filter>
            <linearGradient
              id="paint0_linear_90_230"
              x1="70.606"
              y1="51.5001"
              x2="22.856"
              y2="51.5001"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.791667" stop-color="#3B82F6" />
              <stop offset="1" stop-color="#8DACEB" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_90_230"
              x1="44.356"
              y1="23.858"
              x2="54.856"
              y2="23.858"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFD157" />
              <stop offset="1" stop-color="#F8B500" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_90_230"
              x1="61.856"
              y1="23"
              x2="51.356"
              y2="23"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#EF2125" />
              <stop offset="1" stop-color="#F07274" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_90_230"
              x1="44.356"
              y1="23.858"
              x2="54.856"
              y2="23.858"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFD157" />
              <stop offset="1" stop-color="#F8B500" />
            </linearGradient>
          </defs>
        </svg>
        <form onSubmit={authSubmitHandler}>
          <div className="input">
            <div className="label">Name</div>
            <input
              type="text"
              className=""
              name="name"
              onChange={handleChange}
              value={user.name}
              placeholder="name"
              required={true}
            />
          </div>
          <div className="input">
            <div className="label">Password</div>
            <input
              type="password"
              className=""
              name="password"
              onChange={handleChange}
              value={user.password}
              placeholder="Password"
              minLength="6"
              required={true}
            />
          </div>

          <button className="primary-btn" type="submit">
            Login
          </button>
          <p className="copyright">© Mohit 2022</p>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
