import React from 'react'
import {useEffect, useState} from 'react';

import {getDetailPostByIdService, getDetailCompanyByUserId} from '../../../service/userService';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import {useFetchAllcode} from '../../../util/fetch';
import {useNavigate,useParams} from "react-router-dom";
import {Spinner, Modal} from 'reactstrap'
import moment from 'moment';

const ViewPost = () => {
    const today = new Date();
    const mdParser = new MarkdownIt();
    const [user, setUser] = useState({})
    const [timeEnd, settimeEnd] = useState('');
    const [isChangeDate, setisChangeDate] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const {id} = useParams();
    const navigate = useNavigate();

    const [companyPostAllow, setCompanyPostAllow] = useState({
        hot: 0,
        nonHot: 0
    })
    const [inputValues, setInputValues] = useState({
        name: '',
        categoryJobCode: '',
        addressCode: '',
        salaryJobCode: '',
        amount: '',
        timeEnd: '',
        categoryJoblevelCode: '',
        categoryWorktypeCode: '',
        experienceJobCode: '',
        genderCode: '',
        descriptionHTML: '',
        descriptionMarkdown: '',
        isActionADD: true,
        id: '',
        isHot: 0
    });
    const [propsModal, setPropsModal] = useState({
        isActive: false,
        handlePost: () => {
        },
    })
    let fetchCompany = async (userId, companyId = null) => {
        let res = await getDetailCompanyByUserId(userId, companyId)
        if (res && res.errCode === 0) {
            setCompanyPostAllow({
                ...companyPostAllow,
                hot: res.data.allowHotPost,
                nonHot: res.data.allowPost
            })
        }
    }
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData !== "ADMIN") {
            fetchCompany(userData.id)
        }
        if (id) {
            fetchPost(id)
        }
        setUser(userData)
    }, [])
    let fetchPost = async (id) => {
        let res = await getDetailPostByIdService(id)
        if (res && res.errCode === 0) {
            setStatePost(res.data)
        }
    }
    let setStatePost = (data) => {
        setInputValues({
            ...inputValues,
            ["name"]: data.postDetailData.name,
            ["categoryJobCode"]: data.postDetailData.jobTypePostData.code,
            ["addressCode"]: data.postDetailData.provincePostData.code,
            ["salaryJobCode"]: data.postDetailData.salaryTypePostData.code,
            ["amount"]: data.postDetailData.amount,
            ["timeEnd"]: data.timeEnd,
            ["categoryJoblevelCode"]: data.postDetailData.jobLevelPostData.code,
            ["categoryWorktypeCode"]: data.postDetailData.workTypePostData.code,
            ["experienceJobCode"]: data.postDetailData.expTypePostData.code,
            ["genderCode"]: data.postDetailData.genderPostData.code,
            ["descriptionHTML"]: data.postDetailData.descriptionHTML,
            ["descriptionMarkdown"]: data.postDetailData.descriptionMarkdown,
            ["isActionADD"]: false,
            ["id"]: data.id

        })
        document.querySelector('[name="categoryJobCode"]').value = data.postDetailData.jobTypePostData.code
        document.querySelector('[name="addressCode"]').value = data.postDetailData.provincePostData.code
        document.querySelector('[name="salaryJobCode"]').value = data.postDetailData.salaryTypePostData.code
        document.querySelector('[name="categoryJoblevelCode"]').value = data.postDetailData.jobLevelPostData.code
        document.querySelector('[name="categoryWorktypeCode"]').value = data.postDetailData.workTypePostData.code
        document.querySelector('[name="experienceJobCode"]').value = data.postDetailData.expTypePostData.code
        document.querySelector('[name="genderCode"]').value = data.postDetailData.genderPostData.code
        settimeEnd(moment.unix(+data.timeEnd / 1000).locale('vi').format('DD/MM/YYYY'))
    }


    const {data: dataGenderPost} = useFetchAllcode('GENDERPOST');
    const {data: dataJobType} = useFetchAllcode('JOBTYPE');
    const {data: dataJobLevel} = useFetchAllcode('JOBLEVEL');
    const {data: dataSalaryType} = useFetchAllcode('SALARYTYPE');
    const {data: dataExpType} = useFetchAllcode('EXPTYPE');
    const {data: dataWorkType} = useFetchAllcode('WORKTYPE');
    const {data: dataProvince} = useFetchAllcode('PROVINCE');

    if (dataGenderPost && dataGenderPost.length > 0 && inputValues.genderCode === '' && dataJobType && dataJobType.length > 0 && inputValues.categoryJobCode === '' && dataJobLevel && dataJobLevel.length > 0 && inputValues.categoryJoblevelCode === '' &&
        dataSalaryType && dataSalaryType.length > 0 && inputValues.salaryJobCode === '' && dataExpType && dataExpType.length > 0 && inputValues.experienceJobCode === '' &&
        dataWorkType && dataWorkType.length > 0 && inputValues.categoryWorktypeCode === '' && dataProvince && dataProvince.length > 0 && inputValues.addressCode === ''
    ) {

        setInputValues({
            ...inputValues,
            ["genderCode"]: dataGenderPost[0].code,
            ["categoryJobCode"]: dataJobType[0].code,
            ["categoryJoblevelCode"]: dataJobLevel[0].code,
            ["salaryJobCode"]: dataSalaryType[0].code,
            ["experienceJobCode"]: dataExpType[0].code,
            ["categoryWorktypeCode"]: dataWorkType[0].code,
            ["addressCode"]: dataProvince[0].code
        })
    }
    const handleOnChange = event => {
        const {name, value} = event.target;
        setInputValues({...inputValues, [name]: value});

    };
    let handleIsHot = (e) => {
        setInputValues({
            ...inputValues,
            isHot: e.target.checked ? 1 : 0
        })
    }
    let handleEditorChange = ({html, text}) => {
        setInputValues({
            ...inputValues,
            ["descriptionMarkdown"]: text,
            ["descriptionHTML"]: html
        })
    }
    let handleOnChangeDatePicker = (date) => {
        settimeEnd(date[0])
        setisChangeDate(true)

    }


    return (
        <>
            <div className=''>
                <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <div onClick={() => navigate(-1)} className='btn gradient-btn' >
                                Back
                            </div>
                            <div className="mb-4">
                                <h4 className="text-lg font-semibold">View post information</h4>
                                <br></br>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-medium">Post Name</label>
                                            <input
                                                disabled
                                                value={inputValues.name}
                                                name="name"
                                                type="text"
                                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-medium">Address</label>
                                            <input
                                                disabled
                                                value={inputValues.addressCode}
                                                name="name"
                                                type="text"
                                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-medium">Number of employees</label>
                                            <input
                                                disabled
                                                value={inputValues.amount}
                                                name="amount"
                                                type="number"
                                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-medium">Gender</label>

                                            <select disabled style={{color: "black"}} className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                    value={inputValues.genderCode} name="genderCode"
                                                    onChange={(event) => handleOnChange(event)}>
                                                {dataGenderPost && dataGenderPost.length > 0 &&
                                                    dataGenderPost.map((item, index) => {
                                                        return (
                                                            <option key={index}
                                                                    value={item.code}>{item.value}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block font-medium">Experience</label>

                                            <select disabled style={{color: "black"}}                                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"

                                                    value={inputValues.experienceJobCode}
                                                    name="experienceJobCode"
                                                    onChange={(event) => handleOnChange(event)}>
                                                {dataExpType && dataExpType.length > 0 &&
                                                    dataExpType.map((item, index) => {
                                                        return (
                                                            <option key={index}
                                                                    value={item.code}>{item.value}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block font-medium">Sector</label>

                                            <select disabled style={{color: "black"}}                                                 className="mt-1 block w-full border border-gray-300 rounded-md p-2"

                                                    value={inputValues.categoryJobCode} name="categoryJobCode"
                                                    onChange={(event) => handleOnChange(event)}>
                                                {dataJobType && dataJobType.length > 0 &&
                                                    dataJobType.map((item, index) => {
                                                        return (
                                                            <option key={index}
                                                                    value={item.code}>{item.value}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block font-medium">Position</label>

                                            <select disabled style={{color: "black"}}                                                 className="mt-1 block w-full border border-gray-300 rounded-md p-2"

                                                    value={inputValues.categoryJoblevelCode}
                                                    name="categoryJoblevelCode"
                                                    onChange={(event) => handleOnChange(event)}>
                                                {dataJobLevel && dataJobLevel.length > 0 &&
                                                    dataJobLevel.map((item, index) => {
                                                        return (
                                                            <option key={index}
                                                                    value={item.code}>{item.value}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>





                                        <div>
                                            <label className="block font-medium">Salary</label>

                                            <select disabled style={{color: "black"}}                                                 className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                    value={inputValues.salaryJobCode} name="salaryJobCode"
                                                    onChange={(event) => handleOnChange(event)}>
                                                {dataSalaryType && dataSalaryType.length > 0 &&
                                                    dataSalaryType.map((item, index) => {
                                                        return (
                                                            <option key={index}
                                                                    value={item.code}>{item.value}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block font-medium">Working form</label>

                                            <select disabled style={{color: "black"}}                                                 className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                    value={inputValues.categoryWorktypeCode}
                                                    name="categoryWorktypeCode"
                                                    onChange={(event) => handleOnChange(event)}>
                                                {dataWorkType && dataWorkType.length > 0 &&
                                                    dataWorkType.map((item, index) => {
                                                        return (
                                                            <option key={index}
                                                                    value={item.code}>{item.value}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>


                                        <div className="col-md-12">
                                            <label className="form-label">Job Description</label>
                                            <div className="form-group">

                                                <MdEditor
                                                    style={{height: '500px'}}
                                                    renderHTML={text => mdParser.render(text)}
                                                    onChange={handleEditorChange}
                                                    value={inputValues.descriptionMarkdown}
                                                />
                                            </div>
                                        </div>

                                    </div>


                                </form>
                            </div>
                        </div>
                </div>
            </div>
            {isLoading &&
                <Modal isOpen='true' centered contentClassName='closeBorder'>

                    <div style={{
                        position: 'absolute', right: '50%',
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Spinner animation="border"></Spinner>
                    </div>

                </Modal>
            }

        </>
    )
}

export default ViewPost
