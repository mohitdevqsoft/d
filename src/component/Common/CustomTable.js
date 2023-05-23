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

//---------- main component
export default function CustomTable({
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
  }, [dataTable]);
  //---------- main return
  return (
    <Paper sx={{ width: "80%", overflow: "hidden", marginTop: 8.5 }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns?.map((column) => (
                <TableCell
                  key={column.id}
                  align={"center"}
                  style={{ fontWeight: "700", fontSize: 16, maxWidth: 100 }}
                  className="color_header"
                >
                  {column.label || ""}
                </TableCell>
              ))}
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
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                      className="hover_table "
                      // style={{ backgroundColor: "red" }}
                    >
                      <TableCell align="center"> {row.name || ""}</TableCell>
                      <TableCell align="center">{row.study || ""}</TableCell>
                      <TableCell align="center">{row?.Date}</TableCell>
                      <TableCell align="center">
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
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                      className="hover_table hover_tables"
                      // style={{ backgroundColor: "red" }}
                    >
                      <TableCell align="center"> {row.name || ""}</TableCell>
                      <TableCell align="center">{row.study || ""}</TableCell>
                      <TableCell align="center">{row.Date || ""}</TableCell>
                      <TableCell align="center">
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
                    </TableRow>
                  ) : null}
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {!filterData.length && <h2 className="noData">Oops! No Results Found</h2>}
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
