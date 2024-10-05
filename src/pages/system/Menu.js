import React, { useState, useEffect } from 'react';
import {Link, NavLink} from 'react-router-dom';
import { FaTachometerAlt, FaList,  FaChevronRight, FaChevronLeft, FaUsers ,FaUserPlus } from "react-icons/fa";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
    const [isCompanyManagementOpen, setIsCompanyManagementOpen] = useState(false);

    // Adjust the sidebar based on screen size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsCollapsed(false); // Mở rộng khi ở chế độ desktop
            } else {
                setIsCollapsed(true); // Tự động thu hẹp khi ở chế độ mobile
            }
        };
        window.addEventListener('resize', handleResize);

        // Initial check
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };
    const toggleUserManagement = () => {
        setIsUserManagementOpen(!isUserManagementOpen);
    };
    const toggleCompanyManagement = () => {
        setIsCompanyManagementOpen(!isCompanyManagementOpen);
    };
    return (
        <div className={`bg-[#9873FF] h-screen transition-width duration-300 ${isCollapsed ? 'w-[80px]' : 'w-[250px]'} px-[25px]`}>
            {/* Sidebar Header */}
            <div className={`px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]`}>
                {!isCollapsed && (
                    <h1  className='text-white text-[20px] leading-[24px] font-extrabold cursor-pointer'>
                        <span className='text-black'>JobFinder</span>
                    </h1>
                )}
            </div>



            <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
                <FaTachometerAlt color='white' />
                {!isCollapsed && <p className='text-[14px] leading-[20px] font-bold text-white'>Dashboard</p>}
            </div>
            <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer' onClick={toggleUserManagement}>
                <FaUsers  color='white' />
                {!isCollapsed && <p className='text-[14px] leading-[20px] font-bold text-white'>User Management</p>}
                {!isCollapsed && (isUserManagementOpen ? <FaChevronLeft color='white' /> : <FaChevronRight color='white' />)}
            </div>
            {/* User Management Tasks */}
            {isUserManagementOpen && (
                <div className={`pl-[30px] transition-all duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                    <Link to="/admin/list-user/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                        <FaList color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>List of users</p>}

                    </Link>
                    <Link to="/admin/add-user/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                        <FaUserPlus color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white' >Add user</p>}
                    </Link>
                </div>
            )}
            <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer' onClick={toggleCompanyManagement}>
                <FaUsers  color='white' />
                {!isCollapsed && <p className='text-[14px] leading-[20px] font-bold text-white'>Company Management</p>}
                {!isCollapsed && (isCompanyManagementOpen ? <FaChevronLeft color='white' /> : <FaChevronRight color='white' />)}
            </div>
            {/* User Management Tasks */}
            {isCompanyManagementOpen && (
                <div className={`pl-[30px] transition-all duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                    <Link to="/admin/list-company-admin/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                        <FaList color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>List of company</p>}

                    </Link>

                </div>
            )}
            {/* Collapse Button */}
            <div className='pt-[15px]'>
                <div className='flex items-center justify-center'>
                    <div className='h-[40px] w-[40px] bg-[#3C5EC1] rounded-full flex items-center justify-center cursor-pointer' onClick={toggleSidebar}>
                        {isCollapsed ? <FaChevronRight color='white' /> : <FaChevronLeft color='white' />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
