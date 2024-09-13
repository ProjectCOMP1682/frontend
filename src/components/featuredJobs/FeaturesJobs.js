import React from 'react'
import { Link } from 'react-router-dom'
import FeatureJob from "./FeatureJob";

const FeaturesJobs = (props) => {

    return (
        <>
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
                    {props.dataFeature.map((data)=>{
                        return(
                            <Link to={`/job-details/${data.id}`}>
                                <div class="single-job-items mb-30">
                                    <FeatureJob  key={data.id} data={data} />
                                </div>
                            </Link>
                        )
                    })}
                </div>



        </>
    )
}
export default FeaturesJobs
