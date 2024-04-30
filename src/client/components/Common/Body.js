import React from 'react';

const Body = props => {
    let routePath = props.routePath ? props.routePath : '';

    if(!routePath){
        routePath ="home";
    }

    return (
        <React.Fragment>
            <div className={props.className}>{props.children}</div>
        </React.Fragment>
    );
}

export default Body;
