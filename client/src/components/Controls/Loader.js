import React from 'react';
import './Loader.css';

let control = (props) => {
    if (props.visible) {
        return (
            <div className="loader"></div>
        );
    }
    return null;
}

export default control;