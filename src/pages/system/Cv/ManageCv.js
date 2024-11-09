import React from 'react'
import { useEffect, useState } from 'react';
import { getAllListCvByPostService } from '../../../service/cvService';
import { getDetailPostByIdService } from '../../../service/userService';

import { PAGINATION } from '../../../util/constant';
import ReactPaginate from 'react-paginate';
import {Link,  useNavigate} from 'react-router-dom';
import { useParams } from "react-router-dom";


const ManageCv = () => {
    const [dataCv, setdataCv] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const { id } = useParams();
    const [post,setPost] = useState('')
    let fetchPost = async (id) => {
        let res = await getDetailPostByIdService(id)
        if (res && res.errCode === 0) {
            setPost(res.data)
        }
    }
    useEffect(() => {
        if (id) {
            try {
                let fetchData = async () => {
                    let arrData = await getAllListCvByPostService({
                        limit: PAGINATION.pagerow,
                        offset: 0,
                        postId: id
                    })
                    if (arrData && arrData.errCode === 0) {
                        setdataCv(arrData.data)
                        setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
                    }
                }
                fetchData();
                fetchPost(id)
            } catch (error) {
                console.log(error)
            }
        }


    }, [])

    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getAllListCvByPostService({


            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow,
            postId: id

        })
        if (arrData && arrData.errCode === 0) {
            setdataCv(arrData.data)

        }
    }
    const navigate = useNavigate();
    return (

        <div>

            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-4">
                        <div onClick={() => navigate(-1)} className='btn gradient-btn' >
                            Back
                        </div>
                            <h4 className="text-lg font-semibold">Danh sách CV</h4>
                                         <div className='text-center'>
                            <h3>{post && post.postDetailData.name}</h3>
                        </div>
                        <div className="table-responsive pt-2">
                            <table className="table  w-full border border-gray-300">
                                <thead>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">
                                            STT
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                            Tên người nộp
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                            Số điện thoại
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                            Tỉ lệ phù hợp
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                            Đánh giá
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                            Trạng thái
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataCv && dataCv.length > 0 &&
                                        dataCv.map((item, index) => {

                                            return (
                                                <tr key={index} className="bg-white hover:bg-gray-50">
                                                    <td className="border border-gray-300 px-4 py-2">{index + 1 + numberPage * PAGINATION.pagerow}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.userCvData.firstName + " " + item.userCvData.lastName}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.userCvData.userAccountData.phonenumber}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.file}</td>
                                                    <td className="border border-gray-300 px-4 py-2"><label className={+item.file.split('%')[0] >= 70 ? 'badge badge-success' : (+item.file.split('%')[0] > 30 ? 'badge badge-warning'  : 'badge badge-danger')}>{+item.file.split('%')[0] >= 70 ? 'Tốt' : (+item.file.split('%')[0] ? 'Tạm chấp nhận'  : 'Tệ')}</label></td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.isChecked === 0 ? 'Chưa xem' : 'Đã xem'}</td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        <Link style={{ color: '#4B49AC', cursor: 'pointer' }} to={`/admin/user-cv/${item.id}/`}>Xem CV</Link>
                                                        &nbsp; &nbsp;

                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                            {
                                            dataCv && dataCv.length == 0 && (
                                                <div style={{ textAlign: 'center' }}>

                                                    No data available

                                                </div>
                                            )
                            }
                        </div>
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

export default ManageCv
