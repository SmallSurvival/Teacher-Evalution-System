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




export default function CustomizedTables() {

    const history = useHistory();
    const Render = () => {
        localStorage.clear();
        history.push("/");

    }
    const saved = localStorage.getItem('Courses');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                axios.get(`http://192.168.0.109/WebLogin/api/Login/GetCourses?regno=${saved}&year=2021FM`)
                    .then((response) => {
                        console.log(response.data);
                        // localStorage.setItem('Nav Bar',response.data[0]);
                        setData(response.data);

                    }, (error) => {
                        console.log(error);
                    });
            } catch (error) {
                console.error(error.message);

            }
            setLoading(false);
        }

        fetchData();
    }, [saved]);
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
                                    <Button variant="contained" color="success">
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
