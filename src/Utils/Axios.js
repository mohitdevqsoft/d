import axios from 'axios';

const BASE_URL = 'http://pacs.iotcom.io:5500/'

export const getDataFromServer = async ({ end_point, params, call_back, props }) => {
    let url = BASE_URL + end_point
   await axios.get(url, {
        // ...params
         headers: {"Authorization" : `Bearer ${params?.token}`}
    }).then(response => {

        let object = {
            response: response?.data,
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
    return;
}

export const postDatatoServer = ({ end_point, body, call_back, props }) => {

    // { headers: {"Authorization" : `Bearer ${token}`} }
    let url = BASE_URL + end_point

    axios.post(url, body).then(response => {
console.log("response====>",response);
        let object = {
            response: response?.data,
            status: 'success',
            error: undefined,
            props
        }
        call_back(object)
    }).catch(error => {
        console.log("error====>",error);

        let object = {
            response: undefined,
            status: 'error',
            error: error,
            props
        }
        call_back(object)
    })
}

export const UploadImageToServer = async ({end_point, data, call_back, props}) => {
    let url = BASE_URL + end_point
    const formData = new FormData();
console.log("___+-=-=-=-=props-=",props);
console.log("___+-=-=-=-=data-=",data);
    formData.append('file',data[0], `${"TESTDEMO"}.docx`);
    
    try {
        const response = await axios.post(url, formData);
        let object = {
            response: response?.data,
            status: 'success',
            error: undefined,
            props
        }
        call_back(object)
        console.log('responce ',response);
      } catch (error) {
        console.log(error);
      }
    
  };