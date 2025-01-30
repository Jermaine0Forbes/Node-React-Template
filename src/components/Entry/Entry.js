import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    title: {
        // display: "flex",
        color: "white",
        // flexGrow: 1,
        "& a": {
            color: "white",
            textDecoration: "none"
        }
    },
    entry: {
        marginRight:'15px',
        flewGrow: 0,
        color:'white',
        fontSize:'1em',
        textTransform:'capitalize',
    },
    entryBlock: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#4d4d4d',
        '&> p': {
            textTransform:'uppercase'
        }
    }
}));


export default function Entry({num = 0})
{

    const classes = useStyles();
    
    return (
        <Box component={'section'}>
            <Grid>
                #{num}
            </Grid>
            <Grid>
                <Grid className={classes.entryBlock}>
                    <Typography>Title:</Typography>
                    
                    <TextField
                    variant="filled"
                    size="small"
                    margin="normal"
                    className={classes.title}
                    ></TextField>
                </Grid>
                <Grid className={classes.entryBlock}>
                <Typography>Entry:</Typography>
                    <TextField
                        label="Multiline"
                        multiline
                        variant='filled'
                        className={classes.entry}
                        rows={4}
                    >
                    </TextField>
                </Grid>
            </Grid>

        </Box>
    );
}