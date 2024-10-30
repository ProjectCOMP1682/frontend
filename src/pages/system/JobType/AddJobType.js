import React from 'react'
import {useEffect, useState} from 'react';
import {createAllCodeService, getDetailAllcodeByCode, UpdateAllcodeService} from '../../../service/userService';
import {useFetchAllcode} from '../../../util/fetch';
import DatePicker from '../../../components/input/DatePicker';
import {toast} from 'react-toastify';
import {useNavigate, useParams} from "react-router-dom";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import CommonUtils from '../../../util/CommonUtils';
import {Spinner, Modal} from 'reactstrap'
import '../../../components/modal/modal.css'

const AddJobType = () => {


    const [isActionADD, setisActionADD] = useState(true)

    const [isLoading, setIsLoading] = useState(false)

    const {code} = useParams();

    const [inputValues, setInputValues] = useState({
        value: '', code: '', image: '', imageReview: '', isOpen: false,
    });

    useEffect(() => {

        if (code) {
            let fetchDetailJobType = async () => {
                setisActionADD(false)
                let allcode = await getDetailAllcodeByCode(code)
                if (allcode && allcode.errCode === 0) {
                    setInputValues({
                        ...inputValues,
                        ["value"]: allcode.data.value,
                        ["code"]: allcode.data.code,
                        ["image"]: allcode.data.image,
                        ["imageReview"]: allcode.data.image
                    })
                }
            }
            fetchDetailJobType()
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
        const {name, value} = event.target;
        if (name === 'value') {
            setInputValues({
                ...inputValues,
                value: value,
                code: isActionADD ? CommonUtils.replaceCode(value) : inputValues.code
            })
        } else {
            setInputValues({...inputValues, [name]: value});
        }

    };
    let handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file)

            setInputValues({...inputValues, ["image"]: base64, ["imageReview"]: objectUrl})

        }
    }
    let openPreviewImage = () => {
        if (!inputValues.imageReview) return;

        setInputValues({...inputValues, ["isOpen"]: true})
    }
    let handleSaveJobType = async () => {
        setIsLoading(true)
        if (isActionADD === true) {
            let res = await createAllCodeService({
                value: inputValues.value,
                code: inputValues.code,
                type: 'JOBTYPE',
                image: inputValues.image
            })
            setTimeout(() => {
                setIsLoading(false)
                if (res && res.errCode === 0) {
                    toast.success("Add job type successfully")
                    setInputValues({
                        ...inputValues,
                        ["value"]: '',
                        ["code"]: '',
                        ["image"]: '',
                        ["imageReview"]: ''
                    })
                } else if (res && res.errCode === 2) {
                    toast.error(res.errMessage)
                } else toast.error("Add failed job type")
            }, 50);
        } else {
            let res = await UpdateAllcodeService({
                value: inputValues.value,
                code: code,
                image: inputValues.image
            })
            setTimeout(() => {
                setIsLoading(false)
                if (res && res.errCode === 0) {
                    toast.success("Update job type successfully")

                } else if (res && res.errCode === 2) {
                    toast.error(res.errMessage)
                } else toast.error("Update failed job type")
            }, 50);
        }
    }
    const navigate = useNavigate();
    return (
        <div className="col-12 grid-margin">
            <div className="w-full">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div onClick={() => navigate(-1)} className='btn gradient-btn'>
                        Back
                    </div>

                    <h4 className="card-title">{isActionADD === true ? 'Add new job type' : 'Update job type'}</h4>
                    <br></br>
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block font-medium">Job Type Name</label>

                                <input type="text" value={inputValues.value} name="value"
                                       onChange={(event) => handleOnChange(event)}
                                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"/>

                            </div>
                            <div className="space-y-2">

                                <label className="block font-medium">Code</label>

                                <input type="text" disabled={true} value={inputValues.code} name="code"
                                       onChange={(event) => handleOnChange(event)}
                                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"/>


                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">


                                <label className="block font-medium">Image</label>

                                <input onChange={(event) => handleOnChangeImage(event)} accept='image/*'
                                       type="file"
                                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>

                            </div>

                            <div className="space-y-2">
                                <label className="block font-medium">Dislay image</label>

                                <div style={{backgroundImage: `url(${inputValues.imageReview})`}}
                                     onClick={() => openPreviewImage()}
                                     className="mt-1 w-full h-32 bg-cover bg-center border border-gray-300 rounded-md shadow-sm"></div>


                            </div>
                        </div>

                        <button type="button" className='btn gradient-btn'
                                onClick={() => handleSaveJobType()}>
                            <i class="ti-file btn1-icon-prepend"></i>
                            Save
                        </button>
                    </form>
                </div>
            </div>

            {
                inputValues.isOpen === true &&
                <Lightbox mainSrc={inputValues.imageReview}
                          onCloseRequest={() => setInputValues({...inputValues, ["isOpen"]: false})}
                />
            }
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
        </div>
    )
}

export default AddJobType
