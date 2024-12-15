import React from "react";

const LogoutButton = ({ onLogout }) => {
  return (
    <button className="logout-button" onClick={onLogout}>
      Çikiş Yap
    </button>
  );
};

export default LogoutButton;