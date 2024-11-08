import React from 'react'
import { useEffect, useState } from 'react';
import { getAllListCvByUserIdService } from '../../service/cvService';

import { PAGINATION } from '../../util/constant';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

import moment from 'moment';


const ManageCvCandidate = (props) => {
    const [dataCv, setdataCv] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const [user, setUser] = useState({})
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setUser(userData)
        if (userData) {
            try {
                let fetchData = async () => {
                    let arrData = await getAllListCvByUserIdService({
                        limit: PAGINATION.pagerow,
                        offset: 0,
                        userId: userData.id
                    })
                    if (arrData && arrData.errCode === 0) {
                        setdataCv(arrData.data)
                        setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
                    }
                }
                fetchData();
            } catch (error) {
                console.log(error)
            }
        }


    }, [])

    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getAllListCvByUserIdService({


            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow,
            userId: user.id

        })
        if (arrData && arrData.errCode === 0) {
            setdataCv(arrData.data)

        }
    }

    return (

        <div>

            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">List of Submitted Jobs</h4>

                        <div className="table-responsive pt-2">
                            <table className="table  w-full border border-gray-300">
                                <thead>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">
                                           No
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Job Title
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Sector
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Position
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Address
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Submission time
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Status
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataCv && dataCv.length > 0 &&
                                        dataCv.map((item, index) => {

                                            return (
                                                <tr key={index} className="bg-white hover:bg-gray-50">
                                                    <td className="border border-gray-300 px-4 py-2">{index + 1 + numberPage * PAGINATION.pagerow}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.postCvData.postDetailData.name}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.postCvData.postDetailData.jobTypePostData.value}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.postCvData.postDetailData.jobLevelPostData.value}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.postCvData.postDetailData.provincePostData.value}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{moment(item.createdAt).format('DD-MM-YYYY HH:mm:ss')}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.isChecked === 0 ? 'Not viewed' : 'Viewed'}</td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        <Link style={{ color: '#4B49AC', cursor: 'pointer' }} to={`/job-details/${item.postCvData.id}/`}>View job</Link>
                                                        &nbsp; &nbsp;
                                                        <Link style={{ color: '#4B49AC', cursor: 'pointer' }} to={`/candidate/cv-detail/${item.id}`}>View submitted CVs</Link>
                                                        &nbsp; &nbsp;
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
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

export default ManageCvCandidate
