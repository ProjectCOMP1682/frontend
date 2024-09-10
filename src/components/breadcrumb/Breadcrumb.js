import React from 'react';

const Breadcrumb = ({ children }) => {
    return (
        <div className='text-center breadcrumb py-20'>
            {children}
        </div>
    );
};

export default Breadcrumb;