import React from 'react';
import TextField from '@material-ui/core/TextField';


export default function EmailField({readOnly, onChange, value}) {

    return (
        <>
            {
                readOnly ?
                <TextField data-test-id="email-field" readOnly={readOnly} label="email" name="email" type='email' defaultValue={value} />
                :
                <TextField data-test-id="email-field" label="email" name="email" type='email' value={value} onChange={(e) => {onChange(e)}}/>
            }
        </>
    )
}