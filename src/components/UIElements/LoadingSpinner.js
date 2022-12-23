import React from "react";

import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
  return (
    <div className={`${props.asOverlay && "loading-spinner__overlay"}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24rem"
        height="27.9rem"
        viewBox="0 0 240 279"
        fill="none"
        className="bolt1"
      >
        <g filter="url(#filter0_diiii_88_56)">
          <path
            d="M63.2008 144.885L148.379 31.6498C148.817 31.067 149.453 30.6639 150.167 30.5157L220.454 15.9329C223.332 15.3357 225.263 18.8046 223.239 20.9361L143.504 104.904C141.625 106.883 143.149 110.139 145.872 109.963L177.18 107.942C179.99 107.761 181.479 111.2 179.425 113.125L28.1399 254.866C25.4631 257.374 21.4863 253.804 23.6914 250.873L100.263 149.08C101.894 146.911 100.037 143.864 97.3613 144.319L66.1021 149.645C63.4268 150.101 61.5694 147.053 63.2008 144.885Z"
            fill="#FACC15"
          />
        </g>
        <defs>
          <filter
            id="filter0_diiii_88_56"
            x="-1.94986"
            y="-9.13521"
            width="251.026"
            height="289.849"
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
              result="effect1_dropShadow_88_56"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_88_56"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="-25" dy="-25" />
            <feGaussianBlur stdDeviation="25" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect2_innerShadow_88_56"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="-5" dy="-5" />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_innerShadow_88_56"
              result="effect3_innerShadow_88_56"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="5" dy="5" />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"
            />
            <feBlend
              mode="normal"
              in2="effect3_innerShadow_88_56"
              result="effect4_innerShadow_88_56"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="25" dy="25" />
            <feGaussianBlur stdDeviation="25" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"
            />
            <feBlend
              mode="normal"
              in2="effect4_innerShadow_88_56"
              result="effect5_innerShadow_88_56"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
