import { Link } from "react-router-dom";
import * as React from "react";

export const Navigation = () => {
  return (
    <div className="navigation-container">
      <div className="k-tilelayout-item-header k-card-header k-cursor-grab">
        <Link
          to="/home/account"
          className="dashboard-button"
          style={{ textDecoration: "none" }}
        >
          <button
            style={{ color: "black" }}
            className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base"
            type="button"
          >
            <span className="k-icon k-i-user k-button-icon"></span>
            <span className="k-button-text">Account</span>
          </button>
        </Link>
      </div>
    </div>
  );
};
