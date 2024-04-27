import axios from '../axiosConfig';

export function createEmployee(empObj) {
    return axios.post(`ClientStrive/CreateNewEmployee`, empObj).then((data) => {
        return data.data;
    }).catch((err) => {
        return err;
    })
}
export function getAllEmployee() {
    return axios.get(`ClientStrive/GetAllEmployee`).then((data) => {
        return data.data;
    }).catch((err) => {
        return err;
    })
}
export function getAllMeetings() {
    return axios.get(`ClientStrive/GetAllMeetings`).then((data) => {
        return data.data;
    }).catch((err) => {
        return err;
    })
}
