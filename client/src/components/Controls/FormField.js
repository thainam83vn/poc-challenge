import React from 'react';

let control = (props)=>{
    return (
        <div className="form-group">
            <input type="text" className="form-control" placeholder={props.placeholder} value={props.value} 
                onChange={(e) => props.onChange(e.target.value)} />
        </div>
    );
}

export default control;