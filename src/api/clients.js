import axios from '../axiosConfig';


export function getAllClients() {
    return axios.get(`ClientStrive/GetAllClients`).then((data) => {
      return  data.data;
    }).catch((err) => {
        return err;
    })
}

export function saveClient(body) {
    return axios.post(`ClientStrive/AddUpdateClient`,body).then((data) => {
        return data.data;
    }).catch((err) => {
        return err;
    })
}

export function onDelete(id) {
    return axios.delete(`ClientStrive/DeleteClientByClientId?clientId=${id}`).then((data) => {
        return data.data;
    }).catch((err) => {
        return err;
    })
}

export function getAllPayments() {
    return axios.get(`ClientStrive/GetAllPayments`).then((data) => {
      return  data.data;
    }).catch((err) => {
        return err;
    })
}
export function addPayment(body) {
    return axios.post(`ClientStrive/AddUpdatePayment`,body).then((data) => {
        return data.data;
    }).catch((err) => {
        return err;
    })
}