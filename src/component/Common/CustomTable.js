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

//---------- main component
export default function CustomTable({
  dataTable,
  columns,
  isAdmin = false,
  call_back,
}) {
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
            {dataTable.map((row) => {
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
                  )}
                </>
              );
            })}

            {dataTable.map((row) => {
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

      {!dataTable.length && <h2 className="noData">Oops! No Results Found</h2>}
    </Paper>
  );
}
