import React, { useState, useEffect } from 'react';

const Notification = ({ message }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div style={{ display: show ? 'block' : 'none' }}>
            {message}
        </div>
    );
};

export default Notification;