import React, { useState, useEffect, useCallback } from 'react';

import Hero from '../../components/hero/Hero'
import Categories from "../../components/jobCategoryList/Categories";
import FeaturesJobs from "../../components/featuredJobs/FeaturesJobs";
import { getListPostService } from '../../service/userService'

const Home = () => {
    const [dataHot, setDataHot] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [loading, setLoading] = useState(false);

    const loadPost = useCallback(async (limit, offset) => {
        setLoading(true);
        try {
            const arrData = await getListPostService({
                limit: limit,
                offset: offset,
                categoryJobCode: '',
                addressCode: '',
                salaryJobCode: '',
                categoryJoblevelCode: '',
                categoryWorktypeCode: '',
                experienceJobCode: '',
                sortName: false,
                isHot: 1
            });

            if (arrData && arrData.errCode === 0) {
                setDataHot(arrData.data);
            } else {
                console.error('Failed to fetch hot posts:', arrData.message);
            }
        } catch (error) {
            console.error('An error occurred while fetching hot posts:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const limit = showAll ? '' : 6;
        loadPost(limit, 0);
    }, [showAll, loadPost]);

    return (
        <div>
            <Hero />
            <Categories />
            <div className='py-10'>

            {loading ? (
                <div className='text-center mt-10'>Loading...</div>
            ) : (
                <FeaturesJobs dataFeature={dataHot} />
            )}
            <div className='text-center mt-10'>
                <button
                    className='btn gradient-btn'
                    onClick={() => setShowAll(prev => !prev)}
                >
                    {showAll ? 'VIEW LESS JOBS' : 'VIEW ALL JOBS'}
                </button>
            </div>
            </div>
        </div>
    );
};
export default Home