import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getDataFromServer } from '../../Utils/Axios';
import ContextHelper from '../../ContextHooks/ContextHelper';
import { Button } from 'react-bootstrap';
import ButtonUpload from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CustomModal from './CustomModal';



export default function CustomTable({dataTable,columns}) {

    
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 800 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={"center"}
                                    style={{ fontWeight: "700", fontSize: 16 }}
                                    className='color_header'
                                // style={{ minWidth: 200 ,backgroundColor: "#40e0d0" }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataTable.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className='hover_table'
                            >
                                <TableCell align="center" > {row.name}</TableCell>
                                <TableCell align="center">{row.study}</TableCell>
                                <TableCell align="center">
                                    <Button variant="outline-success" size="sm">View History</Button>

                                </TableCell>

                                <TableCell align="center">{row.Date}</TableCell>
                                <TableCell align="center">
                                    <ButtonUpload variant="contained" component="label">
                                        Upload
                                    </ButtonUpload>
                                </TableCell>
                                <TableCell align="center">
                                    <Checkbox
                                        checked={false}
                                        // onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CustomModal
                isVisible={false}
            />
        </Paper>


    );
}