import React, { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { HiLocationMarker } from 'react-icons/hi'
import { BiDollarCircle } from 'react-icons/bi'

const FeaturedJobs = () => {
    const data = useLoaderData()
    const [jobs, setJobs] = useState([])
    const [btnText, setBtnText] = useState('View All Jobs')
    useEffect(() => {
        // show first 4 jobs
        setJobs(data.slice(0, 4))
    }, [data])

    const viewAllJobs = () => {
        // show all jobs
        if (btnText === 'View All Jobs') {
            setJobs(data)
            setBtnText('View Less Jobs')
        } else {
            // show first 4 jobs
            setJobs(data.slice(0, 4))
            setBtnText('View All Jobs')
        }
    }
    return (
        <div className='py-10'>
            <div className='text-center'>
                <h2 className='text-3xl font-bold mb-2'>
                    Featured Jobs
                </h2>
                <p>
                    Explore thousands of job opportunities with all the information you need. Its your future
                </p>
            </div>

            {/* grid jobs, 2 in a row for desktop devices */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-10'>
                {
                    jobs.map(job => (
                        <div key={job.id} className='bg-white border rounded-md p-5'>
                            <img src={job.imageUrl} className="company-logo h-[50px] mb-3" alt={job.jobTitle} />
                            <h3 className='text-xl font-bold mb-2'>{job.jobTitle}</h3>
                            <p className='text text-gray-400 mb-4'>{job.companyName}</p>
                            <p>
                                {
                                    job.options.map((option, index) => (
                                        <span key={index} className='text text-primary text-sm border rounded-md px-5 py-2 border-primary mr-2'>{option}</span>
                                    ))
                                }
                            </p>
                            <div className='lg:flex items-center mb-5'>
                                <p className='mt-4 text-gray-500 flex items-center text-sm'>
                                    <HiLocationMarker className='mr-2' /> {job.location}
                                </p>
                                <p className='mt-4 lg:ml-3 text-gray-500 flex items-center text-sm'>
                                    <BiDollarCircle className='mr-2' /> Salary: {job.salary}
                                </p>
                            </div>
                            <Link className='btn gradient-btn' to={`/job-details?id=${job.id}`} state={{ id: job.id }}>
                                View Details
                            </Link>
                        </div>
                    ))
                }
            </div>

            {/* button to view all jobs */}
            <div className='text-center mt-10'>
                <button className='btn gradient-btn' onClick={viewAllJobs}>
                    {btnText}
                </button>
            </div>
        </div>
    )
}

export default FeaturedJobs