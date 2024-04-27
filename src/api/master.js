import axios from '../axiosConfig';

export function getAllRoles() {
    return axios.get(`ClientStrive/GetAllRoles`).then((res) => {
        return res.data;
    }).catch((err) => {
        return err;
    })
}

export function getDesignation() {
    return axios.get(`ClientStrive/GetAllDesignation`).then((res) =>{
        return res.data;
    }).catch((err) => {
        return err;
    })
}

export function login(loginObj) {
    return axios.post(`ClientStrive/Login`,loginObj).then((res) => {
      return res.data.data;
    }).catch((err) => {
        return err;
    })
}
