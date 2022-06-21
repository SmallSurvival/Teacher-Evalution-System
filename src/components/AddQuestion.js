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
    let newObject = window.localStorage.getItem("Emp");
    const [actionData, setActionData] = useState({
        Course_no: JSON.parse(newObject).empno,
        Emp_no: JSON.parse(newObject).coursenum,
    });
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState('')
    const [result, setResult] = useState('');


    const [questionData, setQuestionData] = useState({});


    const handleClick = (e, questionId) => {
        let studentdata;
        studentdata =
        {
            Emp_no: actionData.Emp_no,
            Reg_No: saved,
            Course_no: actionData.Course_no,
            Discipline: 'BIIT',
            Semester_no: '2021FM',
            Question_Desc: questionId,
            Answer_Desc: 'Excellent',
            Answer_Marks: e.currentTarget.value,
        }

        // } else if (e.currentTarget.value == 4) {
        //     studentdata =
        //     {
        //         Empno: actionData.Emp_no,
        //         RegNum: saved,
        //         Coursenum: actionData.Course_no,
        //         Discipline: 'BIIT',
        //         Semester_no: '2021FM',
        //         Question_Desc: questionId,
        //         AnswerDesc: 'Good',
        //         Marks: e.currentTarget.value,
        //     }
        // } else if (e.currentTarget.value == 3) {
        //     studentdata =
        //     {
        //         Empno: actionData.Emp_no,
        //         RegNum: saved,
        //         Coursenum: actionData.Course_no,
        //         Discipline: 'BIIT',
        //         Semester_no: '2021FM',
        //         QuestionDesc: questionId,
        //         AnswerDesc: 'Average',
        //         Marks: e.currentTarget.value,
        //     }
        // } else if (e.currentTarget.value == 2) {
        //     studentdata =
        //     {
        //         Empno: actionData.Emp_no,
        //         RegNum: saved,
        //         Coursenum: actionData.Course_no,
        //         Discipline: 'BIIT',
        //         Semester_no: '2021FM',
        //         QuestionDesc: questionId,
        //         AnswerDesc: 'Bad',
        //         Marks: e.currentTarget.value,
        //     }
        // }

        let temp = questionData;
        temp[questionId] = studentdata;
        // if(questionData && Object.keys(questionData).length > 0){
        //     setQuestionData([questionData.map(d => d.Question_Desc === questionId ? studentdata : d)])
        // } else {
        //     setQuestionData([studentdata])
        // }
        setQuestionData(temp);
    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                axios.get(`http://192.168.1.7/WebLogin/api/Login/GetQuestions`)
                    .then((response) => {
                        console.log(response.data);
                        // localStorage.setItem('Nav Bar',response.data[0]);
                        setData(response.data);
                        let users = JSON.parse(localStorage.getItem("Emp") || "[]");
                        // console.log("users is", users.Emp_no);

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


    const handleSumbit = () => {
        console.log(Object.values(questionData));
    }
    // useEffect(() => {
    //     console.log(studentdata);
    // }, [studentdata])
    const PostData = () => {
        // console.log(studentdata);
        // const headers = {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        // };
        // fetch(`http://192.168.1.7/WebLogin/api/Login/addStdEvaluation`, {
        //     method: 'POST',
        //     headers: headers,
        //     body: questionData,
        // })
        //     .then(response => response.json())
        //     .then(response => {
        //         if (response == 'Submitted Successfully!') {
        //             alert("hello");
        //         }
        //     })
        //     .catch(error => {
        //         alert(error);
        //     });
        axios({
            method: 'POST',
            url: `http://192.168.1.7/WebLogin/api/Login/addStdEvaluation`,
            data: Object.values(questionData),
            config: {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type': 'application/json'
                }
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (response) {
                console.log(response);
            });

        // axios.post(`http://192.168.1.7/WebLogin/api/Login/addStdEvaluation`, questionData, {
        //     headers: {
        //       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        //     }
        // })
        // .then(response => {
        //     console.log(response.data);
        // })
        // .catch(err => {
        //     console.log(err);
        // })
    }
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
                            handleSumbit()
                        }}
                    >

                        Back
                    </Button>
                    <Button variant="contained" endIcon={<InputIcon />} style={{ paddingLeft: '20px' }}
                        onClick={() => PostData()}
                    >
                        Logout
                    </Button>
                </Stack>
            </div>
        </div>
    );
}