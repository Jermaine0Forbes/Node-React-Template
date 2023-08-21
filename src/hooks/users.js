import React, {useEffect, useState, useCallback, useMemo} from 'react';

export const  useColor = (adminLevel) => {
    let color = 'secondary';
    switch(adminLevel){
        case 1:
            color = 'primary'
            break;
        case 2:
            color = 'success'
            break;

        case 3:
            color = 'info'
            break;

    }
    return color;
}