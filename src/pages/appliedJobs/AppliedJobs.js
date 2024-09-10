import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import { Link } from 'react-router-dom';
import { HiLocationMarker } from 'react-icons/hi';
import { BiDollarCircle } from 'react-icons/bi';

const AppliedJobs = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);

    useEffect(() => {
        // get applied jobs from local storage
        const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs'));
        // console.log(appliedJobs);
        setAppliedJobs(appliedJobs);
    }, []);

    const filterJobs = (e) => {
        const value = e.target.value;
        // console.log(value);
        if (value === 'all') {
            const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs'));
            setAppliedJobs(appliedJobs);
        }
        else {
            const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs'));
            const filteredJobs = appliedJobs.filter(job => job.options.includes(value));
            setAppliedJobs(filteredJobs);
        }
    }
    return (
        <div className='py-10'>
            <Breadcrumb>
                <h2 className='text-3xl font-bold mb-2'>
                    "Applied Jobs"
                </h2>
            </Breadcrumb>

            {/* filter */}
            <div className='mt-8 flex justify-end'>
                <div className='bg-gray-200 pr-4 rounded-md'>
                    <select className='rounded-md focus:shadow-none focus:outline-none bg-transparent px-5 py-2 inline-flex' onChange={filterJobs}>
                        <option value="all">All</option>
                        <option value="Remote">Remote Jobs</option>
                        <option value="On Site">On Site Jobs</option>
                        <option value="Part Time">Part Time Jobs</option>
                        <option value="Full Time">Full Time Jobs</option>
                    </select>
                </div>
            </div>
            <div className='mt-8'>
                {
                    appliedJobs ? (
                        appliedJobs?.map(job => (
                            <div key={job.id} className='bg-white border hover:border-primary rounded-md p-5 mb-5 lg:flex block justify-between items-center'>
                                <div className='lg:w-1/5 h-full bg-[#F4F4F4] py-14'>
                                    <img src={job.imageUrl} className='h-[50px] block m-auto' alt="" />
                                </div>
                                <div className='lg:w-3/5 p-5'>
                                    <h3 className='text-xl font-bold mb-2'>
                                        {job.jobTitle}
                                    </h3>
                                    <p className='text text-gray-400 mb-4'>
                                        {job.companyName}
                                    </p>
                                    <p>
                                        {
                                            job.options.map((option, index) => (
                                                <span key={index} className='text text-primary text-sm border rounded-md px-5 py-2 border-primary mr-2'>{option}</span>
                                            ))
                                        }
                                    </p>
                                    <div className='lg:flex items-center'>
                                        <p className='mt-4 text-gray-500 flex items-center text-sm'>
                                            <HiLocationMarker className='mr-2' /> {job.location}
                                        </p>
                                        <p className='mt-4 lg:ml-3 text-gray-500 flex items-center text-sm'>
                                            <BiDollarCircle className='mr-2' /> Salary: {job.salary}
                                        </p>
                                    </div>
                                </div>
                                <div className='lg:w-1/5 p-5 text-right'>
                                    <Link to={`/job-details?id=${job.id}`} state={{ id: job.id }} className='btn gradient-btn'>
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : <div className='text-center text-xl'>
                        "No jobs applied yet"
                    </div>
                }
            </div>
        </div>
    );
};

export default AppliedJobs;