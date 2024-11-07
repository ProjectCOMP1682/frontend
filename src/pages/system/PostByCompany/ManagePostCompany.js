import React from 'react'
import { useEffect, useState } from 'react';
import { banPostService, getAllPostByAdminService, activePostService, getAllPostByRoleAdminService, acceptPostService } from '../../../service/userService';
import moment from 'moment';
import { PAGINATION } from '../../../util/constant';
import ReactPaginate from 'react-paginate';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import NoteModal from '../../../components/modal/NoteModal';
import { Col, Modal, Row, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import CommonUtils from '../../../util/CommonUtils';
import {Input} from 'antd'
const {confirm} = Modal
const ManagePostCompany = () => {
    const { id } = useParams()
    const [isSearchBy,setIsSearchBy] = useState(false)
    const [dataPost, setdataPost] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const [user, setUser] = useState({})
    const [search,setSearch] = useState('')
    const [censorCode,setCensorCode] = useState('PS3')
    const [propsModal, setPropsModal] = useState({
        isActive: false,
        handlePost: () => { },
        postId: ''
    })
    const [total, setTotal] = useState(0)
    const censorOptions = [
        {
            value: '',
            label: 'All'
        },
        {
            value : 'PS1',
            label: 'Moderated'
        },
        {
            value: 'PS2',
            label: 'Rejected'
        },
        {
            value: 'PS3',
            label: 'Pending approval'
        },
        {
            value: 'PS4',
            label: 'The post has been blocked'
        }
    ]
    useEffect(() => {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (id && !isSearchBy) {
                setIsSearchBy(true)
                let fetchDataById = async () => {
                    setSearch(id)
                    setCensorCode('')
                    let arrDataById = await getAllPostByAdminService({
                        limit: PAGINATION.pagerow,
                        offset: 0,
                        search: id,
                        censorCode: ''
                    })
                    if (arrDataById && arrDataById.errCode === 0) {
                        setdataPost(arrDataById.data)
                        setnumberPage(0)
                        setCount(Math.ceil(arrDataById.count / PAGINATION.pagerow))
                        setTotal(arrDataById.count)
                    }
                }
                fetchDataById()
            }
            else {
                if (userData) {
                    let fetchData = async () => {
                        let arrData = []
                        if (userData.roleCode == 'ADMIN') {
                            arrData = await getAllPostByRoleAdminService({
                                limit: PAGINATION.pagerow,
                                offset: 0,
                                search: CommonUtils.removeSpace(search),
                                censorCode: censorCode
                            })
                        }
                        else {
                            arrData = await getAllPostByAdminService({
                                limit: PAGINATION.pagerow,
                                offset: 0,
                                companyId: userData.companyId,
                                search: CommonUtils.removeSpace(search),
                                censorCode: censorCode
                            })
                        }
                        if (arrData && arrData.errCode === 0) {
                            setdataPost(arrData.data)
                            setnumberPage(0)
                            setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
                            setTotal(arrData.count)
                        }
                    }
                    fetchData();
                    setUser(userData)
                }
            }

        } catch (error) {
            console.log(error)
        }

    }, [search,censorCode])

    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = []
        if (user.roleCode == 'ADMIN') {
            arrData = await getAllPostByRoleAdminService({
                limit: PAGINATION.pagerow,
                offset: number.selected * PAGINATION.pagerow,
                search: CommonUtils.removeSpace(search),
                censorCode: censorCode

            })
        }
        else {
            arrData = await getAllPostByAdminService({
                limit: PAGINATION.pagerow,
                offset: number.selected * PAGINATION.pagerow,
                companyId: user.companyId,
                search: CommonUtils.removeSpace(search),
                censorCode: censorCode
            })
        }
        if (arrData && arrData.errCode === 0) {
            setdataPost(arrData.data)
            setTotal(arrData.count)

        }
    }
    let handleOnChangeCensor = (value) => {
        setCensorCode(value)
    }
    let handleBanPost = async (id, note) => {
        let res = await banPostService({
            postId: id,
            userId: user.id,
            note: note
        })
        if (res && res.errCode === 0) {
            let arrData = []
            if (user.roleCode == 'ADMIN') {
                arrData = await getAllPostByRoleAdminService({
                    limit: PAGINATION.pagerow,
                    offset: numberPage * PAGINATION.pagerow,
                    search: CommonUtils.removeSpace(search),
                    censorCode: censorCode

                })
            }
            else {
                arrData = await getAllPostByAdminService({
                    limit: PAGINATION.pagerow,
                    offset: numberPage * PAGINATION.pagerow,
                    companyId: user.companyId,
                    search: CommonUtils.removeSpace(search),
                    censorCode: censorCode
                })
            }
            if (arrData && arrData.errCode === 0) {
                setdataPost(arrData.data)
                setTotal(arrData.count)

            }
            toast.success(res.errMessage)
        } else {
            toast.error(res.errMessage)
        }
    }
    let handleActivePost = async (id, note) => {
        let res = await activePostService({
            id: id,
            userId: user.id,
            note: note
        })
        if (res && res.errCode === 0) {
            let arrData = []
            if (user.roleCode == 'ADMIN') {
                arrData = await getAllPostByRoleAdminService({
                    limit: PAGINATION.pagerow,
                    offset: numberPage * PAGINATION.pagerow,
                    search: CommonUtils.removeSpace(search),
                    censorCode: censorCode

                })
            }
            else {
                arrData = await getAllPostByAdminService({
                    limit: PAGINATION.pagerow,
                    offset: numberPage * PAGINATION.pagerow,
                    companyId: user.companyId,
                    search: CommonUtils.removeSpace(search),
                    censorCode: censorCode
                })
            }
            if (arrData && arrData.errCode === 0) {
                setdataPost(arrData.data)
                setTotal(arrData.count)

            }
            toast.success(res.errMessage)
        } else {
            toast.error(res.errMessage)
        }
    }
    let handleAccecptPost = async (id, note = null, statusCode = 'PS2') => {
        let res = await acceptPostService({
            id: id,
            statusCode: statusCode,
            note: note,
            userId: user.id
        })
        if (res && res.errCode === 0) {
            let arrData = []
            if (user.roleCode == 'ADMIN') {
                arrData = await getAllPostByRoleAdminService({
                    limit: PAGINATION.pagerow,
                    offset: numberPage * PAGINATION.pagerow,
                    search: CommonUtils.removeSpace(search),
                    censorCode: censorCode

                })
            }
            else {
                arrData = await getAllPostByAdminService({
                    limit: PAGINATION.pagerow,
                    offset: numberPage * PAGINATION.pagerow,
                    companyId: user.companyId,
                    search: CommonUtils.removeSpace(search),
                    censorCode: censorCode
                })
            }
            if (arrData && arrData.errCode === 0) {
                setdataPost(arrData.data)
                setTotal(arrData.count)

            }
            toast.success(res.errMessage)
        } else {
            toast.error(res.errMessage)
        }
    }
    const confirmPost = (id) => {
        confirm({
                title: 'Are you sure you want to browse this article?',
            icon: <ExclamationCircleOutlined />,    
            onOk() {
                handleAccecptPost(id, '', 'PS1')
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
                <div className="card">
                    <div className="card-body">
                        <h4 className="text-lg font-semibold">List of posts</h4>

                        <Input.Search  onSearch={handleSearch} placeholder={ "Enter post name or code"} allowClear enterButton="Search">
                        </Input.Search>
                        <div className='flex items-center'>
                            <label className='mr-2'>Status Type: </label>
                            <Select onChange={(value)=> handleOnChangeCensor(value)} style={{width:'50%'}} size='default' defaultValue={id ? censorOptions[0].value : censorOptions[3].value} options={censorOptions}>

                            </Select>
                        </div>

                        <div>Number of posts: {total}</div>
                        <div className="table-responsive pt-2">
                            <table className="table  w-full border border-gray-300">
                                <thead>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">
                                            No
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Post code
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Post Name
                                        </th>

                                    <th className="border border-gray-300 px-4 py-2">

                                        Poster Name
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        End date
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
                                    {dataPost && dataPost.length > 0 &&
                                        dataPost.map((item, index) => {
                                            let date = moment.unix(item.timeEnd / 1000).format('DD/MM/YYYY')
                                            return (
                                                    <tr key={index} className="bg-white hover:bg-gray-50">
                                                        <td className="border border-gray-300 px-4 py-2">{index + 1 + numberPage * PAGINATION.pagerow}</td>
                                                        <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                                                        <td className="border border-gray-300 px-4 py-2">{item.postDetailData.name}</td>

                                                        <td className="border border-gray-300 px-4 py-2">{`${item.userPostData.firstName} ${item.userPostData.lastName}`}</td>
                                                        <td className="border border-gray-300 px-4 py-2">{date}</td>
                                                        <td className="border border-gray-300 px-4 py-2"><label className={item.statusPostData.code == 'PS1' ? 'badge badge-success' : (item.statusPostData.code == 'PS3' ? 'badge badge-warning'  : 'badge badge-danger')}>{item.statusPostData.value}</label></td>

                                                        <td className="border border-gray-300 px-4 py-2">
                                                        <Link style={{color:'#4B49AC'}} to={`/admin/note/${item.id}`}>Note</Link>
                                                        &nbsp; &nbsp;
                                                        {(user.roleCode == 'COMPANY' || user.roleCode == 'EMPLOYER') &&
                                                            <>
                                                                <Link style={{ color: '#4B49AC' }} to={`/admin/list-cv/${item.id}/`}>View CV apply</Link>
                                                                &nbsp; &nbsp;
                                                            </>
                                                        }
                                                        { 
                                                        item.statusCode.code !== 'PS4' &&
                                                        <Link style={{ color: '#4B49AC' }} to={`/admin/edit-post/${item.id}/`}>{user?.roleCode === "ADMIN" ? 'View details' : 'Edit'}</Link>
                                                        }
                                                        &nbsp; &nbsp;
                                                        {user.roleCode == 'ADMIN' ? (item.statusCode == 'PS1' ? <>
                                                            <a style={{ color: '#4B49AC', cursor: 'pointer' }} onClick={() => setPropsModal({
                                                                isActive: true,
                                                                handlePost: handleBanPost,
                                                                postId: item.id
                                                            })}  >Chặn</a>
                                                            &nbsp; &nbsp;
                                                        </>
                                                            : item.statusCode == 'PS4' ? <>
                                                                <a style={{ color: '#4B49AC', cursor: 'pointer' }} onClick={() => setPropsModal({
                                                                    isActive: true,
                                                                    handlePost: handleActivePost,
                                                                    postId: item.id
                                                                })}  >Mở lại</a>
                                                            </> : <>
                                                                <a style={{ color: '#4B49AC', cursor: 'pointer' }} onClick={() => confirmPost(item.id)}  >Browse</a>
                                                                {
                                                                    item.statusCode !== 'PS2' &&
                                                                    <a style={{ color: '#4B49AC', cursor: 'pointer', marginLeft: '10px' }} onClick={() => setPropsModal({
                                                                        isActive: true,
                                                                        handlePost: handleAccecptPost,
                                                                        postId: item.id
                                                                    })}  >Reject</a>
                                                                }
                                                            </>) : <></>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                            {
                                            dataPost && dataPost.length == 0 && (
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
            <NoteModal isOpen={propsModal.isActive} onHide={() => setPropsModal({
                isActive: false,
                handlePost: () => { },
                id: ''
            })} id={propsModal.postId} handleFunc={propsModal.handlePost} />
        </div>
    )
}

export default ManagePostCompany
