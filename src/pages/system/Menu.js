import React, { useState, useEffect } from 'react';
import {Link, NavLink} from 'react-router-dom';
import { FaTachometerAlt, FaList,FaShoppingCart, FaCogs, FaChevronRight, FaChevronLeft, FaUsers ,FaUserPlus,FaBuilding,FaBriefcase,FaHistory ,FaClipboardList,FaAward, FaUserTie , FaPlus,FaTools,FaStar,FaRegNewspaper ,FaFileAlt,FaMoneyBillWave ,FaPlusCircle  } from "react-icons/fa";


const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
    const [isCompanyManagementOpen, setIsCompanyManagementOpen] = useState(false);
    const [isJobManagementOpen, setIsJobManagementOpen] = useState(false);
    const [isJobTypeManagementOpen, setIsJobTypeManagementOpen] = useState(false);
    const [isJobSkillManagementOpen, setIsJobSkillManagementOpen] = useState(false);
    const [isJobLevelManagementOpen, setIsJobLevelManagementOpen] = useState(false);
    const [isWorkTypeManagementOpen, setIsWorkTypeManagementOpen] = useState(false);
    const [isSalaryTypeManagementOpen, setIsSalaryTypeManagementOpen] = useState(false);
    const [isExpTypeManagementOpen, setIsExpTypeManagementOpen] = useState(false);
    const [isPackagePostManagementOpen, setIsPackagePostManagementOpen] = useState(false);
    const [isPackageCVManagementOpen, setIsPackageCVManagementOpen] = useState(false);
// Company
    const [isCompanyByCompanyOpen, setIsCompanyByCompanyOpen] = useState(false);
    const [isPostByCompanyOpen, setIsPostByCompanyOpen] = useState(false);
    const [isCvByCompanyOpen, setIsCvByCompanyOpen] = useState(false);
    const [isHistoryTradeByCompanyOpen, setIsHistoryTradeByCompanyOpen] = useState(false);

    // EMPLOYER
    const [isCreateCompanyOpen, setIsCreateCompanyOpen] = useState(false);

    const [user, setUser] = useState({})
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setUser(userData)
    }, [])
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
    const toggleJobManagement = () => {
        setIsJobManagementOpen(!isJobManagementOpen);
    };
    const toggleJobTypeManagement = () => {
        setIsJobTypeManagementOpen(!isJobTypeManagementOpen);
    };
    const toggleJobSkillManagement = () => {
        setIsJobSkillManagementOpen(!isJobSkillManagementOpen);
    };
    const toggleJobLevelManagement = () => {
        setIsJobLevelManagementOpen(!isJobLevelManagementOpen);
    };
    const toggleWorkTypeManagement = () => {
        setIsWorkTypeManagementOpen(!isWorkTypeManagementOpen);
    };
    const toggleSalaryTypeManagement = () => {
        setIsSalaryTypeManagementOpen(!isSalaryTypeManagementOpen);
    };
    const toggleExpTypeManagement = () => {
        setIsExpTypeManagementOpen(!isExpTypeManagementOpen);
    };
    const togglePackageCVManagement = () => {
        setIsPackageCVManagementOpen(!isPackageCVManagementOpen);
    };
    const togglePackagePostManagement = () => {
        setIsPackagePostManagementOpen(!isPackagePostManagementOpen);
    };
    // Emloyee
    const toggleCreateCompany = () => {
        setIsCreateCompanyOpen(!isCreateCompanyOpen);
    };
    //company
    const toggleCompanyByCompany = () => {
        setIsCompanyByCompanyOpen(!isCompanyByCompanyOpen);
    };
    const togglePostByCompany = () => {
        setIsPostByCompanyOpen(!isPostByCompanyOpen);
    };
    const toggleCvByCompany = () => {
        setIsCvByCompanyOpen(!isCvByCompanyOpen);
    };
    const toggleHistoryTradeByCompany = () => {
        setIsHistoryTradeByCompanyOpen(!isHistoryTradeByCompanyOpen);
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
            {user && user.roleCode === "ADMIN" &&
                <>
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
                <FaBuilding   color='white' />
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
            <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer' onClick={toggleJobManagement}>
                <FaBriefcase   color='white' />
                {!isCollapsed && <p className='text-[14px] leading-[20px] font-bold text-white'>Job Post Management</p>}
                {!isCollapsed && (isJobManagementOpen ? <FaChevronLeft color='white' /> : <FaChevronRight color='white' />)}
            </div>
            {/* User Management Tasks */}
            {isJobManagementOpen && (
                <div className={`pl-[30px] transition-all duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                    <Link to="/admin/list-post-admin/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                        <FaList color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>List of Job</p>}

                    </Link>

                </div>
            )}
            <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer' onClick={toggleJobTypeManagement}>
                <FaClipboardList   color='white' />
                {!isCollapsed && <p className='text-[14px] leading-[20px] font-bold text-white'>Job Type Management</p>}
                {!isCollapsed && (isJobTypeManagementOpen ? <FaChevronLeft color='white' /> : <FaChevronRight color='white' />)}
            </div>
            {/* User Management Tasks */}
            {isJobTypeManagementOpen && (
                <div className={`pl-[30px] transition-all duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                    <Link to="/admin/list-job-type/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                        <FaList color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>List of Job Type</p>}

                    </Link>
                    <Link to="/admin/add-job-type/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                        < FaPlus color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>Add Job Type</p>}

                    </Link>
                </div>
            )}
            <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer' onClick={toggleJobSkillManagement}>
                <FaTools  color='white' />
                {!isCollapsed && <p className='text-[14px] leading-[20px] font-bold text-white'>Job Skill Management</p>}
                {!isCollapsed && (isJobSkillManagementOpen ? <FaChevronLeft color='white' /> : <FaChevronRight color='white' />)}
            </div>
            {/* User Management Tasks */}
            {isJobSkillManagementOpen && (
                <div className={`pl-[30px] transition-all duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                    <Link to="/admin/list-job-skill/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                        <FaList color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>List of Job Skill</p>}

                    </Link>
                    <Link to="/admin/add-job-skill/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                        < FaPlus color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>Add Job Skill</p>}

                    </Link>
                </div>
            )}
            <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer' onClick={toggleJobLevelManagement}>
                <FaStar color='white' />
                {!isCollapsed && <p className='text-[14px] leading-[20px] font-bold text-white'>Job Level Management</p>}
                {!isCollapsed && (isJobLevelManagementOpen ? <FaChevronLeft color='white' /> : <FaChevronRight color='white' />)}
            </div>
            {/* User Management Tasks */}
            {isJobLevelManagementOpen && (
                <div className={`pl-[30px] transition-all duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                    <Link to="/admin/list-job-level/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                        <FaList color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>List of Job Level</p>}

                    </Link>
                    <Link to="/admin/add-job-level/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                        < FaPlus color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>Add Job Level</p>}

                    </Link>
                </div>
            )}
            <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer' onClick={toggleWorkTypeManagement}>
                <FaBriefcase color='white' />
                {!isCollapsed && <p className='text-[14px] leading-[20px] font-bold text-white'>Work Type Management</p>}
                {!isCollapsed && (isWorkTypeManagementOpen ? <FaChevronLeft color='white' /> : <FaChevronRight color='white' />)}
            </div>
            {/* User Management Tasks */}
            {isWorkTypeManagementOpen && (
                <div className={`pl-[30px] transition-all duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                    <Link to="/admin/list-work-type/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                        <FaList color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>List of Work Type</p>}

                    </Link>
                    <Link to="/admin/add-work-type/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                        < FaPlus color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>Add Work Type</p>}

                    </Link>
                </div>
            )}
            <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer' onClick={toggleSalaryTypeManagement}>
                <FaMoneyBillWave color='white' />
                {!isCollapsed && <p className='text-[14px] leading-[20px] font-bold text-white'>Salary Type Management</p>}
                {!isCollapsed && (isSalaryTypeManagementOpen ? <FaChevronLeft color='white' /> : <FaChevronRight color='white' />)}
            </div>
            {/* User Management Tasks */}
            {isSalaryTypeManagementOpen && (
                <div className={`pl-[30px] transition-all duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                    <Link to="/admin/list-salary-type/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                        <FaList color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>List of Salary Type</p>}

                    </Link>
                    <Link to="/admin/add-salary-type/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                        < FaPlus color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>Add Salary Type</p>}

                    </Link>
                </div>
            )}
            <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer' onClick={toggleExpTypeManagement}>
                <FaBriefcase color='white' />
                {!isCollapsed && <p className='text-[14px] leading-[20px] font-bold text-white'>Exp Type Management</p>}
                {!isCollapsed && (isExpTypeManagementOpen ? <FaChevronLeft color='white' /> : <FaChevronRight color='white' />)}
            </div>
            {/* User Management Tasks */}
            {isExpTypeManagementOpen && (
                <div className={`pl-[30px] transition-all duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                    <Link to="/admin/list-exp-type/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                        <FaAward color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>List of Exp Type</p>}

                    </Link>
                    <Link to="/admin/add-exp-type/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                        < FaPlus color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>Add Exp Type</p>}

                    </Link>
                </div>
            )}
            <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer' onClick={togglePackagePostManagement}>
                <FaRegNewspaper  color='white' />
                {!isCollapsed && <p className='text-[14px] leading-[20px] font-bold text-white'>Package Post Management</p>}
                {!isCollapsed && (isPackagePostManagementOpen ? <FaChevronLeft color='white' /> : <FaChevronRight color='white' />)}
            </div>
            {/* User Management Tasks */}
            {isPackagePostManagementOpen && (
                <div className={`pl-[30px] transition-all duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                    <Link to="/admin/list-package-post/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                        <FaList color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>List of Package Post</p>}

                    </Link>
                    <Link to="/admin/add-package-post/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                        < FaPlus color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>Add Package Post</p>}

                    </Link>
                </div>
            )}
            <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer' onClick={togglePackageCVManagement}>
                <FaFileAlt color='white' />
                {!isCollapsed && <p className='text-[14px] leading-[20px] font-bold text-white'>Package CV Management</p>}
                {!isCollapsed && (isPackageCVManagementOpen ? <FaChevronLeft color='white' /> : <FaChevronRight color='white' />)}
            </div>
            {/* User Management Tasks */}
            {isPackageCVManagementOpen && (
                <div className={`pl-[30px] transition-all duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                    <Link to="/admin/list-package-cv/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                        <FaList color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>List of Package CV</p>}

                    </Link>
                    <Link to="/admin/add-package-cv/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                        < FaPlus color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>Add Package CV</p>}

                    </Link>
                </div>
            )}
                </>
            }
            {user && (user.roleCode === "COMPANY") &&
                <>
                    <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer' onClick={togglePostByCompany}>
                        <FaBuilding  color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-bold text-white'>Company</p>}
                    </div>
                    {/* User Management Tasks */}
                    {isPostByCompanyOpen && (
                        <div className={`pl-[30px] transition-all duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                            <Link to="/admin/edit-company/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                                <FaCogs  color='white' />
                                {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>Company Management</p>}

                            </Link>
                            <Link to="/admin/recruitment/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                                <FaPlusCircle  color='white' />
                                {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>Add HR staff</p>}

                            </Link>
                            <Link to="/admin/list-employer/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                                <FaList  color='white' />
                                {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>HR staff list</p>}

                            </Link>
                            <Link to="/admin/add-user/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                                <FaPlusCircle  color='white' />
                                {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>Create HR staff account</p>}

                            </Link>

                        </div>
                    )}
                    <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer' onClick={toggleCompanyByCompany}>
                        <FaRegNewspaper  color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-bold text-white'>Post Management</p>}
                    </div>
                    {/* User Management Tasks */}
                    {isCompanyByCompanyOpen && (
                        <div className={`pl-[30px] transition-all duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                            <Link to="/admin/add-post/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                                <FaPlusCircle  color='white' />
                                {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>Create new post</p>}

                            </Link>
                            <Link to="/admin/list-post/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                                <FaList  color='white' />
                                {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>List of posts</p>}

                            </Link>
                            <Link to="/admin/buy-post/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                                <FaShoppingCart color='white' />
                                {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>Buy Post Package</p>}

                            </Link>
                        </div>
                    )}
                    <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer' onClick={toggleCvByCompany}>
                        <FaUserTie   color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-bold text-white'>Search for candidates</p>}
                    </div>
                    {/* User Management Tasks */}
                    {isCvByCompanyOpen && (
                        <div className={`pl-[30px] transition-all duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                            <Link to="/admin/buy-cv/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                                <FaPlusCircle  color='white' />
                                {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>Buy candidate views</p>}

                            </Link>
                            <Link to="/admin/list-candiate/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                                <FaList  color='white' />
                                {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>List of candidates</p>}

                            </Link>

                        </div>
                    )}
                    <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer' onClick={toggleHistoryTradeByCompany}>
                        <FaHistory  color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-bold text-white'>Transaction History</p>}
                    </div>
                    {/* User Management Tasks */}
                    {isHistoryTradeByCompanyOpen && (
                        <div className={`pl-[30px] transition-all duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                            <Link to="/admin/history-post/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                                <FaRegNewspaper  color='white' />
                                {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>Post Package History</p>}

                            </Link>
                            <Link to="/admin/history-cv/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                                <FaUserTie   color='white' />
                                {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>Package history view candidates</p>}

                            </Link>

                        </div>
                    )}
                </>
                }
            {user && (user.roleCode === "EMPLOYER") &&
                <> {
                       !user.companyId &&(
                    <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer' onClick={toggleCreateCompany}>
                        <FaBuilding  color='white' />
                        {!isCollapsed && <p className='text-[14px] leading-[20px] font-bold text-white'>Company</p>}
                    </div> )}
                    {/* User Management Tasks */}
                    {isCreateCompanyOpen && (
                        <div className={`pl-[30px] transition-all duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                            <Link to="/admin/add-company/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                                <FaPlusCircle  color='white' />
                                {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>Create new company</p>}

                            </Link>

                        </div>
                    )}
                }
                    {
                        user.companyId &&(
                            <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer' onClick={toggleCompanyByCompany}>
                                <FaRegNewspaper  color='white' />
                                {!isCollapsed && <p className='text-[14px] leading-[20px] font-bold text-white'>Post Management</p>}
                            </div> )}
                    {isCompanyByCompanyOpen && (
                        <div className={`pl-[30px] transition-all duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                            <Link to="/admin/add-post/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                                <FaPlusCircle  color='white' />
                                {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>Create new post</p>}

                            </Link>
                            <Link to="/admin/list-post/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                                <FaList  color='white' />
                                {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>List of posts</p>}

                            </Link>

                        </div>
                    )}
                    {
                        user.companyId &&(
                            <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer' onClick={toggleCvByCompany}>
                                <FaUserTie   color='white' />
                                {!isCollapsed && <p className='text-[14px] leading-[20px] font-bold text-white'>Search for candidates</p>}
                            </div> )}
                    {isCvByCompanyOpen && (
                        <div className={`pl-[30px] transition-all duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                            <Link to="/admin/buy-cv/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                                <FaPlusCircle  color='white' />
                                {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>Buy candidate views</p>}

                            </Link>
                            <Link to="/admin/list-candiate/" className='flex items-center gap-[10px] py-[10px] cursor-pointer'>
                                <FaList  color='white' />
                                {!isCollapsed && <p className='text-[14px] leading-[20px] font-normal text-white'>List of candidates</p>}

                            </Link>

                        </div>
                    )}
                </>
            }
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
