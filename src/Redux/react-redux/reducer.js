import {EMPLOYEELIST, DEPARTMENTARRAY} from './constant';

const initialState = {
    employeeData : [],
    departmentData: []
}

export default function applicationReducer(state=initialState,action){
    debugger
 switch(action.type){ 
     case EMPLOYEELIST:
         return {
             ...state,
             employeeData:action.payload
         }
     
     case DEPARTMENTARRAY:
         return {
             ...state,
             departmentData:action.payload
         }
     default:
         return{
             ...state
         }

 } 
}