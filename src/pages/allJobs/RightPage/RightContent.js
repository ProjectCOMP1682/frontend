import React from 'react'
import { Link } from 'react-router-dom'
import Job from '../../../components/Job/Job'
import {Input} from 'antd'
const RightContent = (props) => {
    return (
        <>
            {/* <!-- Featured_job_start --> */}
            <section class="featured-job-area">
                <div class="container">
                    {/* <!-- Count of Job list Start --> */}
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="count-job mb-35">
                                <span>Found {props.count} jobs </span>
                                <Input.Search onSearch={props.handleSearch} className='mt-5' placeholder="Enter post name" allowClear enterButton="Search">

                                </Input.Search>

                                {/* <!-- Select job items start --> */}
                                {/* <div class="select-job-items">
                                                <span>Sort by</span>
                                                <select name="select">
                                                    <option value="">None</option>
                                                    <option value="">job list</option>
                                                    <option value="">job list</option>
                                                    <option value="">job list</option>
                                                </select>
                                            </div> */}
                                {/* <!--  Select job items End--> */}
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-10'>
                    {props.post.map((data, index) => {
                        return (
                            <Link to={`/job-details/${data.id}`}>
                                <div class="single-job-items mb-30">
                                    <Job key={data.id} data={data} />
                                </div>
                            </Link>
                        )
                    })}
                    </div>

                    {/* <div class="single-job-items mb-30">
                                   <Job />
                                </div>

                                <div class="single-job-items mb-30">

                                     <Job />
                                </div>

                                <div class="single-job-items mb-30">
                                    <Job />

                                </div>


                                <div class="single-job-items mb-30">
                                      <Job />
                                </div>

                                <div class="single-job-items mb-30">
                                     <Job />
                                </div>  */}
                </div>
            </section>
            {/* <!-- Featured_job_end --> */}
        </>
    )
}

export default RightContent
