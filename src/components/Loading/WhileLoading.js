import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';



export default function WhileLoading ({isLoading, testId, children}) 
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