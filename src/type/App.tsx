import React , {SyntheticEvent, useContext, useRef, useState} from 'react';
import { Button , Box, Container, Grid, TextField,Input } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";

const MyTheme = React.createContext(null);

export default function App():JSX.Element
{
    
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
}

export const DisplayName = () => {
    const contextType = useContext(MyTheme);
    return (
        <Box className="mt-4" aria-label="name-box">
           {contextType}
        </Box>
    )
}