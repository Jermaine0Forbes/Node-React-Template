import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

export default function SelectAdminLevel({level, setLevel, testId, readOnly }) 
{   const readOrWrite = readOnly ? {defaultValue: level} : {value: level}
    return (
        <FormControl fullWidth>
            <InputLabel id="admin-level-label">Admin Level</InputLabel>
            <Select
                labelId="admin-level-label"
                id="admin-level-select"
                label="adminLevel"
                name="adminLevel"
                data-test-id={testId}
                {...readOrWrite}
                onChange={ (e) =>{ setLevel(e.target.value)} }
            >
                <MenuItem value={1}>Admin I</MenuItem>
                <MenuItem value={2}>Admin II</MenuItem>
                <MenuItem value={3}>Admin III</MenuItem>
                <MenuItem value={4}>Admin IV</MenuItem>
            </Select>
        </FormControl>
    )
}