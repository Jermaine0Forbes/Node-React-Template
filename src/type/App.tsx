import React , {SyntheticEvent, useContext, useRef, useState} from 'react';
import { Button , Box, Container, Grid, TextField,Input } from '@material-ui/core';

const MyTheme = React.createContext(null);

export default function App():JSX.Element
{
    
        const [field , setField] = React.useState(""),
              [data, setData] = useState(""),
                tField = useRef(null),
                handleField = (e:any) => {
                    // console.log(e)
                    setField(e.target.value)
                    
                },
                handleButton = () => {
                    // tField.current.value = "";
                    console.log(tField.current.querySelector("input").value)
                    setData(field)
                    tField.current.querySelector("input").value = "";
                };
    return (
        <MyTheme.Provider  value={data}>
            <Box color="primary.main">
                <Container>
                    <Grid item md={10}>
                        <h1>What is your name?</h1>
                        <Box className="form-group">
                            <TextField id="outlined-basic" onChange={(e) => handleField(e)} className="my-3" ref={tField} label="Enter Name" variant="outlined" placeholder="Enter Name" />
                        </Box>
                        <Button variant="contained" color="primary" onClick={handleButton}>Submit</Button>
                    </Grid>
                    <DisplayName/>
                </Container>
            </Box>
        </MyTheme.Provider>
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