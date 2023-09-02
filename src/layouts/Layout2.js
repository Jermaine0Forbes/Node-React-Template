import React from 'react';
import { Outlet, Link} from "react-router-dom";
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core';

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