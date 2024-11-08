import React from 'react'
import { useEffect, useState } from 'react';
import { getDetailUserById, UpdateUserSettingService, getAllSkillByJobCode } from '../../service/userService';
import { useFetchAllcode } from '../../util/fetch';
import { toast } from 'react-toastify';
import 'react-image-lightbox/style.css';
import CommonUtils from '../../util/CommonUtils';
import { Select } from 'antd'
const SettingUser = () => {
    const [listSkills,setListSkills] = useState([])
    const [inputValues, setInputValues] = useState({
        jobType: '', salary: '', skills: [], jobProvince: '', exp: '', isFindJob: 0, isTakeMail: 0, file: ''
    });
    let handleOnChangeFile = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            if (file.size > 2097152) {
                toast.error("Your file is too large. Only send files under 2MB.")
                return
            }
            let base64 = await CommonUtils.getBase64(file);

            setInputValues({ ...inputValues, file: base64 })
        }
    }

    const handleChange = async(value,detail) => {
        if (Array.isArray(detail)) {
            setInputValues({
                ...inputValues,
                skills: value
            })
        }
        else {
            if (detail.type === 'jobType') {
                let res = await getAllSkillByJobCode(value)
                let listSkills =  res.data.map(item=>({
                    value: item.id,
                    label: item.name
                }))
                setListSkills(listSkills)
                setInputValues({
                    ...inputValues,
                    [detail.type]: value,
                    skills: []
                })
            }
            else {
                setInputValues({
                    ...inputValues,
                    [detail.type]: value,
                })
            }
        }
    };
    let getListSkill = async(jobType) => {
        let res = await getAllSkillByJobCode(jobType)
        let listSkills =  res.data.map(item=>({
            value: item.id,
            label: item.name
        }))
        setListSkills(listSkills)
    }

    let setStateUser = (data) => {
        getListSkill(data.userAccountData.userSettingData.categoryJobCode)
        let listSkills = []
        if (Array.isArray(data.listSkills) && data.listSkills.length > 0) {
            listSkills = data.listSkills.map(item=>item.SkillId)
        }
        setInputValues({
            ...inputValues,
            jobType: data.userAccountData.userSettingData.categoryJobCode ?? '',
            salary: data.userAccountData.userSettingData.salaryJobCode ?? '',
            skills: listSkills,
            jobProvince: data.userAccountData.userSettingData.addressCode ?? '',
            exp: data.userAccountData.userSettingData.experienceJobCode ?? '',
            isFindJob: data.userAccountData.userSettingData.isFindJob ?? 0,
            isTakeMail: data.userAccountData.userSettingData.isTakeMail ?? 0,
            file: data.userAccountData.userSettingData.file ?? ''
        })
    }
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            let fetchUser = async () => {
                let user = await getDetailUserById(userData.id)
                if (user && user.errCode === 0) {
                    setStateUser(user.data)
                }
            }
            fetchUser()
        }
    }, [])

    let { data: dataProvince } = useFetchAllcode('PROVINCE');
    let { data: dataExp } = useFetchAllcode('EXPTYPE')
    let { data: dataSalary} = useFetchAllcode('SALARYTYPE')
    let { data: dataJobType} = useFetchAllcode('JOBTYPE')


    dataProvince = dataProvince.map(item=>({
        value: item.code,
        label: item.value,
        type: 'jobProvince'
    }))

    dataExp = dataExp.map(item=>({
        value: item.code,
        label: item.value,
        type: 'exp'
    }))

    dataSalary = dataSalary.map(item=>({
        value: item.code,
        label: item.value,
        type: 'salary'
    }))

    dataJobType = dataJobType.map(item=>({
        value: item.code,
        label: item.value,
        type: 'jobType'
    }))

    let handleOnChangeCheckBox = (e) => {
        const {name,checked} = e.target
        if (name === 'isFindJob' && !inputValues.file) {
            toast.error('You need to upload your CV before selecting this feature')
        } else if (name === 'isTakeMail' && !inputValues.jobType && !inputValues.jobProvince) {
            toast.error('You need to select your field and work area before selecting this feature.')
        }
        else {
            setInputValues({
                ...inputValues,
                [name]: checked ? 1 : 0
            })
        }
    }

    let handleSaveUser = async () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        let settingData = {
            categoryJobCode : inputValues.jobType,
            addressCode : inputValues.jobProvince,
            experienceJobCode : inputValues.exp,
            isTakeMail : inputValues.isTakeMail,
            isFindJob: inputValues.isFindJob,
            file : inputValues.file,
            salaryJobCode: inputValues.salary,
            listSkills: inputValues.skills
        }
        let res = await UpdateUserSettingService({
            id: userData.id,
            data: settingData
        })
        if (res && res.errCode === 0) {
            toast.success("User update successful")
            window.location.reload()
        } else {
            toast.error(res.errMessage)
        }
    }
    let handleSearchMulti = (input,option) => {
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    return (
        <div className="">
            <div className="grid grid-cols-1 gap-4">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold">Advanced information settings</h4>
                        <br></br>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium">Sector</label>

                                        <Select

                                                style={{
                                                    width: '100%',
                                                }}

                                                placeholder="Select sector"
                                                onChange={handleChange}
                                                options={dataJobType}
                                                value={inputValues.jobType}
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                showSearch
                                            >
                                            </Select>

                                </div>
                                <div >

                                        <label className="col-sm-3 col-form-label">Salary</label>

                                        <Select
                                
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder="Select salary"
                                                onChange={handleChange}
                                                options={dataSalary}
                                                value={inputValues.salary}
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                showSearch
                                            >
                                            </Select>

                                </div>

                                    <div >
                                        <label className="col-sm-3 col-form-label">Skills</label>

                                            <Select
                                                disabled={!inputValues.jobType}
                                                mode="multiple"

                                                style={{
                                                    width: 'calc(100% )',
                                                }}
                                                placeholder="Choose your skill"
                                                onChange={handleChange}
                                                options={listSkills}
                                                value={inputValues.skills}
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                showSearch
                                            >
                                            </Select>


                                </div>
                                 <div >

                                        <label className="col-sm-3 col-form-label">Work area</label>

                                            <Select

                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder="Choose a place to work"
                                                onChange={handleChange}
                                                options={dataProvince}
                                                value={inputValues.jobProvince}
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                showSearch
                                            >
                                            </Select>
                                </div>

                                    <div >
                                        <label className="col-sm-3 col-form-label">Work experience</label>

                                        <Select
                                
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder="Select experience range"
                                                onChange={handleChange}
                                                options={dataExp}
                                                value={inputValues.exp}
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                showSearch
                                            >
                                            </Select>

                                    </div>
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-md shadow-md">
                                    <label className="text-sm font-medium text-gray-700 w-1/3">Turn on job search</label>
                                    <input
                                        name="isFindJob"
                                        onChange={handleOnChangeCheckBox}
                                        checked={inputValues.isFindJob}
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 focus:ring-2 focus:ring-offset-2"
                                    />


                                    <label className="text-sm font-medium text-gray-700 w-1/3">Receive work mail</label>

                                    <input
                                        name="isTakeMail"
                                        onChange={handleOnChangeCheckBox}
                                        checked={inputValues.isTakeMail}
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 focus:ring-2 focus:ring-offset-2"
                                    />
                            </div>
                            <div >

                                        <label className="col-sm-3 col-form-label">Your CV</label>

                                        <input  onChange={(event) => handleOnChangeFile(event)} accept='.pdf' type="file" className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
                            </div>
                                <div >
                            {
                                inputValues.file &&
                                <div className="col-md-12">
                                    <div className="form-group row">
                                        
                                        <iframe width={'100%'} height={'700px'} src={inputValues.file}></iframe>
                                    </div>
                                </div>
                            }

                            </div>
                            </div>
                            <button type="button" onClick={() => handleSaveUser()}  className='btn gradient-btn'>
                                <i class="ti-file btn1-icon-prepend"></i>
                                Save
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingUser
