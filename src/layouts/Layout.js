import React, {useContext, useState, useEffect, useCallback} from 'react';
import { Outlet, Link, useNavigate} from "react-router-dom";
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {AuthContext} from '../providers/AuthProvider';
import { useColor } from '../hooks/users';
import { makeStyles } from '@material-ui/core';

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
    const [userColor, setUserColor] = useState(useColor());
    const [open, setOpen] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const redirect = useNavigate();

    useEffect(() => {
        if(currentUser){
            setName(currentUser.username);
            setUserColor(useColor(currentUser.adminLevel));
        }
    },[currentUser])

    const toggleMenu = useCallback((e) => {
        setAnchor(e.currentTarget);
        setOpen(!open);
    });

    const handleLogout = useCallback(() => {
        logout()
        setName(null)
        setAnchor(null)
        setOpen(false)
        setUserColor('secondary')
        redirect('/');
    })

    return (
        <Container>
            <AppBar position="static"  style={{backgroundColor: userColor}}>
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
                                <MenuItem onClick={() => { handleLogout()}}>Logout</MenuItem>
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