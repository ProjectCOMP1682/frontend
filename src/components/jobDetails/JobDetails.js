import React, {useEffect, useState} from 'react';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import {getDetailPostByIdService} from '../../service/userService'
import moment from 'moment';
import CommonUtils from '../../util/CommonUtils';
import {BiDollarCircle} from "react-icons/bi";
import {HiLocationMarker} from "react-icons/hi"
import {BsCalendarWeek, BsTelephone} from "react-icons/bs";
import { FaBriefcase,FaClipboardList,FaHashtag,FaClock,FaGenderless,FaMapMarkerAlt,FaBuilding,FaGlobe,FaFileInvoice,FaUsers } from 'react-icons/fa';
import SendCvModal from "../modal/SendCvModal";

const JobDetails = () => {
    // get id from url query params
    const { id } = useParams()
    const [isActiveModal, setAcitveModal] = useState(false)
    const [dataPost, setDataPost] = useState({});
    useEffect(() => {
        if (id) {
            fetchPost(id)
        }

    }, [])

    let fetchPost = async (id) => {
        let res = await getDetailPostByIdService(id)
        if (res && res.errCode === 0) {
            setDataPost(res.data)
        }
    }
    const navigate = useNavigate();


    const handleOpenModal = () => {
        if (dataPost.timeEnd && CommonUtils.formatDate(dataPost.timeEnd) > 0) {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (userData)
                setAcitveModal(true)
            else {
                toast.error("Please login to submit your CV.")
                setTimeout(() => {
                    localStorage.setItem("lastUrl", window.location.href)
                    navigate.push("/login")
                }, 1000)
            }

        } else
            toast.error("Application deadline has expired.")
    }

    return (
        <>
            {dataPost.companyData &&
                <main>

                    <div className='py-10'>
                        <Breadcrumb>
                            <img src={dataPost.companyData.thumbnail} className='block mx-auto mb-4 h-[80px]' alt=''/>
                            <h2 className='text-3xl font-bold mb-2'>
                                {dataPost.postDetailData.name}
                            </h2>
                            <p>
                                {dataPost.companyData.name}
                            </p>
                        </Breadcrumb>

                        <div className='py-10'>
                            <div className='lg:flex justify-between items-start'>
                                <div className='lg:w-2/3 w-full p-3'>
                                    <p className='mb-5'>
                                        <b>Job Description:</b>
                                        <div
                                            dangerouslySetInnerHTML={{__html: dataPost.postDetailData.descriptionHTML}}/>

                                    </p>

                                </div>
                                <div className='lg:w-1/3 w-full p-3'>
                                    <div className='bg-gray-100 linear-card p-5 mb-6'>
                                        <h3 className='text-xl font-bold mb-5'>Job Details</h3>
                                        <hr/>
                                        <div className='flex justify-between items-center mt-5'>
                                            <p className='text-gradient font-bold flex justify-start items-center'>
                                                <BsCalendarWeek className='mr-2'/> Job Title:</p>
                                            <p>{dataPost.postDetailData.name}</p>
                                        </div>
                                        <div className='flex justify-between items-center mt-2'>
                                            <p className='text-gradient font-bold flex justify-start items-center'>
                                                <FaBriefcase  className='mr-2'/> Level:</p>
                                            <p>{dataPost.postDetailData.jobLevelPostData.value}</p>
                                        </div>
                                        <div className='flex justify-between items-center mt-2'>
                                            <p className='text-gradient font-bold flex justify-start items-center'>
                                                <FaClipboardList className='mr-2'/> Experiences:</p>
                                            <p>{dataPost.postDetailData.expTypePostData.value}</p>
                                        </div>
                                        <div className='flex justify-between items-center mt-2'>
                                            <p className='text-gradient font-bold flex justify-start items-center'>
                                                <FaHashtag className='mr-2'/> Number of recruitment:</p>
                                            <p>{dataPost.postDetailData.amount}</p>
                                        </div>
                                        <div className='flex justify-between items-center mt-2'>
                                            <p className='text-gradient font-bold flex justify-start items-center'>
                                                <FaClock className='mr-2'/> Working form:</p>
                                            <p>{dataPost.postDetailData.workTypePostData.value}</p>
                                        </div>
                                        <div className='flex justify-between items-center mt-2'>
                                            <p className='text-gradient font-bold flex justify-start items-center'>
                                                <FaGenderless className='mr-2'/> Gender:</p>
                                            <p>{dataPost.postDetailData.genderPostData.value}</p>
                                        </div>
                                        <div className='flex justify-between items-center mt-2'>
                                            <p className='text-gradient font-bold flex justify-start items-center'>
                                                <FaMapMarkerAlt className='mr-2'/> Location:</p>
                                            <p>{dataPost.postDetailData.provincePostData.value}</p>
                                        </div>
                                        <div className='flex justify-between items-center mt-2'>
                                            <p className='text-gradient font-bold flex justify-start items-center'>
                                                <BiDollarCircle className='mr-2'/> Salary:</p>
                                            <p>{dataPost.postDetailData.salaryTypePostData.value}</p>
                                        </div>
                                        <div className='flex justify-between items-center mt-2'>
                                            <p className='text-gradient font-bold flex justify-start items-center'>
                                                <BsCalendarWeek className='mr-2'/> Deadline apply:</p>
                                            <p>{moment.unix(dataPost.timeEnd / 1000).format('DD/MM/YYYY')}</p>
                                        </div>
                                    </div>

                                    <button className='btn w-full gradient-btn  ' onClick={() => handleOpenModal()}>
                                        Apply Now
                                    </button>

                                    <div className='bg-gray-100 linear-card p-5 mb-6 mt-6'>
                                        <h3 className='text-xl font-bold mb-5'>Company Information</h3>
                                        <hr/>
                                        <div className='flex justify-between items-center mt-5'>
                                            <p className='text-gradient font-bold flex justify-start items-center'>
                                                <FaBuilding  className='mr-2'/> Company Name:</p>
                                            <p>{dataPost.companyData.name}</p>
                                        </div>
                                        <div className='flex justify-between items-center mt-2'>
                                            <p className='text-gradient font-bold flex justify-start items-center'>
                                                <FaGlobe className='mr-2'/> Website :</p>
                                            <p>{dataPost.companyData.website}</p>
                                        </div>
                                        <div className='flex justify-between items-center mt-2'>
                                            <p className='text-gradient font-bold flex justify-start items-center'>
                                                <HiLocationMarker className='mr-2'/> Address :</p>
                                            <p>{dataPost.companyData.address}</p>
                                        </div>
                                        <div className='flex justify-between items-center mt-2'>
                                            <p className='text-gradient font-bold flex justify-start items-center'>
                                                <BsTelephone className='mr-2'/> Phone :</p>
                                            <p>{dataPost.companyData.phonenumber}</p>
                                        </div>
                                        <div className='flex justify-between items-center mt-2'>
                                            <p className='text-gradient font-bold flex justify-start items-center'>
                                                <FaFileInvoice className='mr-2'/> Tax code :</p>
                                            <p>{dataPost.companyData.taxnumber}</p>
                                        </div>
                                        <div className='flex justify-between items-center mt-2'>
                                            <p className='text-gradient font-bold flex justify-start items-center'>
                                                <FaUsers className='mr-2'/> Number of employees :</p>
                                            <p>{dataPost.companyData.amountEmployer}</p>
                                        </div>


                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    <SendCvModal isOpen={isActiveModal} onHide={() => setAcitveModal(false)} postId={id} />
                </main>
            }
        </>

    )

}

export default JobDetails;