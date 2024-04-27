import React from "react";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear('token');
    navigate('/login')
  }
  return (
    <header className="header">
      <div className="row pt-2">
        <div className="col-md-6">
          <h6 className="d-flex justify-content-start">
           &nbsp; Employee Mangment
          </h6>
        </div>
        <div className="col-md-6  d-flex justify-content-end">
          <button className="btn btn-sm btn-info" onClick={onLogout}>
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
