import React from 'react'
import { useEffect, useState } from 'react';
import { getAllCompany, accecptCompanyService, banCompanyService, unbanCompanyService } from '../../../service/userService';
import moment from 'moment';
import { PAGINATION } from '../../../util/constant';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import NoteModal from '../../../components/modal/NoteModal';
import { Modal, Input, Row, Col, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import CommonUtils from '../../../util/CommonUtils';
const { confirm } = Modal
const ManageCompany = () => {
    const [dataCompany, setdataCompany] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const [user, setUser] = useState({})
    const [search, setSearch] = useState('')
    const [censorCode, setCensorCode] = useState('')
    const [propsModal, setPropsModal] = useState({
        isActive: false,
        handleCompany: () => {
        },
        id: ''
    })
    const [total, setTotal] = useState(0)

    const censorOptions = [
        {
            value: '',
            label: 'All'
        },
        {
            value: 'CS1',
            label: 'Moderated'
        },
        {
            value: 'CS2',
            label: 'Unmoderated'
        },
        {
            value: 'CS3',
            label: 'Pending moderation'
        },
    ]
    let handleOnChangeCensor = (value) => {
        setCensorCode(value)
    }
    useEffect(() => {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (userData) {
                let fetchData = async () => {
                    let arrData = []
                    arrData = await getAllCompany({
                        limit: PAGINATION.pagerow,
                        offset: 0,
                        search: CommonUtils.removeSpace(search),
                        censorCode: censorCode


                    })
                    if (arrData && arrData.errCode === 0) {
                        setdataCompany(arrData.data)
                        setTotal(arrData.count)


                        setnumberPage(0)
                        setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
                    }
                }
                fetchData();
                setUser(userData)
            }

        } catch (error) {
            console.log(error)
        }

    }, [search, censorCode])

    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getAllCompany({
            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow,
            search: CommonUtils.removeSpace(search),
            censorCode: censorCode


        })
        if (arrData && arrData.errCode === 0) {
            setdataCompany(arrData.data)
            setTotal(arrData.count)


        }
    }
    let handleBanCompany = async (id) => {
        let res = await banCompanyService({id: id})
        if (res && res.errCode === 0) {
            let arrData = await getAllCompany({
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow,
                search: CommonUtils.removeSpace(search),
                censorCode: censorCode
            })
            if (arrData && arrData.errCode === 0) {
                setdataCompany(arrData.data)
                setTotal(arrData.count)


            }
            toast.success(res.errMessage)
        } else {
            toast.error(res.errMessage)
        }
    }

    let handleUnBanCompany = async (id) => {
        let res = await unbanCompanyService({id: id})
        if (res && res.errCode === 0) {
            let arrData = await getAllCompany({
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow,
                search: CommonUtils.removeSpace(search),
                censorCode: censorCode
            })
            if (arrData && arrData.errCode === 0) {
                setdataCompany(arrData.data)
                setTotal(arrData.count)


            }
            toast.success(res.errMessage)
        } else {
            toast.error(res.errMessage)
        }
    }

    let handleAccecptCompany = async (id, note = null) => {
        let res = await accecptCompanyService({
            companyId: id,
            note: note,
        })
        if (res && res.errCode === 0) {
            let arrData = await getAllCompany({
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow,
                search: CommonUtils.removeSpace(search),
                censorCode: censorCode


            })
            if (arrData && arrData.errCode === 0) {
                setdataCompany(arrData.data)
                setTotal(arrData.count)


            }
            toast.success(res.errMessage)
        } else {
            toast.error(res.errMessage)
        }
    }
    const confirmPost = (id, type) => {
        let title = type === 'ban' ? `Are you sure you want to deactivate this company` : (type === 'unban' ? `Are you sure you want to active this company` : `Are you sure you want to accept this company`)
        confirm({
            title: title,
            icon: <ExclamationCircleOutlined/>,
            onOk() {
                if (type === 'accept') {
                    handleAccecptCompany(id)
                } else if (type === 'ban') {
                    handleBanCompany(id)
                } else {
                    handleUnBanCompany(id)
                }
            },

            onCancel() {
            },
        });
    }
    const handleSearch = (value) => {
        setSearch(value)
    }
    return (
        <div>
            <div className="col-12 grid-margin">
                <div className="card bg-white p-6 rounded-lg shadow-lg">
                    <div className="card-body">
                        <h4 className="text-xl font-semibold">Company List</h4>

                        <Input.Search
                            onSearch={handleSearch}
                            className="mt-5 mb-5"
                            placeholder="Enter company name or code"
                            allowClear
                            enterButton="Search"
                        />
                            <div className='flex items-center'>
                                <label className='mr-2'>Type of censorship: </label>
                                <Select onChange={(value) => handleOnChangeCensor(value)} className='w-1/2'
                                        size='default' defaultValue={censorOptions[0].value} options={censorOptions}>
                                </Select>
                            </div>

                        <div>Number of companies: {total}</div>
                        <div className="overflow-x-auto pt-2">
                            <table className="table w-full border border-gray-300">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2">No</th>
                                    <th className="border border-gray-300 px-4 py-2">Company code</th>
                                    <th className="border border-gray-300 px-4 py-2">Company name</th>
                                    <th className="border border-gray-300 px-4 py-2">NumberPhone</th>
                                    <th className="border border-gray-300 px-4 py-2">Tax code</th>
                                    <th className="border border-gray-300 px-4 py-2">Status</th>
                                    <th className="border border-gray-300 px-4 py-2">Censor</th>
                                    <th className="border border-gray-300 px-4 py-2">Date of creation</th>
                                    <th className="border border-gray-300 px-4 py-2">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {dataCompany && dataCompany.length > 0 &&
                                    dataCompany.map((item, index) => (
                                        <tr key={index} className="bg-white hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-2">{index + 1 + numberPage * PAGINATION.pagerow}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.phonenumber}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.taxnumber}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <span
                                                    className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${item.statusCompanyData.code == 'S1' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                                    {item.statusCompanyData.value}
                                                </span>
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <span
                                                    className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${item.censorData.code == 'CS1' ? 'bg-green-500 text-white px-2 py-1 rounded' : (item.censorData.code == 'CS3' ? 'bg-yellow-500 text-white ' : 'bg-red-500 text-white ')}`}>
                                                    {item.censorData.value}
                                                </span>
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {
                                                    item.statusCompanyData.code === 'S1' ? (
                                                        <>
                                                            <a className="text-indigo-600 cursor-pointer"
                                                               onClick={() => confirmPost(item.id, 'ban')}>Deactivate</a>
                                                            &nbsp;&nbsp;
                                                        </>
                                                    ) : (
                                                        <>
                                                            <a className="text-indigo-600 cursor-pointer"
                                                               onClick={() => confirmPost(item.id, 'unban')}>Activate</a>
                                                            &nbsp;&nbsp;
                                                        </>
                                                    )
                                                }
                                                <Link className="text-indigo-600"
                                                      to={`/admin/view-detail-company-admin/${item.id}`}>
                                                    {user?.roleCode === "ADMIN" ? 'View details' : 'Edit'}
                                                </Link>
                                                &nbsp;&nbsp;
                                                {item.censorData.code === 'CS3' && (
                                                    <>
                                                        <a className="text-indigo-600 cursor-pointer"
                                                           onClick={() => confirmPost(item.id, 'accept')}>Accept</a>
                                                        &nbsp;&nbsp;
                                                        <a className="text-indigo-600 cursor-pointer"
                                                           onClick={() => setPropsModal({
                                                               isActive: true,
                                                               handleCompany: handleAccecptCompany,
                                                               id: item.id
                                                           })}>Reject</a>
                                                        &nbsp;&nbsp;
                                                    </>
                                                )}
                                                {item.censorData.code === 'CS1' && (
                                                    <>
                                                        <a className="text-indigo-600 cursor-pointer"
                                                           onClick={() => setPropsModal({
                                                               isActive: true,
                                                               handleCompany: handleAccecptCompany,
                                                               id: item.id
                                                           })}>Return to standby</a>
                                                        &nbsp;&nbsp;
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                            {
                                dataCompany && dataCompany.length == 0 && (
                                    <div className="text-center">
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
            <NoteModal isOpen={propsModal.isActive} onHide={() => setPropsModal({
                isActive: false,
                handleCompany: () => {
                },
                id: ''
            })} id={propsModal.id} handleFunc={propsModal.handleCompany}/>
        </div>
    )
}

    export default ManageCompany
