import React from 'react';
import { Container, AppBar,MenuList, MenuItem, Toolbar } from '@material-ui/core';
import { Outlet, Link} from "react-router-dom";

export default function Layout():JSX.Element
{

    return (
        <Container>
            <AppBar position="static">
                <Toolbar disableGutters>
                    <MenuList>
                        <MenuItem><Link to="/">Home</Link></MenuItem>
                        <MenuItem><Link to="/">Page 1</Link></MenuItem>
                        <MenuItem><Link to="/">Page 2</Link></MenuItem>
                    </MenuList>
                </Toolbar>
            </AppBar>
            <Outlet />
        </Container>
    );
}