import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getAllPayments,addPayment } from "../api/clients";
import Card from "react-bootstrap/Card";
import { ProgressSpinner } from 'primereact/progressspinner';
import { getAllClientproject } from '../api/project';
import AlertMessage from '../reusable/AlertMessage';

const Payment = () => {
    const [paymentObj, setPaymentObj] = useState({
        "projectPaymentId": 0,
        "projectId": 0,
        "paymentDate": "",
        "paymentMode": "",
        "amount": 0,
        "naration": ""
    });
    const [paymentList, setPaymentList] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [isAddPayment, setIsAddPayment] = useState(false);
    const [projectList, setProjectList] = useState([]);
    const [isSaveSuccess, setIsSaveSuccess] = useState(false);

    useEffect(() => {
        getListOfCLients();
        getprojects();
    }, []);

    const getListOfCLients = () => {
        setisLoading(true);
        getAllPayments().then((data) => {
            if (data.result) {
                setPaymentList(data.data);
                setisLoading(false);
            }
        });
    }
    const getprojects = () => {
        getAllClientproject().then((data) => {
            if (data.result) {
                setProjectList(data.data);
            }
        });
    }

    const onChnageText = (event, key) => {
        setPaymentObj(val => ({ ...val, [key]: event.target.value }));
    }

    const onSavePpayment = () => {
        setisLoading(true);
        addPayment(paymentObj).then((result) => {
            if (result) {
                setTimeout(() => {
                    setIsSaveSuccess(true);
                    getprojects();
                }, 1000);
                setisLoading(false);
                setIsAddPayment(false);
            }
        })
    }
    return (
        <div>
            <Card>
                <Card.Header>
                {isSaveSuccess && <AlertMessage alertName='success' alertMessage='Data has been successfully saved.' alertlabel='Success' />
            }
                    <div className='row'>
                        <div className='col-md-6 d-flex justify-content-start'>
                            <h6 style={{ color: 'brown' }}>Payment Deatils</h6>
                        </div>
                        <div className='col-md-6 d-flex justify-content-end'>
                            <button onClick={() => setIsAddPayment(true)} className='btn btn-sm btn-primary'>Add Payment</button>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className='row'>
                        <div className={`${isAddPayment ? 'col-md-8' : 'col-12'}`}>
                            <DataTable value={paymentList} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                                <Column field="paymentMode" header="Payment By" style={{ width: '25%' }}></Column>
                                <Column field="paymentDate" header="Date" style={{ width: '25%' }}></Column>
                                <Column field="amount" header="Amount" style={{ width: '25%' }}></Column>
                                <Column field="companyName" header="Company Name" style={{ width: '25%' }}></Column>
                            </DataTable> 
                            {isLoading && <ProgressSpinner />}
                        </div>
                        {isAddPayment && <div className='col-md-4'>
                            <div className='row pt-3'>
                                <div className='col-md-6'>
                                    <select className='form-select' onChange={(event) => onChnageText(event, 'projectId')}>
                                        <option>Select Project</option>
                                        {projectList.map((data) => {
                                            return <option value={data.clientProjectId}>{data.projectName}</option>
                                        })}
                                    </select>
                                </div>
                                <div className='col-md-6'>
                                    <input type='date' className='form-control' placeholder='Conatct no' onChange={(event) => onChnageText(event, 'paymentDate')} />
                                </div>
                            </div>
                            <div className='row pt-2'>
                            <div className='col-md-6'>
                                    <select className='form-select' onChange={(event) => onChnageText(event, 'paymentMode')}>
                                        <option>Select Payment Mode</option>
                                        <option value={'Cash'}>Cash</option>
                                        <option value={'Cheque'}>Cheque</option>
                                        <option value={'UPI'}>UPI</option>
                                        <option value={'Net Banking'}>Net Banking</option>
                                    </select>
                                </div>
                                <div className='col-md-6'>
                                    <input type='number' className='form-control' placeholder='Conatct no' onChange={(event) => onChnageText(event, 'amount')} />
                                </div>
                            </div>
                            <div className='row pt-2'>
                            <div className='col-md-12'>
                            <textarea id="w3review" name="w3review" rows="4" cols="50" className='form-control' placeholder='Enter Message' onChange={(event) => onChnageText(event, 'naration')} ></textarea>
                                </div>
                                </div>
                            <Card.Footer className='pt-2'>
                                <button className='btn btn-sm btn-success' onClick={onSavePpayment}>Save</button>&nbsp;
                                <button className='btn btn-sm btn-danger' onClick={() => setIsAddPayment(false)}>Cancel</button>
                            </Card.Footer>
                        </div>}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Payment;