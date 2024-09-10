import React from 'react'

const GradientButton = ({children}) => {
    return (
        <button className='btn gradient-btn'>
            {children}
        </button>
    )
}

export default GradientButton