import React from 'react';
import TextField from '@material-ui/core/TextField';


export default function PasswordField({readOnly, onChange, value, testId, label}) {

    return (
        <>
            {
                readOnly ?
                <TextField data-test-id={'password-field'} readOnly={readOnly} label='password' name='password' type='password' defaultValue={value} />
                :
                <TextField data-test-id={'password-field'} label='password' name='password' type='password' value={value ?? ''} onChange={(e) => {onChange(e)}}/>
            }
        </>
    )
}