import React, { useEffect } from 'react';

export default function ToggleBodyClass({ extraClass }) {
    useEffect(() => {
        document.body.removeAttribute('class');
        document.body.classList.add(extraClass);
    }, []);

    return(<></>);
}
