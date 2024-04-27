import axios from '../axiosConfig';


export function getAllClientproject() {
    return axios.get(`ClientStrive/GetAllClientProjects`).then((data) => {
        return data.data;
    }).catch((err) => {
        return err;
    })
}

export function addproject(obj) {
    return axios.post(`ClientStrive/AddUpdateClientProject`,obj).then((data) => {
        return data.data;
    }).catch((err) => {
        return err;
    })
}