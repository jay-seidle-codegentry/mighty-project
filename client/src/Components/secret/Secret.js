import React from 'react';

var Secret = (props) => {
    return (
        <div>
            <p>This is REALLY SECRET stuff. {props.location}</p>
        </div>
    )
}

export default Secret;