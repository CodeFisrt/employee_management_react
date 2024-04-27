import React, { useEffect, useState } from "react";
import { getAllMeetings } from "../api/employee";
import Table from "react-bootstrap/Table";

const Meetings = () => {
  const [meetingList, setMeetingList] = useState([]);

  useEffect(() => {
    try {
      getAllMeetings().then((data) => {
        if (data.result) {
          setMeetingList(data.data);
        }
      });
    } catch (error) {}
  }, []);
  return (
    <div className="row">
      <div className="col-md-12">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Name</th>
              <th>Code</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {meetingList?.map((data, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{data.empName}</td>
                  <td>{data.empCode}</td>
                  <td>{data.empDesignation}</td>
                  <td>{data.empEmailId}</td>
                  <td>{data.role}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Meetings;
