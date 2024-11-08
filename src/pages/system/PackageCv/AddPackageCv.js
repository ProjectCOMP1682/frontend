import React from 'react'
import { useEffect, useState } from 'react';
import { getPackageByIdCv , createPackageCv , updatePackageCv } from '../../../service/userService';
import { toast } from 'react-toastify';
import {useNavigate, useParams} from "react-router-dom";
import { Spinner, Modal } from 'reactstrap'
import '../../../components/modal/modal.css'
const AddpackageCv = () => {


    const [isActionADD, setisActionADD] = useState(true)
    const [isLoading, setIsLoading] = useState(false)


    const { id } = useParams();

    const [inputValues, setInputValues] = useState({
        value: '', price: ''  , name: ''
    });
    useEffect(() => {

        if (id) {
            let fetchDetailPackagePost = async () => {
                setisActionADD(false)
                let res = await getPackageByIdCv(id)
                if (res && res.errCode === 0) {
                    setInputValues({ ...inputValues, ["value"]: res.data.value, ["id"]: res.data.id , ["price"] : res.data.price , ["name"] : res.data.name })
                }
            }
            fetchDetailPackagePost()
        }
    }, [])

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleSavePackageCv = async () => {
        setIsLoading(true)
        if (isActionADD === true) {
            let res = await createPackageCv({
                value: inputValues.value,
                name: inputValues.name,
                price: inputValues.price
            })
            setTimeout(() => {
                setIsLoading(false)
                if (res && res.errCode === 0) {
                    toast.success(res.errMessage)
                    setInputValues({
                        ...inputValues,
                        ["value"]: '',
                        price: '',
                        name: ''
                    })
                }
                else if (res && res.errCode === 2) {
                    toast.error(res.errMessage)
                }
                else toast.error(res.errMessage)
            }, 1000);
        } else {
            let res = await updatePackageCv({
                value: inputValues.value,
                name: inputValues.name,
                price: inputValues.price,
                id: id,
            })
            setTimeout(() => {
                setIsLoading(false)
                if (res && res.errCode === 0) {
                    toast.success(res.errMessage)
                }
                else if (res && res.errCode === 2) {
                    toast.error(res.errMessage)
                }
                else toast.error(res.errMessage)
            }, 500);
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
                        <h4 className="card-title">{isActionADD === true ? 'Add new Cv package' : 'Update Cv package'}</h4>
                        <br></br>
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="col-sm-3 col-form-label">CV package name</label>

                                            <input type="text" value={inputValues.name} name="name" onChange={(event) => handleOnChange(event)}  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"/>


                                </div>

                            <div className="space-y-2">
                                        <label className="col-sm-3 col-form-label">Quanlity</label>

                                            <input type="number" value={inputValues.value} name="value" onChange={(event) => handleOnChange(event)}  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"/>



                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="col-sm-3 col-form-label">{'Price (USD)'}</label>

                                            <input type="number" value={inputValues.price} name="price" onChange={(event) => handleOnChange(event)}  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"/>



                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() =>  handleSavePackageCv()}
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

export default AddpackageCv
