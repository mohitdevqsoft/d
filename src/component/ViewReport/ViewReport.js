import React from "react";

// third party lib
import ClearIcon from "@mui/icons-material/Clear";
import Radio from "@mui/material/Radio";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Button from "@mui/material/Button";
import ButtonCancel from "react-bootstrap/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Spinner } from "react-bootstrap";

// common
import ContextHelper from "../../ContextHooks/ContextHelper";
import CustomTable from "../Common/CustomTable";
import CustomModal from "../Common/CustomModal";
import CustomHeader from "../Common/CustomHeader";
import CustomDrawer from "../Common/CustomDrawer";

// helpers || Utils
import {
  downloadFileServer,
  getDataFromServer,
  postDatatoServer,
  UploadImageToServer,
} from "../../Utils/Axios";

// images and icon
import pdfImg from "../../Assets/list.png";
import docxImg from "../../Assets/docx.png";

const ViewReport = () => {
  //---------- state, veriable, context and hooks
  const { currentUser } = ContextHelper();
  const [dataTable, setDataTable] = React.useState([]);
  const [dataModal, setDataModal] = React.useState({});
  const [isVisibleModal, setVisibleModal] = React.useState(false);
  const [getUplodImages, setGetUploadImages] = React.useState([]);
  const [getHistoryImages, setGetHistoryImages] = React.useState([]);
  const [updateData, setUpdateData] = React.useState({});
  const [loder, setLoder] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [newFilterData, setNewFilterData] = React.useState();
  const [downloadUri, setDownloadUri] = React.useState({});
  const [isVisibleDownload, setIsVisibleDownload] = React.useState(false);
  const [uploadSucess, setUploadSucess] = React.useState({
    historyDelete: true,
    ReportDelete: true,
  });

  //---------- life cycles
  React.useEffect(() => {
    getTableDataInServer();
  }, [currentUser.token]);

  const getTableDataInServer = () => {
    getDataFromServer({
      end_point: "api/data",
      call_back: handleResponse,
      params: currentUser,
    });
  };
  const handleResponse = (res) => {
    if (res?.status === "success" && res?.response) {
      setDataTable(res?.response);
    } else {
      // alert(res?.error)
    }
  };

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

          console.log("responseImage", promisesArray);

          const dataArray = await Promise.all(promisesArray);
          if (dataArray.length > 0) {
            setLoder({});
            getTableDataInServer();
            setUploadSucess({
              historyDelete: false,
            });
          } else {
            setLoder({});
          }
          console.log("=-=dataArray-=--", dataArray);
        } catch (err) {
          setLoder(null);
        }
      } else {
        setLoder({
          isHitoryUplod: true,
        });
        try {
          const promisesArray = getHistoryImages?.map(async (file) => {
            const responseImage = UploadImageToServer({
              end_point: `upload/history/?id=${item.id}`,
              data: file,
              // call_back: handleResponseImge,
              props: dataModal,
            });

            return responseImage;
          });

          console.log("responseImage", promisesArray);

          const dataArray = await Promise.all(promisesArray);
          if (dataArray.length > 0) {
            setLoder({});
            getTableDataInServer();
            setUploadSucess({
              ReportDelete: false,
            });
          } else {
            setLoder({});
          }
          console.log("=-=dataArray-=--", dataArray);
        } catch (err) {
          setLoder(null);
        }
      }
    };

    //------- update Data

    const handleUdateData = (item) => {
      console.log("-=-=-=-update data", updateData);

      if (updateData.title || updateData.drRemark || updateData.isUrgent) {
        postDatatoServer({
          end_point: `update/?id=${item.id}`,
          body: updateData,
          call_back: (res) => {
            console.log("=---", res);
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
              Add History
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
                onChange={(e) => {
                  setDataModal({
                    ...dataModal,
                    history: { ...dataModal.history, title: e.target.value },
                  });
                  setUpdateData({ ...updateData, title: e.target.value });
                }}
              ></textarea>
              {dataModal?.history?.item?.length > 0 &&
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
              {getHistoryImages?.length > 0 ? (
                getHistoryImages?.map((img, index) => {
                  return (
                    <>
                      <div key={index} className="upload_fileBox mr-3">
                        <img
                          src={pdfImg}
                          alt="harry potter"
                          style={{ height: 60, width: 60 }}
                        />
                        {uploadSucess?.historyDelete && (
                          <div
                            className="delete_file"
                            onClick={() => {
                              let value = getHistoryImages.filter(
                                (item) => item?.name !== img?.name
                              );
                              console.log("val", value);
                              setGetHistoryImages(value);
                            }}
                          >
                            <ClearIcon sx={{ color: "#fff", fontSize: 15 }} />
                          </div>
                        )}
                      </div>
                      {index === getHistoryImages.length - 1 && (
                        <div
                          className="upload_fileBox mr-3"
                          onClick={() => {
                            handleClick("attach");
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
                  className="upload_fileBox mr-3"
                  onClick={() => {
                    handleClick("attach");
                  }}
                >
                  <FileUploadIcon />
                </div>
              )}
            </div>

            <input
              type="file"
              ref={hiddenFileInput}
              style={{ display: "none" }}
              onChange={(e) =>
                setGetHistoryImages([...getHistoryImages, e.target.files[0]])
              }
              // accept=".docx"
            />
            <div className="mt-1 justify-content-end d-flex">
              {loder.isHitoryUplod ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <ButtonCancel
                  variant="outline-primary"
                  onClick={() => {
                    handleUplodImage(dataModal, "history");
                    handleUdateData(dataModal);
                  }}
                >
                  Save
                </ButtonCancel>
              )}
            </div>
          </div>
          <strong style={{ textAlign: "left", marginTop: 40, marginBottom: 5 }}>
            Urjent
          </strong>
          <div className="box_container">
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={dataModal?.isUrgent}
              onChange={(val) => {
                setDataModal({
                  ...dataModal,
                  isUrgent: val.target.value,
                });
                if (val.target.value === "true") {
                  setUpdateData({ ...updateData, isUrgent: true });
                } else {
                  setUpdateData({ ...updateData, isUrgent: false });
                }
              }}
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </div>
          <strong style={{ textAlign: "left", marginTop: 40, marginBottom: 5 }}>
            Upload Report
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
            Doctor Remarks
          </strong>
          <div className="box_container">
            <div className="flex-row d-flex">
              <textarea
                name="Text1"
                cols="80"
                rows="2"
                readOnly={true}
                value={dataModal?.drRemark}
              ></textarea>
            </div>
          </div>

          <div className="button_group mb-3">
            <ButtonCancel
              variant="outline-dark"
              onClick={() => {
                setVisibleModal(false);
                setGetHistoryImages([]);
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
                setGetHistoryImages([]);
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
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const filterData = (text) => {
    if (text?.Search) {
      let searchValue = text?.Search?.e.target.Search.value;
      var finalSearchResult = dataTable.filter(
        (x) =>
          x?.name?.toLowerCase()?.includes(searchValue) ||
          x?.study?.toLowerCase()?.includes(searchValue)
      );
      setNewFilterData(finalSearchResult);
    }

    if (text?.Name) {
      let searchValue = text?.Name?.e.target.Name.value;
      var finalSearchResult = dataTable.filter((x) =>
        x?.name?.toLowerCase()?.includes(searchValue)
      );
      setNewFilterData(finalSearchResult);
    }

    if (text?.Study) {
      let searchValue = text?.Study?.e.target.Study.value;
      var finalSearchResult = dataTable.filter((x) =>
        x?.study?.toLowerCase()?.includes(searchValue)
      );
      setNewFilterData(finalSearchResult);
    }

    if (text?.SelectDate) {
      var finalSearchResult = dataTable.filter((x) => {
        return new Date(x.Date.split(",")[0]).getTime() === text?.SelectDate;
      });
      setNewFilterData(finalSearchResult);
    }

    if (text?.key === "Urgent") {
      console.log("key", text);
      var finalSearchResult = dataTable.filter(
        (x) => x?.isUrgent === text?.e?.target?.checked
      );
      console.log("+_+_+_+_+__+", finalSearchResult);
      setNewFilterData(finalSearchResult);
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
        dataTable={!newFilterData ? dataTable : newFilterData}
        columns={columns}
        isAdmin={true}
        call_back={(data) => {
          setVisibleModal(true);
          setDataModal(data);
          setGetHistoryImages([]);
          setGetUploadImages([]);
        }}
      />

      {isVisibleModal && (
        <CustomModal
          isVisible={isVisibleModal}
          handleClose={() => {
            setVisibleModal(false);
            setGetHistoryImages([]);
          }}
          renderContent={RenderAddMoreDetails}
          scroll={"scloll"}
        />
      )}

      {isVisibleDownload && (
        <CustomModal
          isVisible={isVisibleDownload}
          handleClose={() => setIsVisibleDownload(false)}
          renderContent={RenderDownloadModal}
        />
      )}
    </div>
  );
};

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
