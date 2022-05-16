import NavBar from '../components/NavBar'
import SCourses from '../components/GetCourses'
import { useHistory, Redirect } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';

export default function Courses() {
    
    // console.log('authorized courses',authorized);
    // if(!authorized){
    //     return <Redirect to='/login'/>;
    // }
    // const[back,setBack]=useState('');

    // // useEffect(() => {
    // //         setBack(data.data);
    // // }, [data.data]);
   
    // console.log("data course is",saved);
    return (
        <>
            <NavBar/>
            <SCourses />
        </>
    );
}