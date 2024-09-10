import React from 'react'
import { NavLink } from 'react-router-dom'

import fb from './assets/fb.png'
import tw from './assets/tw.png'
import insta from './assets/insta.png'

const Footer = () => {
    return (
        <div className='py-10 bg-[#1A1919]'>
            <div className='container mx-auto'>
                <footer className="footer lg:d-flex text-white">
                    <div className='lg:w-2/6'>
                        <NavLink to={'/'} className="active btn font-extrabold text-left p-0 bg-transparent hover:bg-transparent text-black border-none normal-case text-xl">
                            <span className='text-black'>JobFinder</span>
                        </NavLink>
                        <p>
                            job finder is a tool or platform designed to help job seekers find employment opportunities. These resources can include job boards, networking events, and career fairs.
                        </p>

                        <div className='flex mt-4'>
                            <a href='/' className='mr-4'>
                                <img alt='' src={fb} style={{ width: "35px" }} />
                            </a>
                            <a href='/' className='mr-4'>
                                <img alt='' src={tw} style={{ width: "35px" }} />
                            </a>
                            <a href='/' className='mr-4'>
                                <img alt='' src={insta} style={{ width: "35px" }} />
                            </a>
                        </div>
                    </div>
                    <div className='lg:w-1/6 p-2'>
                        <span className="footer-title ">Company</span>
                        <a href='/' className="link link-hover">About Us</a>
                        <a href='/' className="link link-hover">Work</a>
                        <a href='/' className="link link-hover">Latest News</a>
                        <a href='/' className="link link-hover">Careers</a>
                    </div>
                    <div className='lg:w-1/6 p-2'>
                        <span className="footer-title ">Product</span>
                        <a href='/' className="link link-hover">Prototype</a>
                        <a href='/' className="link link-hover">Plans & Pricing</a>
                        <a href='/' className="link link-hover">Customers</a>
                        <a href='/' className="link link-hover">Integrations</a>
                    </div>
                    <div className='lg:w-1/6 p-2'>
                        <span className="footer-title ">Support</span>
                        <a href='/' className="link link-hover">Help Desk</a>
                        <a href='/' className="link link-hover">Sales</a>
                        <a href='/' className="link link-hover">Become a Partner</a>
                        <a href='/' className="link link-hover">Developers</a>
                    </div>
                    <div className='lg:w-1/6 p-2'>
                        <span className="footer-title ">Contact</span>
                        <a href='/' className="link link-hover">524 Broadway , NYC</a>
                        <a href='/' className="link link-hover">+1 777 - 978 - 5570</a>
                    </div>

                </footer>

                <hr className='text-[#7E90FE33] my-10' />

                <div className='lg:flex justify-between items-center'>
                    <p className='text-gray-300 text-sm'>© 2024 JobFinder. All rights reserved.</p>
                    <p className='text-gray-300 text-sm'>
                            Powered by ThanhSonGCD201619 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer