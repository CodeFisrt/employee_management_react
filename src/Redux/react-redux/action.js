import {EMPLOYEELIST, DEPARTMENTARRAY} from './constant';

const getEmplyeeList = (parameterData) => (dispatch) => { 
    debugger;
    console.log("getEmplyeeList called") 
    dispatch({
        type:EMPLOYEELIST,
        payload: parameterData
    })
}

const getDepartmentList = (parameterData) => (dispatch) => { 
    debugger;
    console.log("getDepartmentList called") 
    dispatch({
        type:DEPARTMENTARRAY,
        payload: {data:parameterData}
    })
}

export {getEmplyeeList, getDepartmentList}