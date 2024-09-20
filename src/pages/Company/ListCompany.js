import { getListCompany } from '../../service/userService';
import React, { useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import CommonUtils from '../../util/CommonUtils';
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import {Input} from "antd";
import {Link} from "react-router-dom";
const ListCompany = () => {
    const [dataCompany, setdataCompany] = useState([])
    const [count, setCount] = useState('')
    const [countData,setCountData] = useState(0)
    const [numberPage, setnumberPage] = useState('')
    const [search,setSearch] = useState('')
    const handleSearch = (value) => {
        setSearch(value)
    }
    let fetchData = async () => {
        let arrData = await getListCompany({
            limit: 4,
            offset: 0,
            search: CommonUtils.removeSpace(search)
        })
        if (arrData && arrData.errCode === 0) {
            setdataCompany(arrData.data)
            setCount(Math.ceil(arrData.count / 6))
            setCountData(arrData.count)
        }
    }
    useEffect(() => {
        try {
            fetchData();
            setnumberPage(0)
        } catch (error) {
            console.log(error)
        }

    }, [search])
    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getListCompany({
            limit: 4,
            offset: number.selected * 4,
            search : CommonUtils.removeSpace(search)
        })
        if (arrData && arrData.errCode === 0) {
            setdataCompany(arrData.data)
            setCountData(arrData.count)
        }
    }
    const [expandedIndex, setExpandedIndex] = useState(null);


    const charLimit = 100; // Giới hạn số ký tự hiển thị ban đầu

    return (
        <div className='py-10'>
            <Breadcrumb>
                <h2 className='text-3xl font-bold mb-2'>
                    All Companys
                </h2>
            </Breadcrumb>
            <div className='mt-8'>

                <div className="col-xl-9 col-lg-9 col-md-8">

                    <section className="featured-job-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="count-job mb-35">
                                        <span> Found {countData} companies</span>
                                        <Input.Search onSearch={handleSearch} className='mt-5 mb-5'
                                                      placeholder="Enter company name" allowClear enterButton="Search">

                                        </Input.Search>

                                    </div>
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-10'>
                                {dataCompany && dataCompany.length > 0 &&
                                    dataCompany.map((item, index) => {
                                        const isExpanded = expandedIndex === index;
                                    return (
                                        <Link to={`/detail-company/${item.id}`}>
                                            <div className="single-job-items mb-30">
                                                <div className='bg-white border rounded-md p-5'>
                                                    <img
                                                        src={item.coverimage}
                                                        className="company-cover w-full h-[150px] object-cover mb-3 rounded-md"
                                                        alt={`${item.name} cover`}
                                                    />
                                                    <img src={item.thumbnail} className="company-logo h-[50px] mb-3" alt={item.name} />
                                                    <h3 className='text-xl font-bold mb-2'>{item.name}</h3>

                                                    <div className='lg:flex items-center mb-5'>
                                                        <p dangerouslySetInnerHTML={{
                                                            __html: isExpanded
                                                                ? item.descriptionHTML
                                                                : item.descriptionHTML.slice(0, charLimit) + '...'
                                                        }}></p>
                                                    </div>
                                                    <Link className='btn gradient-btn'to={`/detail-company/${item.id}`} >
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>


                        </div>
                    </section>
                            <ReactPaginate
                                forcePage={numberPage}
                                previousLabel={'<'}
                                nextLabel={'>'}
                                breakLabel={'...'}
                                pageCount={count}
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

                </div>
            </div>
        </div>
            )
}

export default ListCompany
