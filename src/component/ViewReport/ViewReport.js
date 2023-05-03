import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextHelper from '../../ContextHooks/ContextHelper';
import { getDataFromServer } from '../../Utils/Axios';
import CustomHeader from '../Common/CustomHeader';
import CustomDrawer from '../Common/CustomDrawer';
import CustomTable from '../Common/CustomTable';

function ViewReport() {
  //---------- state, veriable, context and hooks
  const [open, setOpen] = React.useState(false);
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (

    <div style={{ display: open && 'flex', width: '90%' }}>
      <CustomHeader open={open} handleDrawerOpen={handleDrawerOpen} />
      <CustomDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <CustomTable
        dataTable={dataTable}
        columns={columns}
      />
    </div>
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