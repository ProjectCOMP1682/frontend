import React from 'react'
import { useEffect, useState } from 'react';
import {  getPaymentLinkCv, getAllToSelect } from '../../../service/userService';
import { toast } from 'react-toastify';
import { useParams} from "react-router-dom";
import { Spinner, Modal } from 'reactstrap'
const BuyCv = () => {
    const [inputValues, setInputValues] = useState({
       amount: 1, packageCvId: ''
    });
    const [isLoading, setIsLoading] = useState(false)
    const [dataPackage, setDataPackage] = useState([])
    const [price, setPrice] = useState(0)
    const [total, setTotal] = useState(0)
    const handleOnChangePackage = event => {
        const { value } = event.target;
        let item = dataPackage.find(item => item.id == value)
        setPrice(item.price)
        setTotal(item.price * inputValues.amount)
        setInputValues({
            ...inputValues,
            packageCvId: item.id
        })
    };
    const handleOnChangeAmount = event => {
        const { value } = event.target
        setInputValues({
            ...inputValues,
            amount: value
        })
        setTotal(value * price)
    }

    const handleBuy = async() => {
        setIsLoading(true)
        let res = await getPaymentLinkCv(inputValues.packageCvId , inputValues.amount)
        if (res.errCode == 0) {
            let data = {
                packageCvId: inputValues.packageCvId,
                amount : inputValues.amount,
                userId: JSON.parse(localStorage.getItem('userData')).id
            }
            localStorage.setItem("orderCvData", JSON.stringify(data))
            window.location.href = res.link
        }
        else {
            toast.errorr(res.errMessage)
            setIsLoading(false)
        }
    }
    const fetchPackagePost = async()=> {
        let res = await getAllToSelect()
        setDataPackage(res.data)
        setInputValues({
            ...inputValues,
            packageCvId: res.data[0].id
        })
        setPrice(res.data[0].price)
        setTotal(res.data[0].price * inputValues.amount)
    }
    useEffect(() => {
        fetchPackagePost()
    }, [])
    return (
        <div className="">
            <div className="grid grid-cols-1 gap-4">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold">Buy packages for finding candidates</h4>
                        <br></br>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium">Packages for finding candidates</label>

                                            <select style={{ color: "black" }}  className="mt-1 block w-full border border-gray-300 rounded-md p-2" name="addressCode" onChange={(event) => handleOnChangePackage(event)}>
                                                {dataPackage && dataPackage.length > 0 &&
                                                    dataPackage.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.id}>{item.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>

                                    </div>


                                <div>
                                    <label className="block font-medium">Price</label>

                                                <p  className="mt-1 block w-full border border-gray-300 rounded-md p-2">{price} USD</p>

                                </div>

                                <div>
                                    <label className="block font-medium">Quantity</label>

                                            <input onChange={handleOnChangeAmount} value={inputValues.amount}  className="mt-1 block w-full border border-gray-300 rounded-md p-2" type={'number'}></input>

                                </div>

                                <div>
                                    <label className="block font-medium">Total price</label>

                                            <p  className="mt-1 block w-full border border-gray-300 rounded-md p-2">{total} USD</p>

                                </div>

                            </div>
                            <button type="button" className='btn gradient-btn' onClick={() => handleBuy()}>
                                <i class="ti-file btn1-icon-prepend"></i>
                                Buy
                            </button>
                        </form>
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
        </div>
    )
}

export default BuyCv
