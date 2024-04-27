import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" >
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link" aria-current="page">
            <Link to='/role' className='linkName'><i className="pi pi-verified" style={{fontWeight:'bold'}}></i>&nbsp;&nbsp;Role & De</Link>
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <Link to='/employee' className='linkName'><i className="pi pi-users" style={{fontWeight:'bold'}}></i>&nbsp;&nbsp;Employee</Link>
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <Link to='/client' className='linkName'><i className="pi pi-user" style={{fontWeight:'bold'}}></i>&nbsp;&nbsp;Clients</Link>
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <Link to='/project' className='linkName'><i className="pi pi-github" style={{fontWeight:'bold'}}></i>&nbsp;&nbsp;Project</Link>
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <Link to='/meeting' className='linkName'><i className="pi pi-sitemap" style={{fontWeight:'bold'}}></i>&nbsp;&nbsp;Meeting</Link>
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <Link to='/payment' className='linkName'><i className="pi pi-dollar" style={{fontWeight:'bold'}}></i>&nbsp;&nbsp;Payment</Link>
          </a>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
          <strong>mdo</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

