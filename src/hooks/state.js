import React, {useEffect, useRef}  from 'react';


export const usePrevious = (val) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = val;
    },[val]);
    return ref.current;
}