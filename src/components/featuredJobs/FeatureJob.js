import React from 'react'
import { Link } from 'react-router-dom'
import { HiLocationMarker } from 'react-icons/hi'
import {BiDollarCircle, BiTimeFive} from 'react-icons/bi'
import moment from 'moment';
const FeatureJob = (props) => {
    const handleSplitTime = (time) => {
        return moment(new Date(+time)).fromNow();
    }
    return (
        <>
        <div className='bg-white border rounded-md p-5'>
            <img src={props.data.userPostData.userCompanyData.thumbnail} className="company-logo h-[50px] mb-3" alt={props.data.postDetailData.name} />
            <h3 className='text-xl font-bold mb-2'>{props.data.postDetailData.name}</h3>
            <p className='text text-gray-400 mb-4'>{props.data.userPostData.userCompanyData.name}</p>
            <p>
                {

                    <span className='text text-primary text-sm border rounded-md px-5 py-2 border-primary mr-2'>{props.data.postDetailData.workTypePostData.value}</span>

                }

                {

                    <span className='text text-primary text-sm border rounded-md px-5 py-2 border-primary mr-2'>{props.data.postDetailData.jobLevelPostData.value}</span>

                }
            </p>
            <div className='lg:flex items-center mb-5'>
                <p className='mt-4 text-gray-500 flex items-center text-sm'>
                    <HiLocationMarker className='mr-2' /> {props.data.postDetailData.provincePostData.value}
                </p>
                <p className='mt-4 lg:ml-3 text-gray-500 flex items-center text-sm'>
                    <BiDollarCircle className='mr-2' /> Salary: {props.data.postDetailData.salaryTypePostData.value}
                </p>
                <p className='mt-4 lg:ml-3 text-gray-500 flex items-center text-sm'>
                    <BiTimeFive className='mr-2' /> Time: {handleSplitTime(props.data.timePost)}
                </p>
            </div>
            <Link className='btn gradient-btn'to={`/job-details/${props.data.id}`} >
                View Details
            </Link>
        </div>
        </>
    )
}

export default FeatureJob