import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="NotFound">
            <h1 className="NotFound-title">Page not found.</h1>
            <Link to="/" className="NotFound-link">Go to homepage</Link>
            <br/>
            <br/>
        </div>
    )
}

export default NotFound;
