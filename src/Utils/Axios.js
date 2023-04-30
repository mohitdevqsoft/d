import axios from 'axios';

const BASE_URL = 'http://pacs.iotcom.io:5500'

export const getDataFromServer = ({ end_point, params, call_back, props }) => {

    let url = BASE_URL + end_point
    axios.get(url, {
        ...params
    }).then(response => {

        let object = {
            response: response,
            status: 'success',
            error: undefined,
            props
        }
        call_back(object)
    }).catch(error => {

        let object = {
            response: undefined,
            status: 'error',
            error: error,
            props
        }
        call_back(object)
    })
}

export const postDatatoServer = ({ end_point, body, call_back, props }) => {

    // { headers: {"Authorization" : `Bearer ${token}`} }

    let url = BASE_URL + end_point
    axios.post(url, body).then(response => {

        let object = {
            response: response,
            status: 'success',
            error: undefined,
            props
        }
        call_back(object)
    }).catch(error => {

        let object = {
            response: undefined,
            status: 'error',
            error: error,
            props
        }
        call_back(object)
    })
}