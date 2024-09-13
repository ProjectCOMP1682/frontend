import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import RightContent from './RightPage/RightContent'
import LeftBar from './LeftPage/LeftBar'

import { PAGINATION } from '../../util/constant';
import ReactPaginate from 'react-paginate';

import { getListPostService } from '../../service/userService'
import CommonUtils from '../../util/CommonUtils';
const AllJobs = () => {

    const [countPage, setCountPage] = useState(1)
    const [post, setPost] = useState([])
    const [count, setCount] = useState(0)
    const [numberPage, setNumberPage] = useState('')
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(PAGINATION.pagerow)

    const [workType, setWorkType] = useState([])
    const [jobType, setJobType] = useState('')
    const [salary, setSalary] = useState([])
    const [exp, setExp] = useState([])
    const [jobLevel, setJobLevel] = useState([])
    const [jobLocation, setJobLocation] = useState('')
    const [search,setSearch] = useState('')
    const [loading, setLoading] = useState(false);

    const loadPost = useCallback(async (limit, offset, sortName) => {
        let params = {
            limit: limit,
            offset: offset,
            categoryJobCode: jobType,
            addressCode: jobLocation,
            salaryJobCode: salary,
            categoryJoblevelCode: jobLevel,
            categoryWorktypeCode: workType,
            experienceJobCode: exp,
            sortName: sortName,
            search : CommonUtils.removeSpace(search)
        }
        setLoading(true);
        try {
            const response = await getListPostService(params);
            if (response && response.errCode === 0) {
                setPost(response.data);
                setCountPage(Math.ceil(response.count / limit));
                setCount(response.count);
            } else {
                console.error('Failed to fetch posts:', response.message);
            }
        } catch (error) {
            console.error('An error occurred while fetching posts:', error);
        } finally {
            setLoading(false);
        }
    })

    const handleSearch = useCallback((value) => {
        setSearch(value);
    }, []);
    const recieveWorkType = (data) => {
        setWorkType(prev => {
            let isCheck = workType.includes(data)
            if (isCheck)
                return workType.filter(item => item !== data)
            else
                return [...prev, data]
        })
    }
    const recieveSalary = (data) => {
        setSalary(prev => {
            let isCheck = salary.includes(data)
            if (isCheck)
                return salary.filter(item => item !== data)
            else
                return [...prev, data]
        })
    }
    const recieveExp = (data) => {
        setExp(prev => {
            let isCheck = exp.includes(data)
            if (isCheck)
                return exp.filter(item => item !== data)
            else
                return [...prev, data]
        })
    }
    const recieveJobType = (data) => {
        jobType === data ? setJobType('') : setJobType(data)
    }
    const recieveJobLevel = (data) => {
        setJobLevel(prev => {
            let isCheck = jobLevel.includes(data)
            if (isCheck)
                return jobLevel.filter(item => item !== data)
            else
                return [...prev, data]
        })
    }
    const recieveLocation = (data) => {
        jobLocation === data ? setJobLocation('') : setJobLocation(data)
    }
    useEffect(() => {
        let filterdata = async () => {
            let params = {
                limit: limit,
                offset: 0,
                categoryJobCode: jobType,
                addressCode: jobLocation,
                salaryJobCode: salary,
                categoryJoblevelCode: jobLevel,
                categoryWorktypeCode: workType,
                experienceJobCode: exp,
                search: CommonUtils.removeSpace(search)
            }
            let arrData = await getListPostService(params)
            if (arrData && arrData.errCode === 0) {
                setNumberPage(0)
                setOffset(0)
                setPost(arrData.data)
                setCountPage(Math.ceil(arrData.count / limit))
                setCount(arrData.count)
            }
        }
        filterdata()
    }, [workType, jobLevel, exp, jobType, jobLocation, salary, search])
    const handleChangePage = useCallback((number) => {
        const selectedPage = number.selected;
        setNumberPage(selectedPage);
        setOffset(selectedPage * limit);
        loadPost(limit, selectedPage * limit);
    }, [loadPost, limit]);


    return (
        <div className='py-10'>
            <Breadcrumb>
                <h2 className='text-3xl font-bold mb-2'>
                    All Jobs
                </h2>
            </Breadcrumb>

            {/* filter */}

            <div className='mt-8 flex justify-end'>

            <LeftBar worktype={recieveWorkType} recieveSalary={recieveSalary} recieveExp={recieveExp}
                     recieveJobType={recieveJobType} recieveJobLevel={recieveJobLevel} recieveLocation={recieveLocation}
            />

            </div>


            <div className='mt-8'>

            <div className="col-xl-9 col-lg-9 col-md-8">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                    <RightContent handleSearch={handleSearch} count={count} post={post}/>
                    <ReactPaginate
                        forcePage={numberPage}
                        previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        pageCount={countPage}
                        marginPagesDisplayed={3}
                        containerClassName="flex justify-center space-x-2 py-3"
                        pageClassName="flex items-center justify-center w-10 h-10 border border-gray-300 rounded"
                        pageLinkClassName="flex items-center justify-center w-full h-full text-gray-700 hover:bg-gray-200"
                        previousClassName="flex items-center justify-center w-10 h-10 border border-gray-300 rounded"
                        previousLinkClassName="flex items-center justify-center w-full h-full text-gray-700 hover:bg-gray-200"
                        nextClassName="flex items-center justify-center w-10 h-10 border border-gray-300 rounded"
                        nextLinkClassName="flex items-center justify-center w-full h-full text-gray-700 hover:bg-gray-200"
                        breakClassName="flex items-center justify-center w-10 h-10 border border-gray-300 rounded"
                        breakLinkClassName="flex items-center justify-center w-full h-full text-gray-700 hover:bg-gray-200"
                        activeClassName="bg-[#9873ff] text-white"
                        onPageChange={handleChangePage}
                    />
                    </>
                    )}
            </div>

            </div>
                </div>


    );
};

export default AllJobs;