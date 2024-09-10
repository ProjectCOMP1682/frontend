import React from 'react';
import broken from "./assets/broken.svg"

const Broken = () => {
    return (
        <div className='py-10 text-center'>
            <img src={broken} className='h-[60vh] block m-auto' alt='' />
        </div>
    );
};

export default Broken;