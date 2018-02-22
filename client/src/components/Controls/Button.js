import React from 'react';

let control = (props)=>{
    return (
        <button type="button" className="btn btn-secondary" onClick={() => props.onClick()}>{props.title}</button>
    );
}

export default control;