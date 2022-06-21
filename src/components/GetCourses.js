import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputIcon from '@mui/icons-material/Input';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Divider from '@mui/material/Divider';
import { useHistory, Redirect } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(CourseCode, Courses, Teachers, EvalationStatus) {
    return { CourseCode, Courses, Teachers, EvalationStatus };
}
const saved = localStorage.getItem('Courses');
export const fetchData = async () => {
    try {
        let response = await axios.get(`http://192.168.1.7/WebLogin/api/Login/GetCourses?regno=${saved}&year=2021FM`)
        console.log("umair", response.data);
        return response.data
    } catch (error) {
        console.error(error.message);
    }
}


export default function CustomizedTables() {
    const [actionData, setActionData] = useState({
        Course_no: "",
        Emp_no: "",
    });
    const getData = (course, id) => {
        console.log("course", course);
        let arr = {
            empno: id,
            coursenum: course
        }
        localStorage.setItem('Emp', JSON.stringify(arr));

        setActionData({ ...actionData, Course_no: arr.coursenum, Emp_no: arr.empno });
        console.log('object', arr);
        // history.push("question");

    };
    const history = useHistory();
    const Render = () => {
        localStorage.clear();
        history.push("/");

    }

    const [data, setData] = useState('')

    useEffect(() => {
        const fetch = async () => {
            let mydata = await fetchData();
            setData(mydata)
        }
        fetch()

    }, [saved]);
    useEffect(() => {
        console.log("hero", actionData);
    }, [actionData]);
    const rows = [

    ];
    return (
        <div>
            <TableContainer component={Paper}>
                <Typography component="h4" variant="h5" style={{ color: 'black', textAlign: 'center' }}>
                    Student Courses
                </Typography>
                <div style={{
                    width: '100%',
                    maxWidth: '100%',
                }}>
                    <Divider />
                </div>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow >
                            <StyledTableCell >Course Code</StyledTableCell>
                            <StyledTableCell align="right">Courses</StyledTableCell>
                            <StyledTableCell align="right">Teachers</StyledTableCell>
                            <StyledTableCell align="right">Evalation Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map((row) => (
                            <StyledTableRow
                                key={row}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {row.Course_no}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.Course_desc}</StyledTableCell>
                                <StyledTableCell align="right">{row.Emp_firstname + "" + row.Emp_lastname}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button variant="contained" color="success" onClick={() => { getData(row.Course_no, row.Emp_no) }}>
                                        Evalation
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ marginTop: '69px' }}>
                <Stack direction="row" spacing={2} >
                    <Button variant="outlined" startIcon={<KeyboardBackspaceIcon />} style={{ paddingLeft: '69px' }}
                        onClick={() => Render()

                        }
                    >

                        Back
                    </Button>
                    <Button variant="contained" endIcon={<InputIcon />} style={{ paddingLeft: '20px' }}
                        onClick={() => Render()}


                    >
                        Logout
                    </Button>
                </Stack>
            </div>
        </div>
    );
}
