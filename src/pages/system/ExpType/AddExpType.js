import React from 'react'
import { useEffect, useState } from 'react';
import { createAllCodeService, getDetailAllcodeByCode, UpdateAllcodeService } from '../../../service/userService';
import { toast } from 'react-toastify';
import {useNavigate, useParams} from "react-router-dom";
import { Spinner, Modal } from 'reactstrap'
import '../../../components/modal/modal.css'
import CommonUtils from '../../../util/CommonUtils';

const AddExpType = () => {


    const [isActionADD, setisActionADD] = useState(true)
    const [isLoading, setIsLoading] = useState(false)


    const { id } = useParams();

    const [inputValues, setInputValues] = useState({
        value: '', code: ''
    });

    useEffect(() => {

        if (id) {
            let fetchDetailExpType = async () => {
                setisActionADD(false)
                let allcode = await getDetailAllcodeByCode(id)
                if (allcode && allcode.errCode === 0) {
                    setInputValues({ ...inputValues, ["value"]: allcode.data.value, ["code"]: allcode.data.code })
                }
            }
            fetchDetailExpType()
        }
    }, [])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setInputValues({
                ...inputValues,
                value: CommonUtils.removeSpace(inputValues.value)
            })
        }, 50)
    
        return () => clearTimeout(delayDebounceFn)
      }, [inputValues.value])

    const handleOnChange = event => {
        const { name, value } = event.target;
        if (name === 'value') {
            setInputValues({
                ...inputValues,
                value: value,
                code: isActionADD ? CommonUtils.replaceCode(value) : inputValues.code
            })
        }
        else {
            setInputValues({ ...inputValues, [name]: value });
        }

    };

    let handleSaveExpType = async () => {
        setIsLoading(true)
        if (isActionADD === true) {
            let res = await createAllCodeService({
                value: inputValues.value,
                code: inputValues.code,
                type: 'EXPTYPE',

            })
            setTimeout(() => {
                setIsLoading(false)
                if (res && res.errCode === 0) {
                    toast.success("Add success experience")
                    setInputValues({
                        ...inputValues,
                        ["value"]: '',
                        ["code"]: '',
                    })
                }
                else if (res && res.errCode === 2) {
                    toast.error(res.errMessage)
                }
                else toast.error("Add fail experience")
            }, 50);
        } else {
            let res = await UpdateAllcodeService({
                value: inputValues.value,
                code: id,
            })
            setTimeout(() => {
                setIsLoading(false)
                if (res && res.errCode === 0) {
                    toast.success("Update successful experience")

                }
                else if (res && res.errCode === 2) {
                    toast.error(res.errMessage)
                }
                else toast.error("Update fail experience")
            }, 50);
        }
    }
    const navigate = useNavigate();
    return (
        <div className="col-12 grid-margin">
            <div className="w-full">
                <div className="bg-white p-6 rounded-lg shadow-lg">

                        <div onClick={() => navigate(-1)} className='btn gradient-btn' >
                            Back
                        </div>
                        <h4 className="card-title">{isActionADD === true ? 'Add new work experience range' : 'Update work experience range'}</h4>
                        <br></br>
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="col-sm-3 col-form-label">Work experience range</label>

                                            <input type="text" value={inputValues.value} name="value" onChange={(event) => handleOnChange(event)}                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"/>



                            </div>

                            <div className="space-y-2">
                                <label className="col-sm-3 col-form-label">Code</label>

                                            <input disabled={true} type="text" value={inputValues.code} name="code" onChange={(event) => handleOnChange(event)}                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"/>




                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => handleSaveExpType()}
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

export default AddExpType
