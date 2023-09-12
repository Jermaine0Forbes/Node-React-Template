import React from 'react';
import TextField from '@material-ui/core/TextField';


export default function GenericField({readOnly, onChange, value, testId, label}) {

    return (
        <>
            {
                readOnly ?
                <TextField data-test-id={testId} label={label} name={label} type={label} defaultValue={value} />
                :
                <TextField data-test-id={testId} label={label} name={label} type={label} value={value} onChange={(e) => {onChange(e)}}/>
            }
        </>
    )
}