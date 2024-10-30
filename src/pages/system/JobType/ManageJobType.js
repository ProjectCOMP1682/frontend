import React from 'react'
import { useEffect, useState } from 'react';
import { DeleteAllcodeService, getListAllCodeService } from '../../../service/userService';
import moment from 'moment';
import { PAGINATION } from '../../../util/constant';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import CommonUtils from '../../../util/CommonUtils';
import {Input, Modal} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
const {confirm} = Modal

const ManageJobType = () => {
    const [dataJobType, setdataJobType] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const [imgPreview, setimgPreview] = useState('')
    const [isOpen, setisOpen] = useState(false)
    const [search,setSearch] = useState('')
    useEffect(() => {
        try {
            let fetchData = async () => {
                let arrData = await getListAllCodeService({
                    type: 'JOBTYPE',
                    limit: PAGINATION.pagerow,
                    offset: 0,
                    search: CommonUtils.removeSpace(search)
                })
                if (arrData && arrData.errCode === 0) {
                    setnumberPage(0)
                    setdataJobType(arrData.data)
                    setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
                }
            }
            fetchData();
        } catch (error) {
            console.log(error)
        }

    }, [search])
    let openPreviewImage = (url) => {
        setimgPreview(url);
        setisOpen(true);
    }
    let handleDeleteJobType = async (id) => {
        let res = await DeleteAllcodeService(id)
        if (res && res.errCode === 0) {
            toast.success(res.errMessage)
            let arrData = await getListAllCodeService({
                type: 'JOBTYPE',
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow,
                search: CommonUtils.removeSpace(search)
            })
            if (arrData && arrData.errCode === 0) {
                setdataJobType(arrData.data)
                setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
            }

        } else toast.error(res.errMessage)
    }
    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getListAllCodeService({

            type: 'JOBTYPE',
            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow,
            search: CommonUtils.removeSpace(search)

        })
        if (arrData && arrData.errCode === 0) {
            setdataJobType(arrData.data)

        }
    }
    const handleSearch = (value) => {
        setSearch(value)
    }
    const confirmDelete = (id) => {
        confirm({
            title: 'Are you sure you want to delete this field?',
            icon: <ExclamationCircleOutlined />,    
            onOk() {
                handleDeleteJobType(id)
            },
        
            onCancel() {
            },
          });
    }
    return (
        <div>
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="text-lg font-semibold">List of job types</h4>
                        <Input.Search onSearch={handleSearch} className='mt-5 mb-5' placeholder="Enter job name" allowClear enterButton="Search">
                                    
                                    </Input.Search>
                        <div className="table-responsive pt-2">
                            <table className="table  w-full border border-gray-300">
                                <thead>
                                    <tr>
                                        <th  className="border border-gray-300 px-4 py-2">
                                            No
                                        </th>
                                        <th  className="border border-gray-300 px-4 py-2">
                                            Job Type Name
                                        </th>
                                        <th  className="border border-gray-300 px-4 py-2">
                                            Code
                                        </th>
                                        <th  className="border border-gray-300 px-4 py-2">
                                            Image
                                        </th>
                                        <th  className="border border-gray-300 px-4 py-2">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataJobType && dataJobType.length > 0 &&
                                        dataJobType.map((item, index) => {

                                            return (
                                                <tr key={index} className="bg-white hover:bg-gray-50">
                                                    <td  className="border border-gray-300 px-4 py-2">{index + 1 + numberPage * PAGINATION.pagerow}</td>
                                                    <td  className="border border-gray-300 px-4 py-2">{item.value}</td>
                                                    <td  className="border border-gray-300 px-4 py-2">{item.code}</td>
                                                    <td className="border border-gray-300 px-4 py-2" style={{ width: '30%' }}>
                                                        <div
                                                            onClick={() => openPreviewImage(item.image)}
                                                            className="w-full h-64 bg-cover bg-center cursor-pointer"
                                                            style={{

                                                                backgroundImage: `url(${item.image})`,
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center',
                                                                width: '100%',
                                                                height: '200px'  // Set a fixed height
                                                            }}>
                                                        </div>
                                                    </td>
                                                    <td  className="border border-gray-300 px-4 py-2">
                                                        <Link style={{ color: '#4B49AC' }} to={`/admin/edit-job-type/${item.code}/`}>Edit</Link>
                                                        &nbsp; &nbsp;
                                                        <a style={{ color: '#4B49AC' }} href="#" onClick={(event) => confirmDelete(item.code)} >Delete</a>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                            {
                                            dataJobType && dataJobType.length == 0 && (
                                                <div style={{ textAlign: 'center' }}>

                                                    No data available
                                                </div>
                                            )
                            }
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
            {
                isOpen === true &&
                <Lightbox mainSrc={imgPreview}
                    onCloseRequest={() => setisOpen(false)}
                />
            }
        </div>
    )
}

export default ManageJobType
