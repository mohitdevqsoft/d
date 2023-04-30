import React, { useState, useEffect } from "react";
import axios from "axios";
import FileUploader from "./upload";
import Download from "./download";
import Button from 'react-bootstrap/Button';

const Table = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');

  const handelSave = (e) => {
    console.log(e.target)
    console.log(data)
    const updateData = async () => {
      try {
        const result = await axios.post(
          "http://pacs.iotcom.io:5500/api/data",
           data, 
           {headers: {"Authorization" : `Bearer ${token}`}}
           );
        const rcvData = result.data
        console.log(rcvData);
      } catch (err) {
        console.error(err);
      }
    };
    updateData();
  }

  const onChangeInput = (e, id) => {
    const { name, value } = e.target
    console.log('name', name)
    console.log('value', value)
    console.log('Id', id)

    //console.log(data)

    const editData = data.map((item) =>{
      //item.id === id && name ? { ...item, [name]: value } : item
      if (item.id === id && name){
        return item = {...item,[name]: value}  
      } else return item
    })

    //console.log(editData)
     setData(editData)
  }
  useEffect(() => {    
    const fetchData = async () => {
      try {
        const result = await axios.get("http://pacs.iotcom.io:5500/api/data", { headers: {"Authorization" : `Bearer ${token}`} });
        setData(result.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  },[token]);

  return (
    <div className="container p-4">
      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Study</th>
            <th>History</th>
            <th>Date</th>
            <th>Report</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) =>
            item.isadmin  ? (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.study}</td>
                <td>
                <input  name="history"  value = {item.history}  type="text"  onChange={(e)=>onChangeInput(e,item.id)} className="form-control" />                  
                 </td>
                <td>{item.Date}</td>
                <td>
                  <FileUploader name={item.id}/>
                </td>
              </tr>
            ) : (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.study}</td>
                <td>
                  <input  name="history"  value= {item.history}  type="text"  onChange={(e)=>onChangeInput(e,item.id)} className="form-control"/>
                  <Button id={item.id} variant="secondary" size="sm" onClick={handelSave}> save </Button>
                  </td>
                <td>{item.Date}</td>
                <td>
                  <Download name={item.id} />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
