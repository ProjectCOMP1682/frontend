import React from 'react'
import FeaturedJobs from '../../components/featuredJobs/FeaturedJobs'
import Hero from '../../components/hero/Hero'
import JobCategoryList from '../../components/jobCategoryList/JobCategoryList'

const Home = () => {
    return (
        <div>
            <Hero/>
            <JobCategoryList/>
            <FeaturedJobs/>
        </div>
    )
}

export default Home