import React from 'react';
import { BiDollarCircle } from 'react-icons/bi';
import { BsCalendarWeek, BsTelephone } from 'react-icons/bs';
import { MdAttachEmail } from 'react-icons/md';
import { HiLocationMarker } from 'react-icons/hi';
import { toast } from 'react-toastify';

const Details = ({ job }) => {
    // get job from local storage
    const applyJob = () => {
        // check if job is already applied
        const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
        const isJobApplied = appliedJobs.find(appliedJob => appliedJob.id === job.id);
        if (isJobApplied) {
            toast.error("Already applied for this job");
            return;
        }
        // add job to local storage
        localStorage.setItem('appliedJobs', JSON.stringify([...appliedJobs, job]));
        toast.success("Job applied successfully");
    }
    return (
        <div className='py-10'>
            <div className='lg:flex justify-between items-start'>
                <div className='lg:w-2/3 w-full p-3'>
                    <p className='mb-5'>
                        <b>Job Description:</b> {job.jobDescription}
                    </p>
                    <p className='mb-5'>
                        <b>Job Responsibility:</b> {job.jobResponsibility}
                    </p>
                    <p className='mb-5'>
                        <b>Educational Requirements:</b> {job.educationalRequirements}
                    </p>
                    <p className='mb-5'>
                        <b>Experiences:</b> {job.experiences}
                    </p>
                </div>
                <div className='lg:w-1/3 w-full p-3'>
                    <div className='bg-gray-100 linear-card p-5 mb-6'>
                        <h3 className='text-xl font-bold mb-5'>Job Details</h3>
                        <hr />
                        <div className='flex justify-between items-center mt-5'>
                            <p className='text-gradient font-bold flex justify-start items-center'><BiDollarCircle className='mr-2' /> Salary:</p>
                            <p>{job.salary}</p>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <p className='text-gradient font-bold flex justify-start items-center'><BsCalendarWeek className='mr-2' /> Job Title:</p>
                            <p>{job.jobTitle}</p>
                        </div>

                        <h3 className='text-xl font-bold mb-5 mt-8'>Contact Information</h3>
                        <hr />
                        <div className='flex justify-between items-center mt-5'>
                            <p className='text-gradient font-bold flex justify-start items-center'><BsTelephone className='mr-2' /> Phone:</p>
                            <p>{job.phone}</p>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <p className='text-gradient font-bold flex justify-start items-center'><MdAttachEmail className='mr-2' /> Email:</p>
                            <p>{job.email}</p>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <p className='text-gradient font-bold flex justify-start items-center'><HiLocationMarker className='mr-2' /> Address:</p>
                            <p>{job.location}</p>
                        </div>
                    </div>

                    <button className='btn w-full gradient-btn' onClick={applyJob}>
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Details;