import React from 'react'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DatePicker from '../../../components/input/DatePicker';
import { createPostService, updatePostService, getDetailPostByIdService, reupPostService, getDetailCompanyByUserId } from '../../../service/userService';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useFetchAllcode } from '../../../util/fetch';
import {  useParams } from "react-router-dom";
import { Spinner, Modal } from 'reactstrap'
import localization from 'moment/locale/vi';
import CommonUtils from "../../../util/CommonUtils";
import moment from 'moment';
import '../../../components/modal/modal.css'
import ReupPostModal from '../../../components/modal/ReupPostModal';
const AddPost = () => {
    const today = new Date();
    const mdParser = new MarkdownIt();
    const [user, setUser] = useState({})
    const [timeEnd, settimeEnd] = useState('');
    const [isChangeDate, setisChangeDate] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams();
    const [companyPostAllow, setCompanyPostAllow] = useState({
        hot: 0,
        nonHot: 0
    })
    const [inputValues, setInputValues] = useState({
        name: '', categoryJobCode: '', addressCode: '', salaryJobCode: '', amount: '', timeEnd: '', categoryJoblevelCode: '', categoryWorktypeCode: '', experienceJobCode: '',
        genderCode: '', descriptionHTML: '', descriptionMarkdown: '', isActionADD: true, id: '', isHot: 0
    });
    const [propsModal, setPropsModal] = useState({
        isActive: false,
        handlePost: () => { },
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


    const { data: dataGenderPost } = useFetchAllcode('GENDERPOST');
    const { data: dataJobType } = useFetchAllcode('JOBTYPE');
    const { data: dataJobLevel } = useFetchAllcode('JOBLEVEL');
    const { data: dataSalaryType } = useFetchAllcode('SALARYTYPE');
    const { data: dataExpType } = useFetchAllcode('EXPTYPE');
    const { data: dataWorkType } = useFetchAllcode('WORKTYPE');
    const { data: dataProvince } = useFetchAllcode('PROVINCE');

    if (dataGenderPost && dataGenderPost.length > 0 && inputValues.genderCode === '' && dataJobType && dataJobType.length > 0 && inputValues.categoryJobCode === '' && dataJobLevel && dataJobLevel.length > 0 && inputValues.categoryJoblevelCode === '' &&
        dataSalaryType && dataSalaryType.length > 0 && inputValues.salaryJobCode === '' && dataExpType && dataExpType.length > 0 && inputValues.experienceJobCode === '' &&
        dataWorkType && dataWorkType.length > 0 && inputValues.categoryWorktypeCode === '' && dataProvince && dataProvince.length > 0 && inputValues.addressCode === ''
    ) {

        setInputValues({
            ...inputValues, ["genderCode"]: dataGenderPost[0].code, ["categoryJobCode"]: dataJobType[0].code,
            ["categoryJoblevelCode"]: dataJobLevel[0].code, ["salaryJobCode"]: dataSalaryType[0].code, ["experienceJobCode"]: dataExpType[0].code,
            ["categoryWorktypeCode"]: dataWorkType[0].code, ["addressCode"]: dataProvince[0].code
        })
    }
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleIsHot = (e) => {
        setInputValues({
            ...inputValues,
            isHot: e.target.checked ? 1 : 0
        })
    }
    let handleEditorChange = ({ html, text }) => {
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
    let handleSavePost = async () => {
        setIsLoading(true)
        if (inputValues.isActionADD === true) {

            if (new Date().getTime() > new Date(timeEnd).getTime()) {
                toast.error("End date must be greater than current date")
            }
            else {
                let res = await createPostService({
                    name: inputValues.name,
                    descriptionHTML: inputValues.descriptionHTML,
                    descriptionMarkdown: inputValues.descriptionMarkdown,
                    categoryJobCode: inputValues.categoryJobCode,
                    addressCode: inputValues.addressCode,
                    salaryJobCode: inputValues.salaryJobCode,
                    amount: inputValues.amount,
                    timeEnd: new Date(timeEnd).getTime(),
                    categoryJoblevelCode: inputValues.categoryJoblevelCode,
                    categoryWorktypeCode: inputValues.categoryWorktypeCode,
                    experienceJobCode: inputValues.experienceJobCode,
                    genderPostCode: inputValues.genderCode,
                    userId: user.id,
                    isHot: inputValues.isHot
                })
                setTimeout(() => {
                    setIsLoading(false)
                    if (res && res.errCode === 0) {
                        fetchCompany(user.id)
                        toast.success(res.errMessage)
                        setInputValues({
                            ...inputValues,
                            ["name"]: '',
                            ["descriptionHTML"]: '',
                            ["descriptionMarkdown"]: '',
                            ["categoryJobCode"]: '',
                            ["addressCode"]: '',
                            ["salaryJobCode"]: '',
                            ["amount"]: '',
                            ["timeEnd"]: '',
                            ["categoryJoblevelCode"]: '',
                            ["categoryWorktypeCode"]: '',
                            ["experienceJobCode"]: '',
                            ["genderCode"]: '',
                            ["isHot"]: 0
                        })
                        settimeEnd('')
                    } else {
                        toast.error(res.errMessage)
                    }
                }, 1000);
            }
        } else {
            let res = await updatePostService({
                name: inputValues.name,
                descriptionHTML: inputValues.descriptionHTML,
                descriptionMarkdown: inputValues.descriptionMarkdown,
                categoryJobCode: inputValues.categoryJobCode,
                addressCode: inputValues.addressCode,
                salaryJobCode: inputValues.salaryJobCode,
                amount: inputValues.amount,
                timeEnd: isChangeDate === false ? inputValues.timeEnd : new Date(timeEnd).getTime(),
                categoryJoblevelCode: inputValues.categoryJoblevelCode,
                categoryWorktypeCode: inputValues.categoryWorktypeCode,
                experienceJobCode: inputValues.experienceJobCode,
                genderPostCode: inputValues.genderCode,
                id: inputValues.id,
                userId: user.id
            })
            setTimeout(() => {
                setIsLoading(false)
                if (res && res.errCode === 0) {
                    toast.success(res.errMessage)

                } else {
                    toast.error(res.errMessage)
                }
            }, 1000);
        }
    }
    let handleReupPost = async (timeEnd) => {
        let res = await reupPostService({
            userId: user.id,
            postId: id,
            timeEnd: timeEnd
        })
        if (res && res.errCode === 0) {
            toast.success(res.errMessage)

        } else {
            toast.error(res.errMessage)
        }
    }
    const isExpired = timeEnd ? moment(timeEnd, 'DD/MM/YYYY').isBefore(moment()) : false;
    return (
        <>
            <div className="">
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <div className="mb-4">
                            <h4 className="text-lg font-semibold">{inputValues.isActionADD === true ? 'Add new post' :(user?.roleCode === 'ADMIN' ? 'View post information' : 'Update post')}</h4>
                            <br></br>
                            {inputValues.isActionADD === true && user.roleCode !== "ADMIN" &&
                                <div className='mb-5'>
                                    <div className="p-4 bg-white rounded-lg shadow-md">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-2">The company has:</h4>
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-gray-600">
                                                <span className="font-medium text-blue-600">{companyPostAllow.nonHot}</span> Normal Post
                                            </p>
                                            <p className="text-gray-600">
                                                <span className="font-medium text-red-600">{companyPostAllow.hot}</span> Featured Post
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            }
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>

                                        <label className="col-sm-3 col-form-label">Post Name</label>

                                                <input disabled={user?.roleCode === "ADMIN" ? true : false} value={inputValues.name} name="name" onChange={(event) => handleOnChange(event)} type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2"  />


                                    </div>
                                    <div>


                                            <label className="col-sm-3 col-form-label">Address</label>

                                                <select disabled={user?.roleCode === "ADMIN" ? true : false} style={{ color: "black" }}  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300" value={inputValues.addressCode} name="addressCode" onChange={(event) => handleOnChange(event)}>
                                                    {dataProvince && dataProvince.length > 0 &&
                                                        dataProvince.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.code}>{item.value}</option>
                                                            )
                                                        })
                                                    }
                                                </select>


                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>

                                            <label className="col-sm-3 col-form-label">Number of employees recruited</label>

                                                <input disabled={user?.roleCode === "ADMIN" ? true : false} value={inputValues.amount} name="amount" onChange={(event) => handleOnChange(event)} type="number" className="mt-1 block w-full border border-gray-300 rounded-md p-2"  />

                                    </div>
                                    <div >
                                            <label className="col-sm-3 col-form-label">End time</label>
                                                <DatePicker disabled={!inputValues.isActionADD} dis className="mt-1 block w-full border border-gray-300 rounded-md p-2"  onChange={handleOnChangeDatePicker}
                                                    value={timeEnd}
                                                />

                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>

                                            <label className="col-sm-3 col-form-label">Gender</label>
                                                <select disabled={user?.roleCode === "ADMIN" ? true : false} style={{ color: "black" }} className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={inputValues.genderCode} name="genderCode" onChange={(event) => handleOnChange(event)}>
                                                    {dataGenderPost && dataGenderPost.length > 0 &&
                                                        dataGenderPost.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.code}>{item.value}</option>
                                                            )
                                                        })
                                                    }
                                                </select>

                                    </div>
                                    <div >

                                            <label className="col-sm-3 col-form-label">Experience</label>
                                                <select disabled={user?.roleCode === "ADMIN" ? true : false} style={{ color: "black" }} className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={inputValues.experienceJobCode} name="experienceJobCode" onChange={(event) => handleOnChange(event)}>
                                                    {dataExpType && dataExpType.length > 0 &&
                                                        dataExpType.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.code}>{item.value}</option>
                                                            )
                                                        })
                                                    }
                                                </select>

                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                            <label className="col-sm-3 col-form-label">Sector</label>
                                                <select disabled={user?.roleCode === "ADMIN" ? true : false} style={{ color: "black" }} className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={inputValues.categoryJobCode} name="categoryJobCode" onChange={(event) => handleOnChange(event)}>
                                                    {dataJobType && dataJobType.length > 0 &&
                                                        dataJobType.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.code}>{item.value}</option>
                                                            )
                                                        })
                                                    }
                                                </select>

                                    </div>
                                    <div >
                                            <label className="col-sm-3 col-form-label">Position</label>
                                                <select disabled={user?.roleCode === "ADMIN" ? true : false} style={{ color: "black" }} className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={inputValues.categoryJoblevelCode} name="categoryJoblevelCode" onChange={(event) => handleOnChange(event)}>
                                                    {dataJobLevel && dataJobLevel.length > 0 &&
                                                        dataJobLevel.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.code}>{item.value}</option>
                                                            )
                                                        })
                                                    }
                                                </select>

                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                            <label className="col-sm-3 col-form-label">Salary</label>
                                                <select disabled={user?.roleCode === "ADMIN" ? true : false} style={{ color: "black" }} className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={inputValues.salaryJobCode} name="salaryJobCode" onChange={(event) => handleOnChange(event)}>
                                                    {dataSalaryType && dataSalaryType.length > 0 &&
                                                        dataSalaryType.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.code}>{item.value}</option>
                                                            )
                                                        })
                                                    }
                                                </select>

                                    </div>
                                    <div>
                                            <label className="col-sm-3 col-form-label">Working form</label>
                                                <select disabled={user?.roleCode === "ADMIN" ? true : false} style={{ color: "black" }} className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={inputValues.categoryWorktypeCode} name="categoryWorktypeCode" onChange={(event) => handleOnChange(event)}>
                                                    {dataWorkType && dataWorkType.length > 0 &&
                                                        dataWorkType.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.code}>{item.value}</option>
                                                            )
                                                        })
                                                    }
                                                </select>

                                    </div>
                                </div>
                                {inputValues.isActionADD && (<>
                                    <div className='row'>
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Featured post</label>
                                                <div className="col-sm-9">
                                                    <input disabled={user?.roleCode === "ADMIN" ? true : false} onChange={handleIsHot} checked={inputValues.isHot} style={{ marginTop: '20px' }} type={'checkbox'}></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>)}
                                <div className="row">
                                    <div className="col-md-12">
                                        <label className="form-label">Job Description</label>
                                        <div className="form-group">

                                            <MdEditor
                                                style={{ height: '500px' }}
                                                renderHTML={text => mdParser.render(text)}
                                                onChange={handleEditorChange}
                                                value={inputValues.descriptionMarkdown}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '10%' }}>

                                {
                                        user.roleCode !== "ADMIN" &&
                                        <>

                                            <button
                                                type="button"
                                                onClick={() => handleSavePost()}
                                                className='btn gradient-btn'
                                            >
                                                <i className="ti-file"></i> Save
                                            </button>
                                        </>
                                }

                                {
                                    id && user.roleCode !== "ADMIN" && isExpired &&
                                    <>

                                        <button onClick={() => setPropsModal({
                                            ...propsModal,
                                            isActive: true,
                                            handlePost: handleReupPost
                                        })} type="button" className='btn gradient-btn'>
                                            <i className="ti-reload btn1-icon-prepend"></i>
                                            Reup
                                        </button>
                                    </>
                                }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading &&
                <Modal isOpen='true' centered contentClassName='closeBorder' >

                    <div style={{
                        position: 'absolute', right: '50%',
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Spinner animation="border"  ></Spinner>
                    </div>

                </Modal>
            }
            <ReupPostModal isOpen={propsModal.isActive} onHide={() => setPropsModal({
                ...propsModal,
                isActive: false,
            })} id={propsModal.postId} handleFunc={propsModal.handlePost} />

        </>
    )
}

export default AddPost
