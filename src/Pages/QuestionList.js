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
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import { CoPresent } from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
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
    const [result, setResult] = useState([]);
    const [answers,setAnswers] =useState({});
    const handleClick = (e, questionId) => {
        let value = e.currentTarget.value;
        let temp = answers
        temp[questionId]?temp[questionId]=value:temp[questionId]=value;
        setAnswers(temp)
    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                axios.get(`http://192.168.0.108/WebLogin/api/Login/GetQuestions`)
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
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
        console.log("chnaged value", value);
    };
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
                                key={row.Question_ID}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {row.Question_ID}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.Question1}</StyledTableCell>
                                <StyledTableCell align="right">{row.T_Semester}</StyledTableCell>
                                <StyledTableCell style={{ width: '200px' }}>
                                    <RadioGroup
                                        row
                                        // defaultValue="5"
                                        onChange={(e) => handleClick(e, row.Question_ID)}
                                    >

                                        <FormControlLabel
                                            value={5}
                                            control={<Radio />}
                                        // label={o.time_standard.toString()}
                                        />
                                        <FormControlLabel
                                            value={4}
                                            control={<Radio />}
                                        // label={o.time_standard.toString()}
                                        />
                                        <FormControlLabel
                                            value={3}
                                            control={<Radio />}
                                        // label={o.time_standard.toString()}
                                        />
                                        <FormControlLabel
                                            value={2}
                                            control={<Radio />}
                                        // label={o.time_standard.toString()}
                                        />

                                    </RadioGroup>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ marginTop: '69px' }}>
                <Stack direction="row" spacing={2} >
                    <Button variant="outlined" startIcon={<KeyboardBackspaceIcon />} style={{ paddingLeft: '69px' }}
                        onClick={() => {
                            // history.push('/courses') 
                            console.log(answers);
                        }}
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