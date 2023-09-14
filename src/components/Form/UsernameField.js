import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function UserNameField({readOnly, onChange, value}) {

    return (
        <>
            {
                readOnly ?
                <TextField 
                    data-test-id="username-field" 
                    label="username" 
                    name="username" 
                    type='text' 
                    defaultValue={value} 
                />
                :
                <TextField 
                    data-test-id="username-field" 
                    label="username" 
                    name="username" 
                    type='text' 
                    value={value} 
                    onChange={(e) => {onChange(e)}}
                />
            }
        </>
    )
}