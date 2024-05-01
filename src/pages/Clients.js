import React, { useState, useEffect , useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { getAllClients, saveClient, onDelete } from "../api/clients";
import AlertMessage from "../reusable/AlertMessage";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
const Clients = () => {
  const [clientList, setClientList] = useState([]);
  const [isAddClient, setIsAddClients] = useState(false);
  const [isSaved,  setIsSaved] = useState(false);
  const [clientObj, setClientObj] = useState({
    "contactPersonName": "",
    "companyName": "",
    "address": "",
    "city": "",
    "pincode": "",
    "state": "",
    "EmployeeStrength": 0,
    "gstNo": "",
    "contactNo": "",
    "regNo": ""
  });
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const [clientId,setClientId] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [paginationPageSize] = useState(5); // Set the number of rows per page
  const [paginationPage, setPaginationPage] = useState(0); // Current page number
  const [loading, setLoading] = useState(true);

  const accept = () => {
    onDelete(clientId).then((res) => {
      if(res.result){
        toast.current.show({ severity: 'success', summary: 'Confirmed', detail: 'Client has been deleted succesfully.', life: 3000 });
        getListOfCLients();
      }
    })
  }

  // useEffect(() => {
  //    getListOfCLients();
  // }, []);

  useEffect(() => {
    fetchData();
  }, [paginationPage]); // Fetch data when pagination page changes


  function getListOfCLients() {
    setisLoading(true);
    getAllClients().then((data) => {
      if (data.result) {
        setClientList(data.data);
        console.log('clientList',clientList)
        setisLoading(false);
      }
    });
  }

  const onAddClinet = () => {
    setIsSaved(false);
    setIsAddClients(true);
  };

  const onChnageText =(event,key) => {
    setClientObj(prev => ({...prev, [key]:event.target.value}));
  }

  const onSaveClients = () => {
    saveClient(clientObj).then((result) => {
      if(result.result) {
        setIsSaved(true);
        setIsAddClients(false);
      }
    })
  }

  const onDelteClient = (id) => {
    setClientId(id);
    setVisible(true);
  }

  function getListOfCLients() {
    setisLoading(true);
    getAllClients().then((data) => {
      if (data.result) {
        setClientList(data.data);
        console.log('clientList',clientList)
        setisLoading(false);
      }
    });
  }
  const fetchData = async () => {
   // try {
      setLoading(true);
    await  getAllClients().then((data) => {
        if (data.result) {
          setRowData(data.data);
          console.log('clientList',data.data)
          setisLoading(false);
        }
      });
    //  console.log(response)
     // const data = await response.json();
     // console.log(data)
     // setRowData(data.rows);
     // setTotalRows(data.total); // Total rows from the API response
   // } catch (error) {
  //    console.error('Error fetching data:', error);
  //  } 
  };

  const onPageChanged = (newPage) => {
    setPaginationPage(newPage);
  };

  const columnDefs = [
    { headerName: 'Make', field: 'make' },
    { headerName: 'Model', field: 'model' },
    { headerName: 'Price', field: 'price' }
  ];
  return (
    <div>
      <Card>
        <Card.Header>
          <div className="row">
            <div className="col-md-6 d-flex justify-content-start">
              {!isAddClient && (
                <h6 style={{ color: "brown" }}> Client List </h6>
              )}
              {isAddClient && (
                <h6 style={{ color: "brown" }}> Add New Client </h6>
              )}
            </div>
            <div className="col-md-6 d-flex justify-content-end">
              <Button
                type="button"
                label=" Add Clients"
                icon="pi pi-users"
                badgeClassName="p-badge-danger"
                onClick={onAddClinet}
                size="small"
              />
            </div>
          </div>
        </Card.Header>
        {!isAddClient && (
          <Card.Body>
            <div className="row">
              <div className="col-md-12">
                {/* <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Sr.No</th>
                      <th>Name</th>
                      <th>Comapny Name</th>
                      <th>Address</th>
                      <th>City</th>
                      <th>Contact No</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        clientList?.map((data,index) => {
                            return<tr>
                                <td>{index +1 }</td>
                                <td>{data.contactPersonName}</td>
                                <td>{data.companyName}</td>
                                <td>{data.address}</td>
                                <td>{data.city}</td>
                                <td>{data.contactNo}</td>  
                                <td><Button icon="pi pi-trash"  outlined severity="danger" aria-label="Delete" onClick={() => onDelteClient(data.clientId)}/></td>
                            </tr>
                        })
                    }
                  </tbody>
                </Table> */}
                ll
                <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        pagination={true}
      //  paginationPageSize={paginationPageSize}
      //  suppressPaginationPanel={true}
      //  suppressCellSelection={true}
      //  suppressScrollOnNewData={true}
      //  onPaginationChanged={() => onPageChanged(paginationPage)}
      //  loadingOverlayComponent={<div>Loading...</div>}
      //  noRowsOverlayComponent={<div>No rows to display</div>}
       // enableCellTextSelection={true}
      />
              </div>
            </div>
          </Card.Body>
        )}
        {isAddClient && (
          <Card.Body>
            {isSaved && (
              <AlertMessage
                alertMessage="Clents Deatils Saved"
                alertName="success"
                alertlabel="Success"
              />
            )}
            <div className="row">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Client Name"
                  onChange={(event) => onChnageText(event, "contactPersonName")}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Company Name"
                  onChange={(event) => onChnageText(event, "companyName")}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Address"
                  onChange={(event) => onChnageText(event, "address")}
                />
              </div>
            </div>
            <div className="row pt-2">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="City"
                  onChange={(event) => onChnageText(event, "city")}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="State"
                  onChange={(event) => onChnageText(event, "state")}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="Employee Strength"
                  onChange={(event) => onChnageText(event, "EmployeeStrength")}
                />
              </div>
            </div>
            <div className="row pt-2">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="GST No"
                  onChange={(event) => onChnageText(event, "gstNo")}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="Contact No"
                  onChange={(event) => onChnageText(event, "contactNo")}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Reg No"
                  onChange={(event) => onChnageText(event, "regNo")}
                />
              </div>
            </div>
            <div className="row pt-2">
              <div className="col-md-12 text-center">
                <button
                  className="btn btn-sm btn-success"
                  onClick={onSaveClients}
                >
                  Save
                </button>{" "}
                &nbsp;
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => setIsAddClients(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Card.Body>
        )}
        {isLoading && <ProgressSpinner />}
      </Card>
      <Toast ref={toast} />
      <ConfirmDialog
        group="declarative"
        visible={visible}
        onHide={() => setVisible(false)}
        message="Are you sure you want to delete this client?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={accept}
        style={{ width: "50vw" }}
        breakpoints={{ "1000px": "70vw", "760px": "80vw" }}
      />
    </div>
  );
};

export default Clients;
