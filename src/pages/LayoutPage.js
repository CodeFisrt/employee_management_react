import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import '../css/Layout.css';
import { Route, Routes } from 'react-router-dom';
import Employee from './Employee';
import Project from './Project';
import Meetings from './Meetings';
import Role from './Role';
import Payment from './Payment';
import Clients from './Clients';
const LayoutPage = () => {
    return (
        <div className="containers">
            <Header/>
            <div className="main-content">
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route path='/employee' element={<Employee />}></Route>
                        <Route path='/project' element={<Project/>}></Route>
                        <Route path='/client' element={<Clients></Clients>}></Route>
                        <Route path='/role' element={<Role />}></Route>
                        <Route path='/payment' element={<Payment />}></Route>
                        <Route path='/meeting' element={<Meetings />}></Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default LayoutPage;