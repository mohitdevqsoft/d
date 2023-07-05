import axios from "axios";

// const BASE_URL = "http://localhost:5500/";
const BASE_URL = "http://pacs.iotcom.io:5500/";

export const getDataFromServer = async ({
  end_point,
  params,
  call_back,
  props,
}) => {
  let url = BASE_URL + end_point;
  await axios
    .get(url, {
      // ...params
      headers: { Authorization: `Bearer ${params?.token}` },
    })
    .then((response) => {
     
      let object = {
        response: response?.data,
        status: "success",
        error: undefined,
        props,
       
      };
      call_back(object);
      console.log(response.data);
    })
    .catch((error) => {
      let object = {
        response: undefined,
        status: "error",
        error: error,
        props,
      };
      call_back(object);
    });
  return;
};

export const postDatatoServer = ({ end_point, body, call_back, props }) => {
  console.log("props=-=-", props);

  const header = props?.header
    ? { headers: { Authorization: `Bearer ${props?.token}` } }
    : null;

  let url = BASE_URL + end_point;

  axios
    .post(url, body, header)
    .then((response) => {
      
      console.log("response====>", response);
     
      let object = {
        response: response?.data,
        status: "success",
        error: undefined,
        props,
      };
      call_back(object);
      
    })
    .catch((error) => {
      console.log("error====>", error);

      let object = {
        response: undefined,
        status: "error",
        error: error,
        props,
      };
      call_back(object);
    });
};

export const UploadImageToServer = async ({
  end_point,
  data,
  call_back,
  props,
}) => {
  let url = BASE_URL + end_point;
  const formData = new FormData();
  console.log("___+-=-=-=-=props-=", props);
  console.log("___+-=-=-=-=data-=", data);

  formData.append("file", data, `${props.study}.docx`);

  //   formData.append("file", {
  //     fileName: `${props?.fileName}.docx`,
  //     id: props?.id,
  //     file: data[0],
  //     type: props?.type,
  //   });

  //   formData.append("file", data);
  //   formData.append("fileName", `${props?.fileName}.docx`);
  //   formData.append("id", props?.id);
  //   formData.append("type", props?.type);
  try {
    const response = await axios.post(url, formData);
    let object = {
      response: response?.data,
      status: "success",
      error: undefined,
      props,
    };
    // call_back(object);
    return object;
    // console.log("responce ", response);
  } catch (error) {
    console.log(error);
  }
};

export const downloadFileServer = async ({
  end_point,
  body,
  call_back,
  props,
}) => {
  let urls = BASE_URL + end_point;

  try {
    const response = await axios.get(urls, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${props}`);
    document.body.appendChild(link);
    link.click();
    call_back(true);
  } catch (error) {
    console.log(error);
    call_back(false);
  }
};
