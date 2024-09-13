import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getListJobTypeAndCountPost } from '../../service/userService'
import Category from '../../components/jobCategoryList/Category.js'

const Categories = () => {

const [allCategory, setAllCategory] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getListJobTypeAndCountPost({
                    limit: 10,
                    offset: 0
                });
                if (res.errCode === 0) {
                    setAllCategory(res.data);
                } else {
                    toast.error(res.message);
                }
            } catch (error) {
                toast.error('An error occurred while fetching data.');
            }
        };

        fetchData();
    }, []);


    return (
        <div className='py-10'>
            <div className='text-center'>
                <h2 className='text-3xl font-bold mb-2'>
                    Job Category List
                </h2>
                <p>
                    Explore thousands of job opportunities with all the information you need. Its your future
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10'>
                {
                    allCategory.map((data, index) => {
                        return <Category data={data} key={index}/>
                    })
                }
            </div>
        </div>
    )
}



export default Categories