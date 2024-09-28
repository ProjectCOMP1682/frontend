import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';
import { FaInfoCircle, FaCogs, FaFileAlt, FaKey, FaSignOutAlt } from 'react-icons/fa'; // Importing icons

const Header = () => {
    const [user, setUser] = useState({})
    const dropdownRef = useRef(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        // if (userData && userData.roleCode !== 'CANDIDATE')
        // {
        //     toast.error("Vai trò của bạn không làm việc ở đây")
        //     setTimeout(() => {
        //         window.location.href = "/admin"
        //     }, 1000);
        // }
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
        <div className="navbar px-0">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <NavLink to={'/'}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/all-jobs'}>
                                Jobs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="semibold" to={'/company'}>
                                Companys
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="semibold" to={'/about'}>
                                About Page
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="semibold" to={'/blogs'}>
                                Blogs
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <NavLink to={'/'} className="active btn font-extrabold text-left p-0 bg-transparent hover:bg-transparent text-black border-none normal-case text-xl">
                    <span className='text-black'>JobFinder</span>
                </NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <NavLink to={'/'}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/all-jobs'}>
                            Jobs
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="semibold" to={'/company'}>
                            Companys
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="semibold" to={'/about'}>
                            About Page
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="semibold" to={'/blogs'}>
                            Blogs
                        </NavLink>
                    </li>
                </ul>
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
                                <Link to='/candidate/info' className="block px-4 py-2 hover:bg-gray-100 flex items-center">
                                    <FaInfoCircle className="mr-2" /> Information
                                </Link>
                                <Link to='/candidate/usersetting' className="block px-4 py-2 hover:bg-gray-100 flex items-center">
                                    <FaCogs className="mr-2" /> Advanced Settings
                                </Link>
                                <Link to='/candidate/cv-post' className="block px-4 py-2 hover:bg-gray-100 flex items-center">
                                    <FaFileAlt className="mr-2" /> Work submitted
                                </Link>
                                <Link to='/candidate/changepassword' className="block px-4 py-2 hover:bg-gray-100 flex items-center">
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
    )
}

export default Header