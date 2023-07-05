//---------- imports
// react
import * as React from "react";

// third party lib
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "react-bootstrap";

// helper
import { convertDate } from "../../Utils/Helpers";
import Loader from "./Loader";

//---------- main component
export default function CustomTable({
  navigate,
  loading,
  setLoading,
  dataTable,
  columns,
  isAdmin = false,
  call_back,
}) {
  const [filterData, setFilterData] = React.useState(dataTable);

  React.useEffect(() => {
    let filterDatas = dataTable.sort((a, b) => {
      var startDate = a.Date.split(",");
      var endDate = b.Date.split(",");
      var startDateChange = `${startDate[2]}/${startDate[1]}/${startDate[0]}`;
      var endDateChange = `${endDate[2]}/${endDate[1]}/${endDate[0]}`;

      return new Date(endDateChange) - new Date(startDateChange);
    });

    setFilterData(filterDatas);
    setLoading(false);
  }, [dataTable]);
  //---------- main return

  return (
    <Paper sx={{ width: "80%", overflow: "hidden", marginTop: 15.5 }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns?.map((column) => (
                <TableCell
                  key={column.id}
                  align={"center"}
                  style={{ fontWeight: "700", fontSize: 16,  }}
                  className="color_header"
                >
                  {column.label || ""}
                </TableCell>
              ))}
              {isAdmin && (
                <TableCell
                  align={"center"}
                  style={{ fontWeight: "700", fontSize: 16,maxWidth: 40 }}
                  className="color_header"
                >
                  {"View Report"}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData.map((row) => {
              return (
                <>
                  {!row?.reports?.length && (
                    <TableRow
                      key={row?.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 ,padding:0, margin:0 },
                      }}
                      className={row.isUrgent ? "isUrjentColor" : ""}
                    >
                      <TableCell align="center" style={{padding:"5px"}}> {row.name || ""}</TableCell>
                    
                      <TableCell align="center"style={{padding:"5px"}}>{row.study || ""}</TableCell>
                      <TableCell align="center"style={{padding:"5px"}}>{row?.Date || ""}</TableCell>
                      <TableCell align="center"style={{padding:"5px"}}>
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => {
                            call_back(row);
                          }}
                        >
                          {isAdmin ? "Add More" : "View More"}
                        </Button>
                      </TableCell>
                      {isAdmin && (
                        <TableCell align="center">
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => {
                              navigate("/image-viewer");
                            }}
                          >
                            {"View More Detail"}
                          </Button>
                        </TableCell>
                      )}
                        <TableCell align="center"style={{padding:"5px"}}>  </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}

            {filterData.map((row) => {
              return (
                <>
                  {row?.reports?.length ? (
                    <TableRow
                      key={row?.id}
                      sx={{
                        "&:last-child td, &:last-child th": {border: 0 , margin:0 },
                      }}
                      className="hover_table hover_tables"
                      // style={{ backgroundColor: "red" }}
                    >
                      <TableCell align="center"style={{padding:"0px"}}> {row.name || ""}</TableCell>
                      <TableCell align="center"style={{padding:"0px"}}>{row.study || ""}</TableCell>
                      <TableCell align="center"style={{padding:"0px"}}>{row.Date || ""}</TableCell>

                      <TableCell align="center" style={{padding:"0px"}}>
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => {
                            call_back(row);
                          }}
                        >
                          {isAdmin ? "Add More" : "View More"}
                        </Button>
                      </TableCell>
                      {isAdmin && (
                        <TableCell align="center">
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => {
                              call_back(row);
                            }}
                          >
                            {"View More Detail"}
                          </Button>
                        </TableCell>
                      )}
                        <TableCell align="center"style={{padding:"5px"}}>  </TableCell>

                    </TableRow>
                  ) : null}
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {loading && filterData.length <= 0 ? (
        <TableContainer>
          <Table>
            <TableBody>
              <Loader />
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        filterData.length <= 0 && (
          <h2 className="noData" style={{ fontSize: 16, padding: 8 }}>Oops! No Results Found</h2>
        )
      )}
    </Paper>
  );
}

// const data = [{
//   date: new Date("2023", "04", "25"),
//   name: "John Doe",
// }, {
//   date: new Date("2023", "04", "19"),
//   name: "Jane Doe",
// },{
//   date: new Date("2023", "04", "30"),
//   name: "Jane Doe",
// },{
//   date: new Date("2023", "04", "05"),
//   name: "Jane Doe",
// }];

// data.sort((a, b) => {
//   return b.date - a.date
// });

// console.log(data);
