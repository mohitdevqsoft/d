import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextHelper from '../../ContextHooks/ContextHelper';
import { getDataFromServer } from '../../Utils/Axios';
import CustomTable from '../Common/CustomTable';

function ViewReport() {
  //---------- state, veriable, context and hooks
  const navigate = useNavigate();
  const {
    currentUser,

  } = ContextHelper()
  const [dataTable, setDataTable] = React.useState([])

  React.useEffect(() => {

    getDataFromServer({ end_point: "api/data", call_back: handleResponse, params: currentUser })

  }, [currentUser.token]);


  const handleResponse = (res) => {

    if (res?.status === "success" && res?.response) {
      setDataTable(res?.response)

    } else {
      // alert(res?.error)
    }
  }


  return (

    <>
      <CustomTable
        dataTable={dataTable}
        columns={columns}
      />

    </>
  )


}

export default ViewReport;
const columns = [
  {
    id: 'name', label: 'Name',
  },
  {
    id: 'study', label: 'Study',
  },
  {
    id: 'history', label: 'History',
  },
  {
    id: 'date', label: 'Date',
  },
  {
    id: 'report', label: 'Report',
  },
  {
    id: 'urjent', label: 'Urjent',
  },
];