import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Card from 'react-bootstrap/Card';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getAllClientproject, addproject } from '../api/project';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { getAllClients } from "../api/clients";
import { getAllEmployee } from '../api/employee';

const Project = () => {
    const [ProjectObj, setProjectObj] = useState({
        'clientProjectId': 0,
        'projectName': '',
        'startDate': '',
        'expectedEndDate': '',
        'leadByEmpId': 0,
        'completedDate': '',
        'contactPerson': '',
        'contactPersonContactNo': '',
        'totalEmpWorking': 0,
        'projectCost': 0,
        'projectDetails': '',
        'contactPersonEmailId': '',
        'clientId': 0
    });
    const [projectList, setProjectList] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [clientList, setClientList] = useState([]);
    const [EmployeeList, setEmpList] = useState([]);

    useEffect(() => {
        getprojects();
        getListOfClients();
        getEmployee();
    }, []);

    const getEmployee = () => {
        getAllEmployee().then((data) => {
            if (data.result) {
                setEmpList(data.data);
            }
        })
    }

    const getListOfClients = () => {
        setisLoading(true);
        getAllClients().then((data) => {
            if (data.result) {
                setClientList(data.data);
                setisLoading(false);
            }
        });
    }

    const getprojects = () => {
        setisLoading(true);
        getAllClientproject().then((data) => {
            if (data.result) {
                setProjectList(data.data);
                setisLoading(false);
            }
        });
    }

    const onChangeText = (event, key) => {
        setProjectObj(pre => ({ ...pre, [key]: event.target.value }));
    }

    const onAddProject = () => {
        addproject(ProjectObj).then((data) => {
            setVisible(false);
        })
    }
    return (
        <div>
            <Card>
                <Card.Header>
                    <div className="row">
                        <div className="col-md-6 d-flex justify-content-start">
                            <h6 style={{ color: "brown" }}> Project List </h6>
                        </div>
                        <div className="col-md-6 d-flex justify-content-end">
                            <Button type="button" label=" Add Project" icon="pi pi-github" badgeClassName="p-badge-danger" onClick={() => setVisible(true)} size="small" />
                        </div>
                    </div>
                </Card.Header>
                <div className='row'>
                    <div className='col-md-12'>
                        <Card.Body>
                            <DataTable value={projectList} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                                <Column field='projectName' header='Name' style={{ width: '25%' }}></Column>
                                <Column field='startDate' header='Start Date' style={{ width: '25%' }}></Column>
                                <Column field='expectedEndDate' header='End Date' style={{ width: '25%' }}></Column>
                                <Column field='contactPerson' header='Contact Person' style={{ width: '25%' }}></Column>
                            </DataTable>
                            {isLoading && <ProgressSpinner />}
                        </Card.Body>
                    </div>
                </div>
            </Card>
            <Dialog header="Add Project" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} >
                <div className='row pt -3'>
                    <div className='col-md-6'>
                        <select onChange={(event) => onChangeText(event, 'clientId')} className='form-select'>
                            {
                                clientList.map(data => {
                                    return <option value={data.clientId}>{data.companyName}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='col-md-6'>
                        <input type='text' className='form-control form-control-sm' placeholder='Project Name' onChange={(event) => onChangeText(event, 'projectName')} />
                    </div>
                </div>
                <div className='row pt-3'>
                    <div className='col-md-3'>
                        <label>P Start date</label>
                        <input type='date' className='form-control form-control-sm' onChange={(event) => onChangeText(event, 'startDate')} />
                    </div>
                    <div className='col-md-3'>
                        <label>P End Date</label>
                        <input type='date' className='form-control form-control-sm' onChange={(event) => onChangeText(event, 'expectedEndDate')} />
                    </div>
                    <div className='col-md-6'>
                        <label>Lead By</label>
                        <select onChange={(event) => onChangeText(event, 'leadByEmpId')} className='form-select'>
                            {
                                EmployeeList.map(data => {
                                    return <option value={data.empId}>{data.empName}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className='row pt-3'>
                    <div className='col-md-3'>
                    <label>Completed Date</label>
                        <input type='date' className='form-control form-control-sm' onChange={(event) => onChangeText(event, 'completedDate')} />
                    </div>
                    <div className='col-md-5'>
                        <input type='text' className='form-control form-control-sm' placeholder='Contact Person' onChange={(event) => onChangeText(event, 'contactPerson')} />
                    </div>
                    <div className='col-md-4'>
                        <input type='text' className='form-control form-control-sm' placeholder='Contact Person mobile' onChange={(event) => onChangeText(event, 'contactPersonContactNo')} />
                    </div>
                </div>
                <div className='row pt-3'>
                <div className='col-md-3'>
                        <input type='number' className='form-control form-control-sm' placeholder='total working emp' onChange={(event) => onChangeText(event, 'totalEmpWorking')} />
                    </div>
                    <div className='col-md-3'>
                        <input type='number' className='form-control form-control-sm' placeholder='Project Cost' onChange={(event) => onChangeText(event, 'projectCost')} />
                    </div>
                    <div className='col-md-3'>
                        <input type='email' className='form-control form-control-sm' placeholder='contact Person Email Id' onChange={(event) => onChangeText(event, 'contactPersonEmailId')} />
                    </div>
                    <div className='col-md-3'>
                        <input type='text' className='form-control form-control-sm' placeholder='Project Details' onChange={(event) => onChangeText(event, 'projectDetails')} />
                    </div>
                </div>
                <div className='row pt-3'>
                    <div className='col-md-12 justify-content-middle'>
                        <button className='btn btn-sm btn-success' onClick={onAddProject}>Save</button> &nbsp;
                        <button className='btn btn-sm btn-danger'>Close</button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default Project;