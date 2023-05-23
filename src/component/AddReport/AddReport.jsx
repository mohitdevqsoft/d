//---------- imports
// react
import React from "react";

// third party lib
import ButtonCancel from "react-bootstrap/Button";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ClearIcon from "@mui/icons-material/Clear";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Spinner } from "react-bootstrap";

// common
import ContextHelper from "../../ContextHooks/ContextHelper";
import CustomHeader from "../Common/CustomHeader";
import CustomDrawer from "../Common/CustomDrawer";
import CustomTable from "../Common/CustomTable";
import CustomModal from "../Common/CustomModal";

// helpers || Utils
import {
  UploadImageToServer,
  downloadFileServer,
  getDataFromServer,
  postDatatoServer,
} from "../../Utils/Axios";

// images and icon
import pdfImg from "../../Assets/list.png";
import docxImg from "../../Assets/docx.png";

//---------- main component
function AddReport() {
  //---------- state, veriable, context and hooks
  const { currentUser } = ContextHelper();
  const [open, setOpen] = React.useState(false);
  const [isVisibleModal, setVisibleModal] = React.useState(false);
  const [dataModal, setDataModal] = React.useState({});
  const [isVisibleDownload, setIsVisibleDownload] = React.useState(false);
  const [downloadUri, setDownloadUri] = React.useState({});
  const [getUplodImages, setGetUploadImages] = React.useState([]);
  const [loder, setLoder] = React.useState({});
  const [uploadSucess, setUploadSucess] = React.useState({
    ReportDelete: true,
  });
  const [dataTable, setDataTable] = React.useState([]);
  const [newFilterData, setNewFilterData] = React.useState();
  const [updateData, setUpdateData] = React.useState({});

  //---------- life cycles
  React.useEffect(() => {
    getTableDataInServer();
  }, [currentUser.token]);

  //------------ user's actions

  //  Get Table Data
  const getTableDataInServer = () => {
    getDataFromServer({
      end_point: "api/data",
      call_back: handleResponse,
      params: currentUser,
    });
  };

  // Get Call_back Response data
  const handleResponse = (res) => {
    if (res?.status === "success" && res?.response) {
      setDataTable(res?.response?.reverse());
    } else {
      // alert(res?.error)
    }
  };

  // Open SideBar Action
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Close SideBar Action
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Fiter Data
  const filterData = (text) => {
    if (text?.Search) {
      let searchValue = text?.Search?.e.target.Search.value;
      let finalSearchResult = dataTable.filter(
        (x) =>
          x?.name?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
          x?.study?.toLowerCase()?.includes(searchValue?.toLowerCase())
      );
      setNewFilterData(finalSearchResult);
    }

    if (text?.Name) {
      let searchValue = text?.Name?.e.target.Name.value;
      let finalSearchResult = dataTable.filter((x) =>
        x?.name?.toLowerCase()?.includes(searchValue?.toLowerCase())
      );
      setNewFilterData(finalSearchResult);
    }

    if (text?.Study) {
      let searchValue = text?.Study?.e.target.Study.value;
      let finalSearchResult = dataTable.filter((x) =>
        x?.study?.toLowerCase()?.includes(searchValue?.toLowerCase())
      );
      setNewFilterData(finalSearchResult);
    }

    if (text?.SelectDate) {
      console.log("text?.SelectDate", text?.SelectDate);

      let finalSearchResult = dataTable.filter((x) => {
        var dateSplit = x.Date.split(",");
        return text?.SelectDate == dateSplit[0];
      });
      setNewFilterData(finalSearchResult);
    }

    if (text?.key === "Urgent") {
      let finalSearchResult = dataTable.filter(
        (x) => x?.isUrgent === text?.e?.target?.checked
      );
      setNewFilterData(finalSearchResult);
    }
    if (text?.key === "Pending") {
      let finalSearchResult = dataTable.filter((x) => x?.pending === true);
      setNewFilterData(finalSearchResult);
    }
    if (text?.key === "Complete") {
      let finalSearchResult = dataTable.filter((x) => x?.complete === true);
      setNewFilterData(finalSearchResult);
    }
    if (text?.key === "allData") {
      setNewFilterData(dataTable);
    }
  };

  // Download Report and history image
  const downloadFile = () => {
    if (downloadUri?.key === "history") {
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

  // Renders download modal
  const RenderDownloadModal = () => {
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

  // Renders AddMore  modal
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
    //------- upload image server

    const handleUplodImage = async (item, key) => {
      if (key === "report") {
        setLoder({
          isUpoadReport: true,
        });
        try {
          const promisesArray = getUplodImages?.map(async (file) => {
            const responseImage = UploadImageToServer({
              end_point: `upload/report/?id=${item.id}`,
              data: file,
              // call_back: handleResponseImge,
              props: dataModal,
            });

            return responseImage;
          });

          const dataArray = await Promise.all(promisesArray);
          if (dataArray.length > 0) {
            setLoder({});
            getTableDataInServer();
            setUploadSucess({
              uploadReport: false,
            });
          } else {
            setLoder({});
          }
        } catch (err) {
          setLoder(null);
        }
      }
    };

    //------- update Data

    const handleUdateData = (item) => {
      if (updateData.drRemark) {
        postDatatoServer({
          end_point: `update/?id=${item.id}`,
          body: updateData,
          call_back: (res) => {
            if (res?.status === "success" && res?.response) {
              getTableDataInServer();
            }
          },
          props: { header: true, token: currentUser?.token },
        });
      } else {
        return;
      }
    };

    //----------------------return------------------
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
              <p className="m-0">{dataModal?.name || ""} </p>
            </div>
            <div>
              <strong>Study</strong>
              <p className="m-0">{dataModal?.study || ""} </p>
            </div>
            <div>
              <strong>Date</strong>
              <p className="m-0">{dataModal?.Date || ""} </p>
            </div>
          </div>
        </div>

        <div id="add_history">
          {/* ------------------- history Upload and View  */}
          <>
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
                {Array.isArray(dataModal?.history?.item) &&
                  dataModal?.history?.item?.map((img, index) => {
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
          </>

          {/* ------------------- isUrjent  View  */}
          <>
            <strong
              style={{ textAlign: "left", marginTop: 40, marginBottom: 5 }}
            >
              Urjent
            </strong>
            <div className="box_container">
              <RadioGroup
                disabled
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={dataModal?.isUrgent}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </div>
          </>

          {/* ------------------- upload  Report View  */}
          <>
            <strong
              style={{ textAlign: "left", marginTop: 40, marginBottom: 5 }}
            >
              Upload Report
            </strong>
            <div className="box_container">
              <div className="flex-row d-flex flex-wrap">
                {Array.isArray(dataModal?.reports) &&
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
                {getUplodImages?.length > 0 ? (
                  getUplodImages?.map((img, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className="upload_fileBox"
                          style={{ height: 84, marginTop: 5 }}
                        >
                          <img
                            src={docxImg}
                            alt="harry potter"
                            style={{ height: 60, width: 60 }}
                          />
                          {uploadSucess?.ReportDelete && (
                            <div
                              className="delete_file"
                              onClick={() => {
                                let value = getUplodImages.filter(
                                  (item) => item?.name !== img?.name
                                );
                                setGetUploadImages(value);
                              }}
                            >
                              <ClearIcon sx={{ color: "#fff", fontSize: 15 }} />
                            </div>
                          )}
                        </div>
                        {index === getUplodImages?.length - 1 && (
                          <div
                            className="upload_fileBox mr-2 mt-1"
                            style={{ height: 84, marginTop: 5 }}
                            onClick={() => {
                              handleClick();
                            }}
                          >
                            <FileUploadIcon />
                          </div>
                        )}
                      </>
                    );
                  })
                ) : (
                  <div
                    className="upload_fileBox mr-2 mt-1"
                    style={{ width: 67, height: 84 }}
                    onClick={handleClick}
                  >
                    <FileUploadIcon />
                  </div>
                )}
              </div>

              <input
                type="file"
                accept=".docx"
                ref={hiddenFile}
                style={{ display: "none" }}
                onChange={(e) =>
                  setGetUploadImages([...getUplodImages, e.target.files[0]])
                }
              />
              <div className="mt-1 justify-content-end d-flex">
                {loder?.isUpoadReport ? (
                  <Spinner animation="border" variant="primary" />
                ) : (
                  <ButtonCancel
                    variant="outline-primary"
                    onClick={() => handleUplodImage(dataModal, "report")}
                  >
                    Save
                  </ButtonCancel>
                )}
              </div>
            </div>
          </>

          {/* ------------------- DrRemart  View  */}
          <>
            <strong
              style={{ textAlign: "left", marginTop: 40, marginBottom: 5 }}
            >
              Doctor Remarks
            </strong>
            <div className="box_container">
              <div className="flex-row d-flex">
                <textarea
                  name="Text1"
                  cols="70"
                  rows="2"
                  value={dataModal?.drRemark}
                  onChange={(e) => {
                    setDataModal({
                      ...dataModal,
                      drRemark: e.target.value,
                    });
                    setUpdateData({ ...updateData, drRemark: e.target.value });
                  }}
                ></textarea>
              </div>
            </div>
          </>

          {/* -------------------Button Save And Cancel  */}
          <div className="button_group mb-3">
            <ButtonCancel
              variant="outline-dark"
              onClick={() => {
                setVisibleModal(false);
                setGetUploadImages([]);
              }}
            >
              CANCEL
            </ButtonCancel>
            <Button
              variant="contained"
              component="label"
              onClick={() => {
                setVisibleModal(false);
                setGetUploadImages([]);
                handleUdateData(dataModal);
              }}
            >
              SUBMIT
            </Button>
          </div>
        </div>
      </div>
    );
  };

  //---------- main return

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* ------------------- Header */}
      <CustomHeader
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        filterData={(text) => filterData(text)}
      />

      {/* ------------------- SideBar View  */}
      <CustomDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        filterData={(text) => filterData(text)}
      />

      {/* ------------------- Table View  */}
      <CustomTable
        isAdmin={currentUser?.isAdmin}
        dataTable={!newFilterData ? dataTable : newFilterData}
        columns={columns}
        call_back={(data) => {
          setVisibleModal(true);
          setDataModal(data);
        }}
      />

      {/* -------------------AddMore Modal  View  */}

      {isVisibleModal && (
        <CustomModal
          isVisible={isVisibleModal}
          handleClose={() => setVisibleModal(false)}
          renderContent={RenderAddMoreDetails}
          scroll={"scloll"}
          call_back={(data) => {
            setVisibleModal(true);
            setDataModal(data);
            setGetUploadImages([]);
          }}
        />
      )}

      {/* ------------------- Download Modal Confirm   */}

      {isVisibleDownload && (
        <CustomModal
          isVisible={isVisibleDownload}
          handleClose={() => setIsVisibleDownload(false)}
          renderContent={RenderDownloadModal}
        />
      )}
    </div>
  );
}

//---------- export component
export default AddReport;

//---------- constants
const columns = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "study",
    label: "Study",
  },
  {
    id: "date",
    label: "Date",
  },
  {
    id: "addMore",
    label: "Other Information",
  },
];
