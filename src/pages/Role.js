import React, { useEffect, useState } from 'react';
import { getAllRoles,getDesignation } from '../api/master';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
const Role = () => {
    const [roleList, setRoleList] = useState([]);
    const [designationList, setDesignationList] = useState([]);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        getAllRoles().then((result) => {
            if (result) {
                console.log('result22',result)
                setRoleList(result.data);
            }
        });

        getDesignation().then((result) => {
            if (result) {
                console.log('resultq',result)
                setDesignationList(result.data);
            }
        })
    }, [])
    // const fetchData = async () => {
    //     try {
    //       const response = await axios.get('ClientStrive/GetAllRoles');
    //       console.log('response',response)
    //       setData(response.data);
    //     } catch (error) {
    //       setError(error.message);
    //     }
    //   };
    return (
        <div>
            <Card className="text-center">
                <Card.Header>Role & Designation List</Card.Header>
                <Card.Body>
                    <div className='row'>
                        <div className='col-md-6'>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roleList?.map((data, index) => {
                                        return <tr>
                                          <td>{index +1}</td>
                                            <td>{data.role}</td>
                                        </tr>
                                    })
                                    }
                                </tbody>
                            </Table>
                        </div>
                        <div className='col-md-6'>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Designation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {designationList?.map((data, index) => {
                                        return <tr>
                                            <td>{index +1}</td>
                                            <td>{data.designation}</td>
                                        </tr>
                                    })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};


export default Role;