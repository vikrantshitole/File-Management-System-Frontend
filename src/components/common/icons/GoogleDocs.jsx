import React from 'react';

const GoogleDocs = ({ size = 16, color = '#4285F4' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
      fill={color}
    />
    <path
      d="M13 9V3.5L18.5 9H13Z"
      fill="white"
    />
    <path
      d="M8 13H16V14H8V13ZM8 15H16V16H8V15ZM8 17H14V18H8V17Z"
      fill="white"
    />
  </svg>
);

export default GoogleDocs; 