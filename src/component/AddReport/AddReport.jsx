import React from "react";
import ContextHelper from "../../ContextHooks/ContextHelper";
import {
  getDataFromServer,
  postDatatoServer,
  UploadImageToServer,
} from "../../Utils/Axios";
import CustomTable from "../Common/CustomTable";
import Button from "@mui/material/Button";
import ButtonCancel from "react-bootstrap/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CustomModal from "../Common/CustomModal";
import pdfImg from "../../Assets/list.png";
import docxImg from "../../Assets/docx.png";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ClearIcon from "@mui/icons-material/Clear";
import FileUploader from "../upload";
import { Spinner } from "react-bootstrap";
import CustomHeader from "../Common/CustomHeader";
import CustomDrawer from "../Common/CustomDrawer";
const AddReport = () => {
  //---------- state, veriable, context and hooks
  const { currentUser } = ContextHelper();
  const [dataTable, setDataTable] = React.useState([]);
  const [dataModal, setDataModal] = React.useState({});
  const [isVisibleModal, setVisibleModal] = React.useState(false);
  const [getUplodImages, setGetUploadImages] = React.useState([]);
  const [getHistoryImages, setGetHistoryImages] = React.useState([]);
  const [historyTitle, setHistoryTitle] = React.useState("");
  const [loder, setLoder] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [newFilterData, setNewFilterData] = React.useState();

  const [uploadSucess, setUploadSucess] = React.useState({
    historyAttach: true,
    uploadReport: true,
  });
  React.useEffect(() => {
    getDataFromServer({
      end_point: "api/data",
      call_back: handleResponse,
      params: currentUser,
    });
  }, [currentUser.token]);
  console.log("+_=--", historyTitle);

  const handleResponse = (res) => {
    if (res?.status === "success" && res?.response) {
      setDataTable(res?.response);
    } else {
      // alert(res?.error)
    }
  };
  const handleResponseImge = (res) => {
    console.log("----res----", res);
    if (res?.status === "success" && res?.response) {
      setUploadSucess({
        ...uploadSucess,
        uploadReport: false,
      });
    } else {
      // alert(res?.error)
    }
  };

  // console.log("====+getUplodImages+++++++++", getUplodImages);

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
      setLoder({
        isUpoadReport: true,
      });
      try {
        const promisesArray = getUplodImages.map(async (file) => {
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
          setUploadSucess({
            ...uploadSucess,
            uploadReport: false,
          });
        } else {
          setLoder({});
        }
        console.log("=-=dataArray-=--", dataArray);
      } catch (err) {
        setLoder(null);
      }

      // if (key === "report") {
      //   UploadImageToServer({
      //     end_point: `upload/report/?id=${item.id}`,
      //     data: getUplodImages,
      //     call_back: handleResponseImge,
      //     props: dataModal,
      //   });
      // } else {
      //   UploadImageToServer({
      //     end_point: `upload/history/?id=${item.id}`,
      //     data: getHistoryImages,
      //     call_back: handleResponseImge,
      //     props: item,
      //   });
      // }
    };

    //------- update Data

    const handleUdateData = (item) => {
      postDatatoServer({
        end_point: `update/?id=${item.id}`,
        body: {
          title: historyTitle,
          drRemark: " bhopal indore ",
        },
        call_back: (res) => {
          console.log("=---", res);
        },
        props: { header: true, token: currentUser?.token },
      });
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
            <div className="flex-row d-flex">
              <textarea
                name="Text1"
                cols="30"
                rows="3"
                value={dataTable?.history?.title}
                onChange={(e) => setHistoryTitle(e.target.value)}
              ></textarea>
              {getHistoryImages.length > 0 ? (
                getHistoryImages.map((img, index) => {
                  return (
                    <>
                      <div key={index} className="upload_fileBox mr-3">
                        <img
                          src={pdfImg}
                          alt="harry potter"
                          style={{ height: 60, width: 60 }}
                        />
                        {uploadSucess?.historyAttach && (
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
            Upload Report
          </strong>
          <div className="box_container">
            <div className="flex-row d-flex">
              {getUplodImages.length > 0 ? (
                getUplodImages.map((img, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="upload_fileBox"
                        style={{ height: 84 }}
                      >
                        <img
                          src={docxImg}
                          alt="harry potter"
                          style={{ height: 60, width: 60 }}
                        />
                        {uploadSucess?.uploadReport && (
                          <div
                            className="delete_file"
                            onClick={() => {
                              let value = getUplodImages.filter(
                                (item) => item?.name !== img?.name
                              );
                              console.log("val", value);
                              setGetUploadImages(value);
                            }}
                          >
                            <ClearIcon sx={{ color: "#fff", fontSize: 15 }} />
                          </div>
                        )}
                      </div>
                      {index === getUplodImages.length - 1 && (
                        <div
                          className="upload_fileBox mr-3"
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
                  className="upload_fileBox ms-0"
                  style={{ width: 70, height: 84 }}
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
              {loder.isUpoadReport ? (
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

          <strong style={{ textAlign: "left", marginTop: 40, marginBottom: 5 }}>
            Urjent
          </strong>
          <div className="box_container">
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </div>

          <strong style={{ textAlign: "left", marginTop: 40, marginBottom: 5 }}>
            Doctor Remarks
          </strong>
          <div className="box_container">
            <div className="flex-row d-flex">
              <textarea name="Text1" cols="70" rows="2"></textarea>
            </div>
            <div className="mt-1 justify-content-end d-flex">
              <ButtonCancel
                variant="outline-primary"
              // onClick={() =>
              >
                Save
              </ButtonCancel>
            </div>
          </div>

          <div className="button_group mb-3">
            <ButtonCancel
              variant="outline-dark"
              onClick={() => setVisibleModal(false)}
            >
              CANCEL
            </ButtonCancel>
            <Button
              variant="contained"
              component="label"
              onClick={() => setVisibleModal(false)}
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
        return (
          new Date(x.Date.split(',')[0]).getTime() === text?.SelectDate
        )
      })
      // var finalSearch = dataTable.map((x) => {
      //   return (
      //     new Date(x.Date.split(',')[0]).getTime()
      //   )
      // })
      // console.log('finalSearch', finalSearch)
      setNewFilterData(finalSearchResult);
    }

    if (text?.key === "Urgent") {
      console.log("key", text);
      var finalSearchResult = dataTable.filter((x) => x?.urgent === true);
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
        }}
      />

      {isVisibleModal && (
        <CustomModal
          isVisible={isVisibleModal}
          handleClose={() => setVisibleModal(false)}
          renderContent={RenderAddMoreDetails}
        />
      )}

      {/* {
                visibleUploadModal &&
                <CustomModal
                    isVisible={visibleUploadModal}
                    handleClose={() => setVisibleUploadModal(false)}
                    renderContent={RenderAddMoreDetails}
                />
            } */}
    </div>
  );
};

export default AddReport;

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
