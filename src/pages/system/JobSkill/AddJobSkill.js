import React from 'react'
import { useEffect, useState } from 'react';
import { createSkilleService, getDetailSkillById, UpdateSkillService } from '../../../service/userService';
import { useFetchAllcode } from '../../../util/fetch';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import CommonUtils from '../../../util/CommonUtils';
import { Spinner, Modal } from 'reactstrap'
import '../../../components/modal/modal.css'
import { Col, Row, Select } from 'antd';
const AddJobSkill = () => {
    const [isActionADD, setisActionADD] = useState(true)

    const [isLoading, setIsLoading] = useState(false)

    const { code } = useParams();

    const [inputValues, setInputValues] = useState({
        name: '', categoryJobCode: '', id: ''
    });
    const navigate = useNavigate();

    let fetchDetailJobType = async (code) => {
        setisActionADD(false)
        let skill = await getDetailSkillById(code)
        if (skill && skill.errCode === 0) {
            setInputValues({ ...inputValues, ["name"]: skill.data.name, ["id"]: skill.data.id, ["categoryJobCode"]: skill.data.categoryJobCode  })
        }
    }

    let { data: listCategoryJobCode } = useFetchAllcode('JOBTYPE');
    listCategoryJobCode = listCategoryJobCode.map(item=> ({
        value: item.code,
        label: item.value
    }))

    useEffect(() => {

        if (code) {
            fetchDetailJobType(code)
        }
    }, [])

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    let handleOnChangeCategoryJobCode = async(value) => {
        setInputValues({
            ...inputValues,
            categoryJobCode: value
        })
    }

    let handleSaveJobSkill = async () => {
        setIsLoading(true)
        if (isActionADD === true) {
            let res = await createSkilleService({
                name: inputValues.name,
                categoryJobCode: inputValues.categoryJobCode
            })
            setTimeout(() => {
                setIsLoading(false)
                if (res && res.errCode === 0) {
                    toast.success("Add success skills")
                    setInputValues({
                        ...inputValues,
                        ["name"]: '',
                        ["categoryJobCode"]: '',
                    })
                }
                else if (res && res.errCode === 2) {
                    toast.error(res.errMessage)
                }
                else toast.error("Add skill failed")
            }, 50);
        } else {
            let res = await UpdateSkillService({
                name: inputValues.name,
                id: code,
                categoryJobCode: inputValues.categoryJobCode
            })
            setTimeout(() => {
                setIsLoading(false)
                if (res && res.errCode === 0) {
                    toast.success("Job type update successful")

                }
                else if (res && res.errCode === 2) {
                    toast.error(res.errMessage)
                }
                else toast.error("Update failed job type")
            }, 50);
        }
    }
    return (
        <div className="col-12 grid-margin">
            <div className="w-full">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div onClick={() => navigate(-1)} className='btn gradient-btn' >
                            Back
                        </div>
                        <h4 className="card-title">{isActionADD === true ? 'Add new job skill' : 'Update job skill'}</h4>
                        <br></br>
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block font-medium">Skill name</label>

                                    <input type="text" value={inputValues.name} name="name" onChange={(event) => handleOnChange(event)}
                                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"/>


                            </div>
                            <div className="space-y-2">
                                <label className="block font-medium">Job tZype</label>
                                <Select
                                         onChange={(value)=> handleOnChangeCategoryJobCode(value)}
                                         value={inputValues.categoryJobCode}
                                         name="categoryJobCode"
                                            options={listCategoryJobCode ? listCategoryJobCode : []}
                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300" >
                                </Select>
                            </div>

                        </div>

                        <button
                            type="button"
                            onClick={() => handleSaveJobSkill()}
                            className='btn gradient-btn'
                        >
                            <i className="ti-file"></i> Save
                        </button>

                        </form>

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
        </div>
    )
}

export default AddJobSkill
