import React from "react";
import { useNavigate } from "react-router-dom";
import ContextHelper from "../../ContextHooks/ContextHelper";
import { downloadFileServer, getDataFromServer } from "../../Utils/Axios";
import CustomHeader from "../Common/CustomHeader";
import CustomDrawer from "../Common/CustomDrawer";
import CustomTable from "../Common/CustomTable";
import ButtonCancel from "react-bootstrap/Button";
import CustomModal from "../Common/CustomModal";
import pdfImg from "../../Assets/list.png";
import docxImg from "../../Assets/docx.png";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function ViewReport() {
  //---------- state, veriable, context and hooks
  const [open, setOpen] = React.useState(false);
  const [isVisibleModal, setVisibleModal] = React.useState(false);
  const [dataModal, setDataModal] = React.useState({});
  const [isVisibleDownload, setIsVisibleDownload] = React.useState(false);
  const [downloadUri, setDownloadUri] = React.useState({});

  const [uploadSucess, setUploadSucess] = React.useState({
    historyAttach: true,
    uploadReport: true,
  });
  const [dataTable, setDataTable] = React.useState([]);
  const [newFilterData, setNewFilterData] = React.useState();

  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = ContextHelper();

  React.useEffect(() => {
    getDataFromServer({
      end_point: "api/data",
      call_back: handleResponse,
      params: currentUser,
    });
  }, [currentUser.token]);

  const handleResponse = (res) => {
    if (res?.status === "success" && res?.response) {
      setDataTable(res?.response);
    } else {
      // alert(res?.error)
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const RenderAddMoreDetails = () => {
    const hiddenFileInput = React.useRef(null);
    const hiddenFile = React.useRef(null);
    const handleClick = (key) => {
      if (key === "attach") {
        hiddenFileInput.current.click();
      } else {
        hiddenFile.current.click();
      }
    };

    //------- update Data

    const handleUdateData = (item) => {
      // console.log("-=-=-=-update data", updateData);
      // if (updateData.title || updateData.drRemark || updateData.isUrject) {
      //   postDatatoServer({
      //     end_point: `update/?id=${item.id}`,
      //     // body: updateData,
      //     call_back: (res) => {
      //       console.log("=---", res);
      //       if (res?.status === "success" && res?.response) {
      //         // getTableDataInServer();
      //       }
      //     },
      //     props: { header: true, token: currentUser?.token },
      //   });
      // } else {
      //   return;
      // }
    };

    return (
      <div className="modal_view">
        <strong style={{ textAlign: "left", marginBottom: 5 }}>Details</strong>
        <div className="box_container" style={{ justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "95%",
              alignItems: "center",
            }}
          >
            <div>
              <strong>Name </strong>
              <p className="m-0">{dataModal?.name} </p>
            </div>
            <div>
              <strong>Study</strong>
              <p className="m-0">{dataModal?.study} </p>
            </div>
            <div>
              <strong>Date</strong>
              <p className="m-0">{dataModal?.Date} </p>
            </div>
          </div>
        </div>

        <div id="add_history">
          <div
            className="d-flex flex-row justify-content-between"
            style={{ width: "55%", marginTop: 40 }}
          >
            <strong style={{ textAlign: "left", marginBottom: 5 }}>
              History
            </strong>
            <strong style={{ textAlign: "left" }}>Attach File</strong>
          </div>
          <div className="box_container">
            <div className="flex-row d-flex flex-wrap">
              <textarea
                style={{ marginBottom: 5 }}
                name="Text1"
                cols="30"
                rows="3"
                value={dataModal?.history?.title}
                readOnly={true}
              ></textarea>
              {dataModal?.history?.item?.length > 0 &&
                dataModal?.history?.item.map((img, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="upload_fileBox mr-3"
                        onClick={() => {
                          setIsVisibleDownload(true);
                          setDownloadUri({ uri: img?.uri, key: "history" });
                        }}
                      >
                        <img
                          src={pdfImg}
                          alt="harry potter"
                          style={{ height: 60, width: 60 }}
                        />
                      </div>
                    </>
                  );
                })}
            </div>
          </div>

          <strong style={{ textAlign: "left", marginTop: 40, marginBottom: 5 }}>
            Report
          </strong>
          <div className="box_container">
            <div className="flex-row d-flex flex-wrap">
              {dataModal?.reports?.length > 0 &&
                dataModal?.reports?.map((img, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="upload_fileBox"
                        style={{ height: 84, marginTop: 5 }}
                        onClick={() => {
                          setIsVisibleDownload(true);
                          setDownloadUri({ uri: img?.uri, key: "report" });
                        }}
                      >
                        <img
                          src={docxImg}
                          alt="harry potter"
                          style={{ height: 60, width: 60 }}
                        />
                      </div>
                    </>
                  );
                })}
            </div>
          </div>

          <strong style={{ textAlign: "left", marginTop: 40, marginBottom: 5 }}>
            Urjent
          </strong>
          <div className="box_container">
            <RadioGroup
              disabled
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={dataModal?.isUrgent}
              // onChange={(val) => {
              //   setDataModal({
              //     ...dataModal,
              //     isUrject: val.target.value,
              //   });
              //   if (val.target.value === "true") {
              //     setUpdateData({ ...updateData, isUrject: true });
              //   } else {
              //     setUpdateData({ ...updateData, isUrject: false });
              //   }
              // }}
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </div>

          <strong style={{ textAlign: "left", marginTop: 40, marginBottom: 5 }}>
            Doctor Remarks
          </strong>
          <div className="box_container">
            <div className="flex-row d-flex">
              <textarea
                name="Text1"
                cols="70"
                rows="2"
                value={dataModal?.drRemark}
                readOnly={true}
              ></textarea>
            </div>
          </div>

          <div className="button_group mb-3">
            <ButtonCancel
              variant="outline-dark"
              onClick={() => {
                setVisibleModal(false);
              }}
            >
              CANCEL
            </ButtonCancel>
          </div>
        </div>
      </div>
    );
  };
  const filterData = (text) => {
    if (text?.Search) {
      let searchValue = text?.Search?.e.target.Search.value;
      var finalSearchResult = dataTable.filter(
        (x) =>
          x?.name?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
          x?.study?.toLowerCase()?.includes(searchValue?.toLowerCase())
      );
      setNewFilterData(finalSearchResult);
    }

    if (text?.Name) {
      let searchValue = text?.Name?.e.target.Name.value;
      var finalSearchResult = dataTable.filter((x) =>
        x?.name?.toLowerCase()?.includes(searchValue?.toLowerCase())
      );
      setNewFilterData(finalSearchResult);
    }

    if (text?.Study) {
      let searchValue = text?.Study?.e.target.Study.value;
      var finalSearchResult = dataTable.filter((x) =>
        x?.study?.toLowerCase()?.includes(searchValue?.toLowerCase())
      );
      setNewFilterData(finalSearchResult);
    }

    if (text?.SelectDate) {
      var finalSearchResult = dataTable.filter((x) => {
        return new Date(x.Date.split(",")[0]).getTime() === text?.SelectDate;
      });
      console.log("text", finalSearchResult);
      setNewFilterData(finalSearchResult);
    }

    if (text?.key === "Urgent") {
      console.log("key", text?.e?.target?.checked);
      var finalSearchResult = dataTable.filter(
        (x) => x?.isUrgent === text?.e?.target?.checked
      );
      setNewFilterData(finalSearchResult);
      console.log("======-=-=-=-==++_+_+", finalSearchResult);
    }
    if (text?.key === "Pending") {
      console.log("key", text);
      var finalSearchResult = dataTable.filter((x) => x?.pending === true);
      setNewFilterData(finalSearchResult);
    }
    if (text?.key === "Complete") {
      console.log("key", text);
      var finalSearchResult = dataTable.filter((x) => x?.complete === true);
      setNewFilterData(finalSearchResult);
    }
    if (text?.key === "allData") {
      console.log("=====", text?.key);
      setNewFilterData(dataTable);
    }
  };
  const downloadFile = () => {
    if (downloadUri?.key === "history") {
      console.log("downloadUri", downloadUri);
      downloadFileServer({
        end_point: `getHistory/${downloadUri?.uri}`,
        props: downloadUri?.uri,
        call_back: (res) => {
          setIsVisibleDownload(false);
        },
      });
    } else if (downloadUri?.key === "report") {
      downloadFileServer({
        end_point: `getReport/${downloadUri?.uri}`,
        props: downloadUri?.uri,
        call_back: (res) => {
          setIsVisibleDownload(false);
        },
      });
    }
  };
  const RenderDownloadModal = () => {
    console.log("====", downloadUri);

    return (
      <div
        style={{
          height: 174,
          width: 235,
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h4
          style={{
            fontSize: 26,
            textAlign: "center",
          }}
        >
          Do you want to download report ?
        </h4>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 80,
          }}
        >
          <h5
            className="button_click"
            style={{ color: "red", fontSize: 23, cursor: "pointer" }}
            onClick={() => setIsVisibleDownload(false)}
          >
            NO
          </h5>
          <h5
            className="button_click"
            style={{ color: "green", fontSize: 23, cursor: "pointer" }}
            onClick={() => downloadFile()}
          >
            YES
          </h5>
        </div>
      </div>
    );
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CustomHeader
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        filterData={(text) => filterData(text)}
      />
      <CustomDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        filterData={(text) => filterData(text)}
      />
      <CustomTable
        isAdmin={currentUser?.isAdmin}
        dataTable={!newFilterData ? dataTable : newFilterData}
        columns={columns}
        call_back={(data) => {
          setVisibleModal(true);
          setDataModal(data);
        }}
      />

      {isVisibleModal && (
        <CustomModal
          isVisible={isVisibleModal}
          handleClose={() => setVisibleModal(false)}
          renderContent={RenderAddMoreDetails}
          scroll={"scloll"}
        />
      )}

      {isVisibleDownload && (
        <CustomModal
          isVisible={true}
          handleClose={() => setIsVisibleDownload(false)}
          renderContent={RenderDownloadModal}
        />
      )}
    </div>
  );
}

export default ViewReport;

const columns = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "study",
    label: "Study",
  },
  // {
  //     id: 'history', label: 'History',
  // },
  {
    id: "date",
    label: "Date",
  },
  // {
  //     id: 'report', label: 'Report',
  // },
  // {
  //     id: 'urjent', label: 'Urjent',
  // },
  {
    id: "addMore",
    label: "Other Information",
  },
];
