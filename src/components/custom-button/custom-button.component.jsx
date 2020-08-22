import React from "react";

import "./custom-button.styles.scss";

const CustomButton = ({ children, isGoogleSignIn, ...other }) => (
  <button
    type="button"
    className={`${isGoogleSignIn ? "google-sign-in" : ""} custom-button`}
    {...other}
  >
    {children}
  </button>
);

export default CustomButton;
