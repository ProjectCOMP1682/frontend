import React from 'react'
import {getDetailCompanyById} from '../../service/userService';
import {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {dateFormat} from '../../util/constant';
import CommonUtils from '../../util/CommonUtils';
import moment from 'moment';
import {
    FaGlobe,
    FaUsers,
    FaCheckCircle,
    FaExclamationCircle,
    FaInfoCircle,
    FaBriefcase,
    FaClipboardList,
    FaHashtag,
    FaClock,
    FaGenderless,
    FaMapMarkerAlt,
    FaBuilding, FaFileInvoice,
} from 'react-icons/fa';
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import {BiDollarCircle, BiTimeFive} from "react-icons/bi";
import {HiLocationMarker} from "react-icons/hi";
import {BsCalendarWeek, BsTelephone} from "react-icons/bs";

const DetailCompany = () => {
    const [dataCompany, setdataCompany] = useState({})
    const {id} = useParams();
    useEffect(() => {
        if (id) {

            let fetchCompany = async () => {
                let res = await getDetailCompanyById(id)
                if (res && res.errCode === 0) {
                    setdataCompany(res.data)
                }
            }
            fetchCompany()
        }
    }, [])

    const copyLink = () => {
        let copyText = document.getElementById("mylink");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyText.value);
    }
    return (
        <div className='py-10'>
            <Breadcrumb>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="relative">
                        {/* Cover Image */}
                        <img
                            src={dataCompany.coverimage}
                            alt="Cover"
                            className="w-full h-60 object-cover md:h-80 lg:h-96"  // Điều chỉnh chiều cao theo màn hình
                        />
                        {/* Company Thumbnail */}
                        <div
                            className="absolute left-1/2 transform -translate-x-1/2 md:left-5 md:translate-x-0 md:bottom-[-50px] md:translate-y-1/2 bg-white rounded-full border-4 border-white shadow-lg z-10">
                            <img
                                src={dataCompany.thumbnail}
                                alt={dataCompany.name}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
                            />
                            {dataCompany.censorData && dataCompany.censorData.code === 'CS1' && (
                                <FaCheckCircle
                                    className="absolute right-[-10px] bottom-[-10px] text-blue-500"
                                    size={24}
                                />
                            )}
                            {dataCompany.censorData && dataCompany.censorData.code === 'CS2' && (
                                <div
                                    className="absolute left-1/2 transform -translate-x-1/2 md:left-5 md:-translate-x-0 md:bottom-[-50px] md:translate-y-1/2 bg-white rounded-full border-4 border-white shadow-lg z-10">
                                    <FaExclamationCircle className="mr-1"/>
                                    Uncensored
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Company Name */}
                    <div className="px-4 md:px-6 pt-24 pb-6 text-center relative">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{dataCompany.name}</h1>

                        {/* Website Info */}
                        <p className="text-gray-700 mt-2 flex justify-center items-center text-sm md:text-base">
                            <FaGlobe className="mr-2 text-blue-600"/>
                            <a href={dataCompany.website} target="_blank" className="text-blue-600 underline">
                                {dataCompany.website}
                            </a>
                        </p>

                        {/* Employee Info */}
                        <p className="text-gray-700 mt-2 flex justify-center items-center text-sm md:text-base">
                            <FaUsers className="mr-2 text-green-600"/>
                            {dataCompany.amountEmployer}+ Employee
                        </p>
                    </div>
                </div>
            </Breadcrumb>


            <div className='py-10'>
                <div className='lg:flex justify-between items-start'>
                    <div className='lg:w-2/3 w-full p-3'>
                        <p className='mb-5'>
                            <p className="text-gray-900 mt-4 flex items-center text-2xl font-bold">
                                <FaInfoCircle
                                    className="mr-2 text-blue-600"/> {/* Icon cho phần Company Introduction */}
                                About the company
                            </p>
                            <div
                                dangerouslySetInnerHTML={{__html: dataCompany.descriptionHTML}}/>

                        </p>
                        <p className='mb-5'>
                            <p className="text-gray-900 mt-4 flex items-center text-2xl font-bold">
                                <FaInfoCircle
                                    className="mr-2 text-blue-600"/> {/* Icon cho phần Company Introduction */}
                                Recruitment
                            </p>

                            <div className="box-body">
                                {dataCompany && dataCompany.postData && dataCompany.postData.length > 0 &&
                                    dataCompany.postData.map((item, index) => {
                                        return (
                                            <Link to={`/job-details/${item.id}`}>
                                                <div key={index} className='bg-white border rounded-md p-5'>
                                                    <img src={dataCompany.thumbnail}
                                                         className="company-logo h-[50px] mb-3"
                                                         alt={item.postDetailData.name}/>
                                                    <h3 className='text-xl font-bold mb-2'>{item.postDetailData.name}</h3>
                                                    <p className='text text-gray-400 mb-4'>{dataCompany.name}</p>
                                                    <p>
                                                        {

                                                            <span
                                                                className='text text-primary text-sm border rounded-md px-5 py-2 border-primary mr-2'>{item.postDetailData.workTypePostData.value}</span>

                                                        }

                                                        {

                                                            <span
                                                                className='text text-primary text-sm border rounded-md px-5 py-2 border-primary mr-2'>{item.postDetailData.jobLevelPostData.value}</span>

                                                        }
                                                    </p>
                                                    <div className='lg:flex items-center mb-5'>
                                                        <p className='mt-4 text-gray-500 flex items-center text-sm'>
                                                            <HiLocationMarker
                                                                className='mr-2'/> {item.postDetailData.provincePostData.value}
                                                        </p>
                                                        <p className='mt-4 lg:ml-3 text-gray-500 flex items-center text-sm'>
                                                            <BiDollarCircle
                                                                className='mr-2'/> Salary: {item.postDetailData.salaryTypePostData.value}
                                                        </p>
                                                        <p className='mt-4 lg:ml-3 text-gray-500 flex items-center text-sm'>
                                                            <BiTimeFive
                                                                className='mr-2'/> Time: {CommonUtils.formatDate(item.timeEnd) <= 0 ?
                                                            <div>Application deadline </div> :
                                                            <div>Still <strong>{CommonUtils.formatDate(item.timeEnd)}</strong> days
                                                            </div>
                                                        }
                                                        </p>
                                                    </div>
                                                    <Link className='btn gradient-btn' to={`/job-details/${item.id}`}>
                                                        View Details
                                                    </Link>
                                                </div>
                                            </Link>

                                        )
                                    })
                                }

                                {
                                    dataCompany && dataCompany.postData && dataCompany.postData.length === 0 &&
                                    <div style={{textAlign: 'center'}}>No posts yet</div>
                                }

                            </div>

                        </p>
                    </div>

                    <div className='lg:w-1/3 w-full p-3'>
                        <div className='bg-gray-100 linear-card p-5 mb-6'>
                            <h3 className='text-xl font-bold mb-5'>Company address</h3>
                            <hr/>

                            <div className='flex justify-between items-center mt-5'>
                                <p className='text-gradient font-bold flex justify-start items-center'>
                                    < FaMapMarkerAlt  className='mr-2'/> {dataCompany.address}</p>

                            </div>
                            <div className='flex justify-between items-center mt-2'>
                                <p className='text-gradient font-bold flex justify-start items-center'>
                                    Map of headquarters :</p>
                            </div>
                            <div className='flex justify-between items-center mt-2'>
                                <iframe width="100%" height={270} frameBorder={0} style={{ border: 0 }} src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCVgO8KzHQ8iKcfqXgrMnUIGlD-piWiPpo&q=${dataCompany.address}&zoom=15&language=vi`} allowFullScreen>
                                </iframe>
                            </div>
                        </div>


                        <div className='bg-gray-100 linear-card p-5 mb-6 mt-6'>
                            <h3 className='text-xl font-bold mb-5'>Share company information</h3>
                            <hr/>
                            <div className='flex justify-between items-center mt-2'>
                                <p className="text-lg font-semibold mb-2">Copy link</p>
                                <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md shadow-md">
                                    <input
                                        id="mylink"
                                        type="text"
                                        defaultValue={window.location.href}
                                        className="url-copy w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        readOnly
                                    />
                                    <button
                                        onClick={copyLink}
                                        className="btn-copy-url bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-md flex items-center justify-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9.75h-1.5A2.25 2.25 0 004.5 12v7.5A2.25 2.25 0 006.75 21.75h7.5A2.25 2.25 0 0016.5 19.5v-1.5m-4.5-12h6.75A2.25 2.25 0 0121 9.75v7.5A2.25 2.25 0 0118.75 19.5H12m-7.5-4.5h9m-9 3h9" />
                                        </svg>
                                    </button>

                                </div>

                            </div>
                            <div className="flex justify-between items-center mt-5">
                                <p className="text-lg font-semibold">Share on social media</p>
                                <div className="flex space-x-4">
                                    <a href="http://www.facebook.com/sharer/sharer.php?u=https://www.topcv.vn/cong-ty/cong-ty-co-phan-tap-doan-hoa-sen/8734.html" target="_blank" rel="noopener noreferrer">
                                        <img src="https://www.topcv.vn/v4/image/job-detail/share/facebook.png" alt="Facebook" className="w-8 h-8 hover:opacity-75" />
                                    </a>
                                    <a href="https://twitter.com/intent/tweet?url=https://www.topcv.vn/cong-ty/cong-ty-co-phan-tap-doan-hoa-sen/8734.html" target="_blank" rel="noopener noreferrer">
                                        <img src="https://www.topcv.vn/v4/image/job-detail/share/twitter.png" alt="Twitter" className="w-8 h-8 hover:opacity-75" />
                                    </a>
                                    <a href="https://www.linkedin.com/cws/share?url=https://www.topcv.vn/cong-ty/cong-ty-co-phan-tap-doan-hoa-sen/8734.html" target="_blank" rel="noopener noreferrer">
                                        <img src="https://www.topcv.vn/v4/image/job-detail/share/linkedin.png" alt="LinkedIn" className="w-8 h-8 hover:opacity-75" />
                                    </a>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default DetailCompany
