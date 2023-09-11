import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';


export default function GenericField({readyOnly, onChange, value, testId}) {

    return (
        <>
            {
                readyOnly ?
                <TextField data-test-id={testId} label="email" name="email" type='email' defaultValue={value} />
                :
                <TextField data-test-id={testId} label="email" name="email" type='email' value={value} onChange={(e) => {onChange(e)}}/>
            }
        </>
    )
}