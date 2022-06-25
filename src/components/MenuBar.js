import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
export default function ButtonAppBar({ title,data,openMenu,closeMenu }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [userEl, setuserEl] = React.useState(null);
    const open = Boolean(userEl);
    // const closeMenu = () => {
    //     setuserEl(null);
    // };
    // const openMenu = event => {
    //     setuserEl(event.currentTarget);
    // };
    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={openMenu}
            >
                {title}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={closeMenu}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={closeMenu}>{data}</MenuItem>
            </Menu>
        </div>
    );
}
