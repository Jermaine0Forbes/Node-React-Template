import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';



export default function WhileLoading ({isLoading = true, testId, children}) 
{

    return (
        <>
            {
                isLoading ?

                <CircularProgress color="secondary" data-test-id={testId} />
                :
               <> {children}</>
            }
        
        </>
    )
}