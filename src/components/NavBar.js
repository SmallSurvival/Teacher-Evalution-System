import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";

const settings = ['Logout'];

const ResponsiveAppBar = () => {
    const saved = localStorage.getItem('Courses');
    const [back, setBack] = useState('');
    console.log("data course is", saved);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenNavMenu = (event) => {
        
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // const [course, setCourse] = useState([]);
    // useEffect(() => {
    //     getNavBar();
    // }, [data]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                axios.get(`http://192.168.0.109/WebLogin/api/Login/NavBar?regno=${saved}&year=2021FM`)
                    .then((response) => {
                        console.log(response.data[0]);
                        // localStorage.setItem('Nav Bar',response.data[0]);
                        setData(response.data[0]);
                        
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
    const pages = [
        'Name',
        'Program',
        'Semester'
    ];
    const history = useHistory();
    const Render = () => {
        localStorage.clear();
        history.push("/");

    }
    return (
        <AppBar position="static" style={{ backgroundColor: 'black' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <img
                            style={{ width: '42px', }}
                            src='/images/download.jpeg'
                            alt="img"
                        />
                    </Avatar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                       {data.Reg_No}
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((row) => (
                                <MenuItem key={row} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{row}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="p"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                          {data.Reg_No}
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', paddingLeft: '232px' } }}
                    onClick={handleCloseNavMenu}
                    >
     
                            <Box
                             
                                sx={{ my: 2, color: 'white', display: 'block', paddingLeft: '50px', }}
                            >
                             {data.St_firstname+" "+data.St_lastname}
                              
                            </Box>
                            <Box
                             
                             sx={{ my: 2, color: 'white', display: 'block', paddingLeft: '50px', }}
                         >
                          {data.DISCIPLINE+" "+data.Semester_desc}
                           
                         </Box>
                         <Box
                             
                             sx={{ my: 2, color: 'white', display: 'block', paddingLeft: '50px', }}
                         >
                          {" Section "+data.SECTION}
                           
                         </Box>
                         <Box
                             
                             sx={{ my: 2, color: 'white', display: 'block', paddingLeft: '50px', }}
                         >
                          {data.Semester_no}
                           
                         </Box>
                           
                    </Box>


                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu} >
                                    <Typography textAlign="center" onClick={() => Render()}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
