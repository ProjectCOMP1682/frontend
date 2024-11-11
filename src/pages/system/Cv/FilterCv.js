import React from 'react'
import { useEffect, useState } from 'react';
import { getFilterCv } from '../../../service/cvService';
import { getAllSkillByJobCode, getDetailCompanyByUserId } from '../../../service/userService';
import { useFetchAllcode } from '../../../util/fetch';
import { PAGINATION } from '../../../util/constant';
import ReactPaginate from 'react-paginate';
import { useNavigate} from 'react-router-dom';
import { useParams } from "react-router-dom";
import { Col, Row, Select, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const {confirm} = Modal


const FilterCv = () => {
    const [dataCv, setdataCv] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const [isFirstTime, setIsFirstTime] = useState(true)
    const [inputValue, setInputValue] = useState({
        categoryJobCode: '', experienceJobCode: '', listSkills: [], provinceCode: '', salaryCode: ''
    })
    const [listSkills, setListSkills] = useState([])
    const [isHiddenPercent, setIsHiddenPercent] = useState(true)
    const [companySeeAllow,setCompanySeeAllow] = useState({
        free:0,
        notFree: 0
    })
    let fetchCompany = async (userId, companyId = null) => {
        let res = await getDetailCompanyByUserId(userId, companyId)
        if (res && res.errCode === 0) {
            setCompanySeeAllow({
                free: res.data.allowCvFree,
                notFree: res.data.allowCv
            })
        }
    }
    const navigate = useNavigate();
    const confirmSeeCandiate = (id) => {
        confirm({
            title: 'When viewing, you will lose 1 time viewing candidate information.',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                navigate(`/admin/candiate/${id}/`)
            },

            onCancel() {
            },
          });
    }
    let fetchData = async () => {
        let listSkills = []
        let otherSkills = []
        inputValue.listSkills.forEach(item=> {
            if (typeof item === 'number') {
                listSkills.push(item)
            }else {
                otherSkills.push(item)
            }
        })
        let arrData = await getFilterCv({
            limit: PAGINATION.pagerow,
            offset: 0,
            categoryJobCode: inputValue.categoryJobCode,
            experienceJobCode: inputValue.experienceJobCode,
            salaryCode: inputValue.salaryCode,
            provinceCode: inputValue.provinceCode,
            listSkills: listSkills,
            otherSkills: otherSkills
        })
        if (arrData && arrData.errCode === 0) {
            setdataCv(arrData.data)
            setIsHiddenPercent(arrData.isHiddenPercent)
            setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
        }
    }
    useEffect(() => {
        try {
            let userData = JSON.parse(localStorage.getItem("userData"))
            fetchData();
            if (isFirstTime) {
                fetchCompany(userData.id,userData.companyId)
                setIsFirstTime(false)
            }
        } catch (error) {
            console.log(error)
        }
    }, [inputValue])

    let { data: dataProvince } = useFetchAllcode('PROVINCE');
    let { data: dataExp } = useFetchAllcode('EXPTYPE')
    let { data: dataSalary} = useFetchAllcode('SALARYTYPE')
    let { data: dataJobType} = useFetchAllcode('JOBTYPE')


    dataProvince = dataProvince.map(item=>({
        value: item.code,
        label: item.value,
        type: 'provinceCode'
    }))

    dataExp = dataExp.map(item=>({
        value: item.code,
        label: item.value,
        type: 'experienceJobCode'
    }))

    dataSalary = dataSalary.map(item=>({
        value: item.code,
        label: item.value,
        type: 'salaryCode'
    }))

    dataJobType = dataJobType.map(item=>({
        value: item.code,
        label: item.value,
        type: 'categoryJobCode'
    }))

    const handleChange = async (value, detail,type) => {
        if (!value && !detail) {
            setInputValue({
                ...inputValue,
                [type]: ''
            })
        }
        if (Array.isArray(detail)) {
            setInputValue({
                ...inputValue,
                listSkills: value
            })
        }
        else {
            if (detail.type === 'categoryJobCode') {
                let res = await getAllSkillByJobCode(value)
                let listSkills = res.data.map(item => ({
                    value: item.id,
                    label: item.name
                }))
                setListSkills(listSkills)
                setInputValue({
                    ...inputValue,
                    [detail.type]: value,
                    listSkills: []
                })
            }
            else {
                setInputValue({
                    ...inputValue,
                    [detail.type]: value,
                })
            }
        }
    };

    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getFilterCv({
            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow,
            categoryJobCode: inputValue.categoryJobCode,
            experienceJobCode: inputValue.experienceJobCode,
            listSkills: inputValue.listSkills
        })
        if (arrData && arrData.errCode === 0) {
            setdataCv(arrData.data)

        }
    }
    return (

        <div>

            <div className="col-12 grid-margin">
                <div className="card bg-white p-6 rounded-lg shadow-lg">
                    <div className="card-body">
                        <h4 className="text-lg font-semibold">Candidate List</h4>
                        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
                            <p className="text-lg font-semibold text-gray-800">
                                Free Views: <span className="text-green-600">{companySeeAllow.free}</span>
                            </p>
                            <p className="text-lg font-semibold text-gray-800 mt-2">
                                Number of Views: <span className="text-blue-600">{companySeeAllow.notFree}</span>
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">Sector: <span style={{color: 'red'}}>*</span></label>

                                <Select

                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    showSearch
                                    allowClear
                                    style={{ width: '90%' }} size='default' onChange={(value,detail) => handleChange(value,detail,'categoryJobCode')} value={inputValue.categoryJobCode} options={dataJobType}>
                                </Select>
                            </div>
                            <div>
                                <label className="block font-medium">Experience: </label>

                                <Select
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    showSearch
                                    allowClear
                                    style={{ width: '90%' }} size='default' onChange={(value,detail) => handleChange(value,detail,'experienceJobCode')} value={inputValue.experienceJobCode} options={dataExp}>

                                </Select>
                            </div>
                            <div>
                                <label className="block font-medium">Salary: </label>

                                <Select
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    showSearch
                                    allowClear
                                    style={{ width: '90%' }} size='default' onChange={(value,detail) => handleChange(value,detail,'salaryCode')} value={inputValue.salaryCode} options={dataSalary}>
                                </Select>
                            </div>
                            <div>
                                <label className="block font-medium">Work area: </label>

                                <Select
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    showSearch
                                    allowClear
                                    style={{ width: '90%' }} size='default' onChange={(value,detail) => handleChange(value,detail,'provinceCode')} value={inputValue.provinceCode} options={dataProvince}>

                                </Select>
                            </div>
                            <div>
                                <label className="block font-medium">Skill: </label>

                                <Select
                                    disabled={!inputValue.categoryJobCode}
                                    mode="tags"
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Choose your skill"
                                    onChange={handleChange}
                                    options={listSkills}
                                    value={inputValue.listSkills}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    showSearch
                                >
                                </Select>
                            </div>
                    </div>
                        <div className="table-responsive pt-2">
                            <table className="table w-full border border-gray-300">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2">
                                          No
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Candidate Name
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Sector
                                        </th>
                                        {
                                            !isHiddenPercent &&
                                            <>
                                                <th className="border border-gray-300 px-4 py-2">
                                                    Suitable ratio
                                            </th>
                                                <th className="border border-gray-300 px-4 py-2">
                                                    Evaluate
                                            </th>
                                            </>
                                        }
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
                                                    <td className="border border-gray-300 px-4 py-2">{item.userSettingData.firstName + " " + item.userSettingData.lastName}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.jobTypeSettingData.value}</td>
                                                    {
                                                        !isHiddenPercent &&
                                                        <>
                                                            <td className="border border-gray-300 px-4 py-2">{item.file}</td>
                                                            <td className="border border-gray-300 px-4 py-2"><label className={+item.file.split('%')[0] >= 70 ? 'badge badge-success' : (+item.file.split('%')[0] > 30 ? 'badge badge-warning'  : 'badge badge-danger')}>{+item.file.split('%')[0] >= 70 ? 'Tốt' : (+item.file.split('%')[0] > 30 ? 'Tạm chấp nhận'  : 'Tệ')}</label></td>
                                                        </>
                                                    }
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        <span style={{ color: '#4B49AC', cursor: 'pointer' }} onClick={()=>confirmSeeCandiate(item.userId)}>View candidate details</span>
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

export default FilterCv
