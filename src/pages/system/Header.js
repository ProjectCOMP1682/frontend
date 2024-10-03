import React from 'react'
import { useEffect, useState, useRef } from 'react';
import {FaSearch, FaEnvelope, FaRegBell, FaInfoCircle, FaCogs, FaFileAlt, FaKey, FaSignOutAlt} from "react-icons/fa"
import {Link} from "react-router-dom";

const Header = () => {
    const [user, setUser] = useState({})
    const dropdownRef = useRef(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));

        setUser(userData)
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])
    let handleLogout = () => {
        console.log("hello")
        localStorage.removeItem("userData");
        localStorage.removeItem("token_user")
        window.location.href = "/login"
    }

    let scrollHeader = () => {
        window.addEventListener("scroll", function () {
            var header = document.querySelector(".header-area");
            if (header) {
                header.classList.toggle("sticky", window.scrollY > 0)
            }
        })
    }
    scrollHeader()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className=''>
            <div className='flex items-center justify-between h-[70px] shadow-lg px-[25px] '>
                <div className='flex items-center rounded-[5px]'>
                    <h1  className='text-white text-[20px] leading-[24px] font-extrabold cursor-pointer'>
                        <span className='text-black'>Admin</span>
                    </h1>

                </div>
                <div className='flex items-center gap-[20px]'>
                    <div className='flex items-center gap-[25px] border-r-[1px] pr-[25px]'>
                        <FaRegBell />
                        <FaEnvelope />
                    </div>
                    <div className="navbar-end">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    className="flex items-center space-x-2 focus:outline-none"
                                    onClick={toggleDropdown}
                                >
                                    <img
                                        className="w-8 h-8 rounded-full object-cover"
                                        src={user.image}
                                        alt="profile"
                                    />
                                    <span className="font-semibold">{user.firstName + ' ' + user.lastName}</span>
                                </button>

                        {isDropdownOpen && (
                            <div
                                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                                style={{ zIndex: 50 }} // Ensure dropdown is on top
                            >
                                <Link to='/admin/user-info' className="block px-4 py-2 hover:bg-gray-100 flex items-center">
                                    <FaInfoCircle className="mr-2" /> Information
                                </Link>

                                <Link to='/admin/changepassword' className="block px-4 py-2 hover:bg-gray-100 flex items-center">
                                    <FaKey className="mr-2" /> Change password
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block px-4 py-2 hover:bg-gray-100 flex items-center"
                                >
                                    <FaSignOutAlt className="mr-2" /> Log out
                                </button>
                            </div>
                        )}
                    </div>
                        ) : (
                        <Link to={'/login'} className='btn gradient-btn'>
                            Start Applying
                        </Link>
                        )}



                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header