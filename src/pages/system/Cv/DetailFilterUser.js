import React from 'react'
import { useEffect, useState } from 'react';
import { getDetailUserById, UpdateUserSettingService, getAllSkillByJobCode } from '../../../service/userService';
import { checkSeeCandiate } from '../../../service/cvService';

import { useFetchAllcode } from '../../../util/fetch';
import { toast } from 'react-toastify';
import 'react-image-lightbox/style.css';
import { Select } from 'antd'
import {useNavigate, useParams} from "react-router-dom";

const DetailFilterUser = () => {
    const [listSkills,setListSkills] = useState([])
    const [inputValues, setInputValues] = useState({
        jobType: '', salary: '', skills: [], jobProvince: '', exp: '', file: ''
    });
    const { id } = useParams();
    let getListSkill = async(jobType) => {
        let res = await getAllSkillByJobCode(jobType)
        let listSkills =  res.data.map(item=>({
            value: item.id,
            label: item.name
        }))
        setListSkills(listSkills)
    }
    const navigate = useNavigate();

    let setStateUser = (data) => {
        getListSkill(data.userAccountData.userSettingData.categoryJobCode)
        let listSkills = []
        if (Array.isArray(data.listSkills) && data.listSkills.length > 0) {
            listSkills = data.listSkills.map(item=>item.SkillId)
        }
        setInputValues({
            ...inputValues,
            jobType: data.userAccountData.userSettingData.categoryJobCode,
            salary: data.userAccountData.userSettingData.salaryJobCode,
            skills: listSkills,
            jobProvince: data.userAccountData.userSettingData.addressCode,
            exp: data.userAccountData.userSettingData.experienceJobCode,
            isFindJob: data.userAccountData.userSettingData.isFindJob,
            isTakeMail: data.userAccountData.userSettingData.isTakeMail,
            file: data.userAccountData.userSettingData.file
        })
    }
    useEffect(() => {
        if (id) {
            let fetchUser = async () => {
                let userData = JSON.parse(localStorage.getItem("userData"))
                let check = await checkSeeCandiate({
                    userId: userData.id,
                    companyId: userData.companyId
                })
                if (check.errCode ===0 ) {
                    let user = await getDetailUserById(id)
                    if (user && user.errCode === 0) {
                        setStateUser(user.data)
                    }
                } else {
                    toast.error(check.errMessage)
                    setTimeout(()=> {
                        navigate('/admin/list-candidate/');
                    },1000)
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
    }))

    dataExp = dataExp.map(item=>({
        value: item.code,
        label: item.value,
    }))

    dataSalary = dataSalary.map(item=>({
        value: item.code,
        label: item.value,
    }))

    dataJobType = dataJobType.map(item=>({
        value: item.code,
        label: item.value,
    }))
    return (
        <div className="">
            <div className="grid grid-cols-1 gap-4">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="mb-4">

                        <div onClick={() => navigate(-1)} className='btn gradient-btn' >
                            Back
                        </div>
                        <h4 className="text-lg font-semibold">Candidate details</h4>
                        <br></br>
                        <form className="space-y-4">

                                <div>
                                    <label className="block font-medium">Sector</label>

                                        <Select

                                                allowClear
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder="Select sector"
                                                disabled
                                                options={dataJobType}
                                                value={inputValues.jobType}
                                            >
                                            </Select>

                                </div>
                                <div>
                                    <label className="block font-medium">Salary</label>

                                        <Select
                                                allowClear
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder="Select salary"
                                                disabled
                                                options={dataSalary}
                                                value={inputValues.salary}
                                            >
                                            </Select>

                                </div>

                                <div>
                                    <label className="block font-medium">Skills</label>
                                        <div className="col-sm-9 mt-3" >
                                            <Select
                                                disabled
                                                mode="multiple"
                                                allowClear
                                                style={{
                                                    width: 'calc(100% )',
                                                }}
                                                placeholder="Choose your skill"
                                                options={listSkills}
                                                value={inputValues.skills}
                                                
                                            >
                                            </Select>
                                        </div>

                                </div>

                                <div>
                                    <label className="block font-medium">Work area</label>

                                            <Select
                                                allowClear
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder="Choose a place to work"
                                                disabled
                                                options={dataProvince}
                                                value={inputValues.jobProvince}
                                            >
                                            </Select>

                                </div>
                                <div>
                                    <label className="block font-medium">Work experience</label>

                                        <Select
                                                allowClear
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder="Select experience range"
                                                disabled
                                                options={dataExp}
                                                value={inputValues.exp}
                                            >
                                            </Select>


                                </div>

                            {
                                inputValues.file &&
                                <div className="col-md-12">
                                    <div className="form-group row">
                                        
                                        <iframe width={'100%'} height={'700px'} src={inputValues.file}></iframe>
                                    </div>
                                </div>
                            }

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailFilterUser
