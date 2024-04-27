import React, { useState, useEffect } from 'react';
import { getAllClientproject } from '../api/project';
const MeetingForm = () => {
    const [meetingObj, setMeetingObj] = useState[{
        'projectMeetingId': 0,
        'projectId': 0,
        'meetingLeadByEmpId': 0,
        'meetingDate': '',
        'startTime': '',
        'endTime': '',
        'meetingMedium': '',
        'isRecordingAvailable': true,
        'recordingUrl': '',
        'meetingNotes': '',
        'clientPersonNames': '',
        'meetingTitle': '',
        'meetingStatus': ''
    }];
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        getListOfCLients();
        getprojects();
    }, []);

    const getprojects = () => {
        getAllClientproject().then((data) => {
            if (data.result) {
                setProjectList(data.data);
            }
        });
    }

    const onChnageText = (event, key) => {
        setMeetingObj(val => ({ ...val, [key]: event.target.value }));
    }

    return (
        <div className='row'>
            <div className='col-md-6'>
                <select className='form-select form-control-sm' onChange={(event) => onChnageText(event, 'projectId')}>
                    <option>Select Project</option>
                    {projectList.map((data) => {
                        return <option value={data.clientProjectId}>{data.projectName}</option>
                    })}
                </select>
            </div>
            <div className='col-md-4'>
                <input type='text' className='form-control form-control-sm' placeholder='Name' onChange={(event) => onChnageText(event, 'recordingUrl')} />
            </div>
        </div>
    );
};

export default MeetingForm;