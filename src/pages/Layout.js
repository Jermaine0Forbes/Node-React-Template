import React, {useContext, useState, useEffect, useCallback} from 'react';
import { Outlet, Link} from "react-router-dom";
import { 
    Container, AppBar,MenuList, MenuItem, 
    Toolbar, makeStyles, Typography,
    Button, IconButton, Menu,
 } from '@material-ui/core';
 import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {AuthContext} from './AuthProvider';
import { useColor } from '../hooks/users';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
    toolbar: {
        display: "flex",
        color: "white",
        flexGrow: 1,
        "& a": {
            color: "white",
            textDecoration: "none"
        }
    },
    username: {
        marginRight:'15px',
        flewGrow: 0,
        color:'white',
        fontSize:'1em',
        textTransform:'capitalize',
    },
    dropDownMenu: {
        "& a": {
            textDecoration: "none",
            "&:visited": {
                color: 'inherit',
            }
        }
    }
}));


export default function Layout()
{
    const classes = useStyles();
    const { currentUser, logout} = useContext(AuthContext);
    const [name, setName] = useState(null);
    const [userColor, setUserColor] = useState('secondary');
    const [open, setOpen] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const redirect = useNavigate();

    useEffect(() => {
        if(currentUser){
            // console.log('current user')
            // console.log(currentUser)
            setName(currentUser.username);
            const color = useColor(currentUser.adminLevel);
            setUserColor(color);
        }
    },[currentUser])
    // const { username } = currentUser;

    const toggleMenu = useCallback((e) => {
        setAnchor(e.currentTarget);
        setOpen(!open);
    });

    return (
        <Container>
            <AppBar position="static" color={userColor}>
                <Toolbar disableGutters >
                    <MenuList className={classes.toolbar}>
                        <MenuItem><Link to="/">Home</Link></MenuItem>
                        <MenuItem><Link to="/create">Create</Link></MenuItem>
                        <MenuItem><Link to="/list">List</Link></MenuItem>
                        <MenuItem><Link to="/login">Login</Link></MenuItem>
                        <MenuItem><Link to="/register">Register</Link></MenuItem>
                    </MenuList>
                    {
                        name && (
                        <section>
                            <Button 
                                id="user-button"
                                aria-controls={open ? 'user-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : 'false'}
                            onClick={(e) => {toggleMenu(e)}}
                            className={classes.username} 
                            startIcon={<AccountCircleIcon/> }
                            >
                            <Typography component='h3'>
                                    {name}
                                </Typography> 
                            </Button>
                            <Menu
                                id="user-menu"
                                aria-labelledby="user-button"
                                className={classes.dropDownMenu} 
                                anchorEl={anchor}
                                open={open}
                                onClose={(e) => {toggleMenu(e)}}
                                // anchorPosition={{
                                //     top:56,
                                //     left:100,
                                // }}
                                getContentAnchorEl={null}
                                anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                                }}
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                                }}
                            >
                                <MenuItem><Link to={"/user/"+currentUser?.id}>Profile</Link></MenuItem>
                                <MenuItem onClick={() => { logout(redirect)}}>Logout</MenuItem>
                            </Menu>
                        </section>

                        )
                    }
                </Toolbar>
            </AppBar>
            <Outlet />
        </Container>
    );
}