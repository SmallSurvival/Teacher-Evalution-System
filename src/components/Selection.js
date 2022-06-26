import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
const useStyles = makeStyles(() => ({
    root: {
        '& .MuiTextField-root': {
            margin: "auto",
        },
    },
    button: {
        margin: "auto",
    }
}))

export default function Selection() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [userEl, setuserEl] = React.useState(null);
    const open = Boolean(userEl);
    const closeMenu = () => {
        setuserEl(null);
    };
    const classes = useStyles()
    const [inputFields, setInputFields] = useState([
        { id: uuidv4(),teacher: '', semester: '', course: '' },
    ]);
    const [check, setChecked] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("InputFields", inputFields);
    };

    const handleChangeInput = (id, event) => {
        const newInputFields = inputFields.map(i => {
            if (id === i.id) {
                i[event.target.name] = event.target.value
            }
            return i;
        })

        setInputFields(newInputFields);
    }

    const handleAddFields = () => {
        { inputFields.length < 4 ? setInputFields([...inputFields, {id: uuidv4(), teacher: '', semester: '', course: '' }]) : alert("please delete one menu"); }
    }

    const handleRemoveFields = id => {
        const values = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
    }

    // const [data, setData] = useState({})
    const [teachersList, setTeachersList] = useState([])
    const fetchData = async () => {
        try {
            let response = await axios.get(`http://localhost/TestDemo/api/tets/get_Teachers_Course_Semester_Lists`)

            // let arr=[]
            // for (let i = 0; i <400; i++) {
            //     arr.push(response.data.teachersList[i]);
            // }
            let array = response.data.semesterList;
            let array2 = response.data.teachersList;
            const middle = Math.ceil(array.length / 2);
            const middleIndex = Math.ceil(array2.length / 2);

            const firstHalf = array.splice(0, middleIndex);
            const secondHalf = array.splice(-middleIndex);
            const tfirst = array2.splice(0, middle);
            const tSecond = array2.splice(-middle);

            console.log(tfirst);
            console.log(tSecond);
            // const merged = firstHalf.concat(secondHalf);
            // console.log("new array is",merged);
            localStorage.setItem('Course', JSON.stringify(response.data.coursesList));
            localStorage.setItem('Semester', JSON.stringify(firstHalf));
            localStorage.setItem('teacher', JSON.stringify(tfirst));
            return response.data
        } catch (error) {
            console.error(error.message);
        }
    }
    useEffect(() => {
        const fetch = async () => {
            let mydata = await fetchData();
            let coursedata = {
                coursesList: mydata.coursesList,
                semesterList: mydata.semesterList,
                teachersList: mydata.teachersList
            }
            // setData(coursedata);
        }
        fetch();

    }, [])

    let newObject = JSON.parse(localStorage.getItem("Course"));
    let semest = JSON.parse(localStorage.getItem("Semester"));
    let teach = JSON.parse(localStorage.getItem("teacher"));
    // useEffect(() => {
    //     {
    //         semest.map((option) => (
    //             <>
    //                {console.log(option.Semester_no)}
    //             </>
    //         ))
    //     }
    // }, [])

    return (
        <>
            <Container>
                <h1>Add New Teacher</h1>
                <form className={classes.root} onSubmit={handleSubmit}>
                    {inputFields.map(inputField => (
                        <div key={inputField.id}>
                            <TextField
                                select
                                label="Select"
                                name="teacher"
                                value={inputField.teacher}
                                onChange={event => handleChangeInput(inputField.id, event)}
                                helperText="Please select Teacher"
                            >
                                {teach.map((option) => (
                                    <MenuItem onClick={closeMenu} key={option.course} value={option.Emp_no}>
                                        {option.Name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                name="semester"
                                label="Select"
                                variant="filled"
                                value={inputField.semester}
                                helperText="Please select semester"
                                onChange={event => handleChangeInput(inputField.id, event)}
                            >
                                {semest.map((option) => (
                                    <MenuItem onClick={closeMenu} key={option.Semester_desc} value={option.Semester_no}>
                                        {option.Semester_no}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                name="course"
                                label="Select"
                                value={inputField.course}
                                helperText="Please select course"
                                onChange={event => handleChangeInput(inputField.id, event)}
                            >
                                {
                                    newObject.map((option) => (
                                        <MenuItem onClick={closeMenu} key={option.Course_No} value={option.Course_No}>
                                            {option.Title}
                                        </MenuItem>
                                    ))
                                }

                            </TextField>
                            <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                                <RemoveIcon />
                            </IconButton>
                            <IconButton
                                onClick={handleAddFields}
                            >
                                <AddIcon />
                            </IconButton>
                        </div>
                    ))}
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        type="submit"
                        // endIcon={<Icon>send</Icon>}
                        onClick={handleSubmit}
                    >Evaluate</Button>
                </form>
            </Container>
        </>
    );
}


