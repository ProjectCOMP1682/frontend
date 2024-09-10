import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import Details from '../details/Details';

const JobDetails = () => {
    // get id from url query params
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id');
    // console.log(id);
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('./data.json')
            .then(res => res.json())
            .then(data => {
                // find job with the id from query params
                const job = data.find(job => job.id === id);
                setData(job);
            })
    }, [id]);

    // console.log(data);
    return (
        <div className='py-10'>
            <Breadcrumb>
                <img src={data.imageUrl} className='block mx-auto mb-4 h-[80px]' alt='' />
                <h2 className='text-3xl font-bold mb-2'>
                    {data?.jobTitle}
                </h2>
                <p>
                    {data?.companyName}
                </p>
            </Breadcrumb>

            <Details job={data} />
        </div>
    );
};

export default JobDetails;