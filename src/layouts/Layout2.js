import React from 'react';
import { Outlet, Link} from "react-router-dom";
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@mui/material';

const useStyles = makeStyles(() => ({
    toolbar: {
        display: "flex",
        color: "white",
        "& a": {
            color: "white",
            textDecoration: "none"
        }
    },

}));


export default function Layout2()
{
    const classes = useStyles();

    return (
        <Container>
            <AppBar position="static" color="secondary">
                <Toolbar disableGutters >
                    <MenuList className={classes.toolbar}>
                        <MenuItem><Link to="/">Home</Link></MenuItem>
                        <MenuItem><Link to="/create">Create</Link></MenuItem>
                        <MenuItem><Link to="/list">List</Link></MenuItem>
                    </MenuList>
                </Toolbar>
            </AppBar>
            <Outlet/>
        </Container>
    );
}