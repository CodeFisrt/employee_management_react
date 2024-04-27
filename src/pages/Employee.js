import React, { useEffect, useState } from 'react';
import { getAllRoles, getDesignation } from '../api/master';
import { createEmployee } from '../api/employee';
import Card from 'react-bootstrap/Card';
import AlertMessage from '../reusable/AlertMessage';
import EmployeeList from './EmployeeList';

const Employee = () => {
    const [employeeObj, setEmployeeObj] = useState({
        "roleId": 0,
        "empId": 0,
        "empName": '',
        "empEmailId": '',
        "empDesignationId": 0,
        "empContactNo": '',
        "empAltContactNo": '',
        "empPersonalEmailId": '',
        "empExpTotalYear": 0,
        "empExpTotalMonth": 0,
        "empCity": '',
        "empState": '',
        "empPinCode": '',
        "empAddress": '',
        "empPerCity": '',
        "empPerState": '',
        "empPerPinCode": '',
        "empPerAddress": '',
        "password": '',
        "ErpEmployeeSkills": [
        ],
        "ErmEmpExperiences": [
        ]
    });
    const [roleList, setRoleList] = useState([]);
    const [designationList, setDesignationList] = useState([]);
    const [skillObj, setSkillObj] = useState({
        "empSkillId": 0,
        "empId": 0,
        "skill": "",
        "totalYearExp": 0,
        "lastVersionUsed": ""
    });
    const [experianceObj, setExperianceObj] = useState({
        "empExpId": 0,
        "empId": 0,
        "companyName": "",
        "startDate": "",
        "endDate": "",
        "designation": "",
        "projectsWorkedOn": ""
    });
    const [isSaveSuccess, setIsSaveSuccess] = useState(false);
    const [isNewEmployee, setNewEmployee] = useState(false);
    const [isSkilltable, setisSkilltable] = useState(false);
    const [isExperianceTable, setisExperianceTable] = useState(false);
    const onAddNewEmployee = () => {
        setNewEmployee(true);
    }

    useEffect(() => {
        getAllRoles().then((result) => {
            if (result) {
                setRoleList(result.data);
            }
        });

        getDesignation().then((result) => {
            if (result) {
                setDesignationList(result.data);
            }
        })
    }, [])

    const onChangeSkill = (event, key) => {
        setSkillObj(prevObj => ({ ...prevObj, [key]: event.target.value }));
    }

    const onAddEmployeeSkill = () => {
        setEmployeeObj(prevObj => ({ ...prevObj, ErpEmployeeSkills: [...prevObj.ErpEmployeeSkills, skillObj] }));
        setisSkilltable(true);
        setSkillObj({
            "empSkillId": 0,
            "empId": 0,
            "skill": "",
            "totalYearExp": 0,
            "lastVersionUsed": ""
        });
    }

    const onDelteSkill = (event, key) => {

    }

    const onChangeCompanyD = (event, key) => {
        setExperianceObj(prevVal => ({ ...prevVal, [key]: event.target.value }));
    }

    const onAddCompanyDeatils = () => {
        setEmployeeObj(obj => ({ ...obj, ErmEmpExperiences: [...obj.ErmEmpExperiences, experianceObj] }));
        setisExperianceTable(true);
        setExperianceObj({
            "empExpId": 0,
            "empId": 0,
            "companyName": "",
            "startDate": "",
            "endDate": "",
            "designation": "",
            "projectsWorkedOn": ""
        })
    }

    const onChnageText = (event, key) => {
        setEmployeeObj((val => ({ ...val, [key]: event.target.value })));
    }

    const onSubmitEmployee = () => {
        createEmployee(employeeObj).then((result) => {
            if (result) {
                setTimeout(() => {
                    setIsSaveSuccess(true);
                }, 1000);
                setNewEmployee(false);
            }
        })
    }

    const onCancel = () => {
        setNewEmployee(false);
    }
    return (
        <div>
            {isSaveSuccess && <AlertMessage alertName='success' alertMessage='Data has been successfully saved.' alertlabel='Success' />
            }
            <Card>
                <Card.Header>
                    <div className='row'>
                        <div className='col-md-6 d-flex justify-content-start'>
                            <h6 style={{ color: 'brown' }}>Employee Deatils</h6>
                        </div>
                        <div className='col-md-6 d-flex justify-content-end'>
                            <button onClick={onAddNewEmployee} className='btn btn-sm btn-primary'>Add Employee</button>
                        </div></div></Card.Header>
                {!isNewEmployee &&
                    <Card.Body><EmployeeList /> </Card.Body>
                }
                {isNewEmployee &&
                    <Card.Body>
                        <div className='row'>
                            <div className='col-md-8'>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <select className='form-select form-select-sm' onChange={(event) => onChnageText(event, 'roleId')}>
                                            <option>Select Role</option>
                                            {roleList.map((data) => {
                                                return <option value={data.roleId}>{data.role}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className='col-md-4'>
                                        <input type='text' className='form-control form-control-sm' placeholder='Name' onChange={(event) => onChnageText(event, 'empName')} />
                                    </div>
                                    <div className='col-md-4'>
                                        <input type='text' className='form-control form-control-sm' placeholder='Email' onChange={(event) => onChnageText(event, 'empEmailId')} />
                                    </div>
                                </div>
                                <div className='row pt-2'>
                                    <div className='col-md-3'>
                                        <select className='form-select form-select-sm' onChange={(event) => onChnageText(event, 'empDesignationId')}>
                                            <option>Select Designation</option>
                                            {designationList.map((data) => {
                                                return <option value={data.designationId}>{data.designation}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className='col-md-3'>
                                        <input type='text' className='form-control form-control-sm' placeholder='Conatct no' onChange={(event) => onChnageText(event, 'empContactNo')} />
                                    </div>
                                    <div className='col-md-3'>
                                        <input type='text' className='form-control form-control-sm' placeholder='alt Conatct no' onChange={(event) => onChnageText(event, 'empAltContactNo')} />
                                    </div>
                                    <div className='col-md-3'>
                                        <input type='text' className='form-control form-control-sm' placeholder='Personal email' onChange={(event) => onChnageText(event, 'empPersonalEmailId')} />
                                    </div>
                                </div>
                                <div className='row pt-2'>
                                    <div className='col-md-3'>
                                        <input type='text' className='form-control form-control-sm' placeholder='exp total Year' onChange={(event) => onChnageText(event, 'empExpTotalYear')} />
                                    </div>
                                    <div className='col-md-3'>
                                        <input type='text' className='form-control form-control-sm' placeholder='exp total month' onChange={(event) => onChnageText(event, 'empExpTotalMonth')} />
                                    </div>
                                    <div className='col-md-3'>
                                        <input type='text' className='form-control form-control-sm' placeholder='state' onChange={(event) => onChnageText(event, 'empState')} />
                                    </div>
                                    <div className='col-md-3'>
                                        <input type='text' className='form-control form-control-sm' placeholder='city' onChange={(event) => onChnageText(event, 'empCity')} />
                                    </div>
                                </div>
                                <div className='row pt-2'>
                                    <div className='col-md-3'>
                                        <input type='text' className='form-control form-control-sm' placeholder='Address' onChange={(event) => onChnageText(event, 'empAddress')} />
                                    </div>
                                    <div className='col-md-3'>
                                        <input type='text' className='form-control form-control-sm' placeholder='Pin code' onChange={(event) => onChnageText(event, 'empPinCode')} />
                                    </div>
                                    <div className='col-md-3'>
                                        <input type='text' className='form-control form-control-sm' placeholder='per state' onChange={(event) => onChnageText(event, 'empPerState')} />
                                    </div>
                                    <div className='col-md-3'>
                                        <input type='text' className='form-control form-control-sm' placeholder='per city' onChange={(event) => onChnageText(event, 'empPerCity')} />
                                    </div>
                                </div>
                                <div className='row pt-2'>
                                    <div className='col-md-3'>
                                        <input type='text' className='form-control form-control-sm' placeholder='per Address' onChange={(event) => onChnageText(event, 'empPerAddress')} />
                                    </div>
                                    <div className='col-md-3'>
                                        <input type='text' className='form-control form-control-sm' placeholder='per Pin code' onChange={(event) => onChnageText(event, 'empPerPinCode')} />
                                    </div>
                                    <div className='col-md-3'>
                                        <input type='password' className='form-control form-control-sm' placeholder='Password' onChange={(event) => onChnageText(event, 'password')} />
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className='row pt-2'>
                                    <div className='col-md-4'>
                                        <input type='text' className='form-control form-control-sm' placeholder='Skill' onChange={(event) => onChangeSkill(event, 'skill')} value={skillObj.skill} />
                                    </div>
                                    <div className='col-md-3'>
                                        <input type='text' className='form-control form-control-sm' placeholder='Skill Exper' onChange={(event) => onChangeSkill(event, 'totalYearExp')} value={skillObj.totalYearExp} />
                                    </div>
                                    <div className='col-md-3'>
                                        <input type='text' className='form-control form-control-sm' placeholder='Last version' onChange={(event) => onChangeSkill(event, 'lastVersionUsed')} value={skillObj.lastVersionUsed} />
                                    </div>
                                    <div className='col-md-2'><button className='btn btn-sm btn-info' onClick={onAddEmployeeSkill}>Add</button></div>
                                </div>
                                <hr />
                                {isSkilltable &&
                                    <table className='table table-bordered table-sm'>
                                        <tr>
                                            <td>Skill</td>
                                            <td>Year</td>
                                            <td>Version</td>
                                            <td>Act</td>
                                        </tr>
                                        <tbody>
                                            {employeeObj?.ErpEmployeeSkills?.map((data) => {
                                                return <tr>
                                                    <td>{data.skill}</td>
                                                    <td>{data.totalYearExp}</td>
                                                    <td>{data.lastVersionUsed}</td>
                                                    <th><button className='btn btn-sm btn-primary' onClick={(event) => onDelteSkill(event, 'skill')}>D</button></th>
                                                </tr>
                                            })

                                            }
                                        </tbody>
                                    </table>
                                }
                            </div>
                        </div>
                        <hr />
                        <div className='row pt-2'>
                            <div className='col-md-2'>
                                <input type='text' className='form-control form-control-sm' placeholder='Company Name' onChange={(event) => onChangeCompanyD(event, 'companyName')} value={experianceObj.companyName} />
                            </div>
                            <div className='col-md-2'>
                                <input type='date' className='form-control form-control-sm' placeholder='Start Date' onChange={(event) => onChangeCompanyD(event, 'startDate')} value={experianceObj.startDate} />
                            </div>
                            <div className='col-md-2'>
                                <input type='date' className='form-control form-control-sm' placeholder='End Date' onChange={(event) => onChangeCompanyD(event, 'endDate')} value={experianceObj.endDate} />
                            </div>
                            <div className='col-md-3'>
                                <input type='text' className='form-control form-control-sm' placeholder='Designataione' onChange={(event) => onChangeCompanyD(event, 'designation')} value={experianceObj.designation} />
                            </div>
                            <div className='col-md-2'>
                                <input type='text' className='form-control form-control-sm' placeholder='Project Work on' onChange={(event) => onChangeCompanyD(event, 'projectsWorkedOn')} value={experianceObj.projectsWorkedOn} />
                            </div>
                            <div className='col-md-1'><button className='btn btn-sm btn-info' onClick={onAddCompanyDeatils}>Add</button></div>
                        </div>
                        {isExperianceTable &&
                            <div className='row pt-2'>
                                <div className='col-md-12'>
                                    <table className='table table-bordered table-sm'>
                                        <tr>
                                            <td>Name</td>
                                            <td>Start Date</td>
                                            <td>End Date</td>
                                            <td>Designation</td>
                                            <td>Project</td>
                                            <td>Action</td>
                                        </tr>
                                        <tbody>
                                            {employeeObj?.ErmEmpExperiences.map((data) => {
                                                return <tr>
                                                    <td>{data.companyName}</td>
                                                    <td>{data.startDate}</td>
                                                    <td>{data.endDate}</td>
                                                    <td>{data.designation}</td>
                                                    <td>{data.projectsWorkedOn}</td>
                                                    <th><button className='btn btn-sm btn-primary'>D</button></th>
                                                </tr>
                                            })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }
                        <hr/>
                        <Card.Footer>
                            <button className='btn btn-sm btn-success' onClick={onSubmitEmployee}>Save</button>&nbsp;
                            <button className='btn btn-sm btn-danger' onClick={onCancel}>Cancel</button>
                        </Card.Footer>
                    </Card.Body>
                }
            </Card>
        </div>
    );
};

export default Employee;