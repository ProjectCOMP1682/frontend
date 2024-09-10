import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='pt-10'>
            <div className='lg:flex block'>
                <div className='lg:w-2/3 w-full my-auto'>
                    <h1 className='lg:text-5xl text-4xl font-bold'>Let's Find your <br /> <span className='text-gradient font-bold'>dream job</span></h1>
                    <p className='text-xl mt-8 mb-8'>Job finder is a tool or platform designed to help job seekers find employment opportunities. These resources can include job boards, networking events, and career fairs.</p>

                    <Link to={'/all-jobs'} className='btn gradient-btn'>
                        Get Started
                    </Link>
                </div>
                <div className='lg:w-1/3 ml-auto text-right w-full'>
                    <img className='block ml-auto' src='https://www.pngplay.com/wp-content/uploads/15/Business-Woman-PNG-Photo-Image.png' alt='hero' />
                </div>
            </div>
        </div>
    )
}

export default Hero