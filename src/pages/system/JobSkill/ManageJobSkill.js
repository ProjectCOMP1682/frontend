import React from 'react'
import { useEffect, useState } from 'react';
import { DeleteSkillService, getListSkill } from '../../../service/userService';
import { PAGINATION } from '../../../util/constant';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-image-lightbox/style.css';
import CommonUtils from '../../../util/CommonUtils';
import {Input, Modal, Row, Col, Select} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useFetchAllcode } from '../../../util/fetch';
const {confirm} = Modal

const ManageJobSkill = () => {
    const [dataJobSkill, setdataJobSkill] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const [search,setSearch] = useState('')
    const [categoryJobCode,setCategoryJobCode] = useState('')
    useEffect(() => {
        try {
            let fetchData = async () => {
                let arrData = await getListSkill({
                    categoryJobCode: categoryJobCode,
                    limit: PAGINATION.pagerow,
                    offset: 0,
                    search: CommonUtils.removeSpace(search)
                })
                if (arrData && arrData.errCode === 0) {
                    setnumberPage(0)
                    setdataJobSkill(arrData.data)
                    setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
                }
            }
            fetchData();
        } catch (error) {
            console.log(error)
        }

    }, [search,categoryJobCode])

    let { data: listCategoryJobCode } = useFetchAllcode('JOBTYPE');
    listCategoryJobCode = listCategoryJobCode.map(item=> ({
        value: item.code,
        label: item.value
    }))
    listCategoryJobCode.unshift({
        value: '',
        label: 'All'
    })

    let handleDeleteJobSkill = async (id) => {
        let res = await DeleteSkillService(id)
        if (res && res.errCode === 0) {
            toast.success(res.errMessage)
            let arrData = await getListSkill({
                categoryJobCode: '',
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow,
                search: CommonUtils.removeSpace(search)
            })
            if (arrData && arrData.errCode === 0) {
                setdataJobSkill(arrData.data)
                setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
            }

        } else toast.error(res.errMessage)
    }
    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getListSkill({

            categoryJobCode: categoryJobCode,
            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow,
            search: CommonUtils.removeSpace(search)

        })
        if (arrData && arrData.errCode === 0) {
            setdataJobSkill(arrData.data)

        }
    }
    let handleOnChangeCategoryJobCode = async(value) => {
        setCategoryJobCode(value)
    }
    const handleSearch = (value) => {
        setSearch(value)
    }
    const confirmDelete = (id) => {
        confirm({
            title: 'Are you sure you want to delete this skill?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                handleDeleteJobSkill(id)
            },

            onCancel() {
            },
          });
    }
    return (
        <div>
            <div className="col-12 grid-margin">
                <div className="card bg-white p-6 rounded-lg shadow-lg">
                    <div className="card-body">
                        <h4 className="text-xl font-semibold">List of skills</h4>

                        <Input.Search  onSearch={handleSearch} placeholder="Enter skill name " allowClear enterButton="Search">
                        </Input.Search>

                        <div className='flex items-center'>
                                <label className='mr-2'>Status Type: </label>
                                <Select onChange={(value)=> handleOnChangeCategoryJobCode(value)} defaultValue={listCategoryJobCode[0]} style={{width:'50%'}} size='default' options={listCategoryJobCode ? listCategoryJobCode : []}>
                                </Select>
                        </div>
                        <div className="overflow-x-auto pt-2">
                            <table className="table w-full border border-gray-300">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2">
                                            No
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                            Skill name
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                            Job type
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataJobSkill && dataJobSkill.length > 0 &&
                                        dataJobSkill.map((item, index) => {

                                            return (
                                                <tr key={index}  className="bg-white hover:bg-gray-50">
                                                    <td className="border border-gray-300 px-4 py-2">{index + 1 + numberPage * PAGINATION.pagerow}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.jobTypeSkillData.value}</td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        <Link style={{ color: '#4B49AC' }} to={`/admin/edit-job-skill/${item.id}/`}>Edit</Link>
                                                        &nbsp; &nbsp;
                                                        <a style={{ color: '#4B49AC' }} href="#" onClick={(event) => confirmDelete(item.id)} >Delete</a>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                            {
                                            dataJobSkill && dataJobSkill.length == 0 && (
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
        </div>
    )
}

export default ManageJobSkill
