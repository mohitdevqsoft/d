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



export default function CustomTable({ dataTable, columns, isAdmin = false, call_back, }) {
    const listInnerRef = React.useRef();
    const [data, setData] = React.useState([])
    const [allData, setAllData] = React.useState([])
    const [pageNumber, setPageNumber] = React.useState(0)
    const [pageOffsate, setPageOffsate] = React.useState(12)

    console.log('allData', dataTable);
    React.useEffect(() => {
        setAllData(dataTable)
    }, [dataTable])

    React.useEffect(() => {
        if (allData.length > 0) {
            let local_data = allData
            setData(local_data?.slice(pageNumber, pageOffsate))
            console.log("local_data", local_data);
            console.log("pagenumber", pageOffsate);
        }
    }, [allData, pageOffsate])

    console.log("data", data);
    return (
        <Paper sx={{ width: '80%', overflow: 'hidden', marginTop: 8.5 }}
        >
            <TableContainer sx={{ maxHeight: 800 }}

                onScroll={() => {
                    const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
                    if (scrollTop + clientHeight === scrollHeight) {
                        setPageOffsate(pageOffsate + 10)
                        console.log("====", scrollHeight, scrollTop + clientHeight);

                    }
                }}
                ref={listInnerRef}
            >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns?.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={"center"}
                                    style={{ fontWeight: "700", fontSize: 16, maxWidth: 100 }}
                                    className='color_header'
                                // style={{ minWidth: 200 ,backgroundColor: "#40e0d0" }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row?.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className='hover_table'
                            >
                                <TableCell align="center" > {row.name}</TableCell>
                                <TableCell align="center">{row.study}</TableCell>

                                {/* <TableCell align="center">
                                    <Button variant="outline-success" size="sm"
                                    onClick={()=>{
                                        call_back('history')
                                    }}
                                    >{
                                        isAdmin ? 'Add History' : 'View History'}</Button>
                                </TableCell> */}

                                <TableCell align="center">{row.Date}</TableCell>
                                {/* <TableCell align="center">
                                    <ButtonUpload variant="contained" component="label"
                                      onClick={()=>{
                                        call_back('')
                                    }}
                                    >
                                        Upload
                                    </ButtonUpload>
                                </TableCell> */}
                                {/* <TableCell align="center">
                                    <Checkbox
                                        checked={false}
                                        // onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </TableCell> */}

                                <TableCell align="center">
                                    <Button variant="outline-success" size="sm"
                                        onClick={() => {
                                            call_back(row)
                                        }}
                                    >{
                                            isAdmin ? 'Add More' : 'View More'}</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>


    );
}