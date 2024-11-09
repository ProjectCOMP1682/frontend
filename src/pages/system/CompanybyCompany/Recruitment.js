import React from 'react'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { RecruitmentService } from '../../../service/userService';
const Recruitment = () => {

    const [inputValues, setInputValues] = useState({
        phonenumber: ''
    });

    const [user, setUser] = useState({})
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setUser(userData)
    }, [])

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleSubmit = async () => {
        let res = await RecruitmentService({
            phonenumber: inputValues.phonenumber,
            companyId: user.companyId
        })
        if (res && res.errCode === 0) {
            toast.success("Successful recruitment !");
            setInputValues({
                ...inputValues,
                ["phonenumber"]: ''
            })
        } else {
            toast.error(res.errMessage)
        }
    }
    return (
        <div className="">
            <div className="grid grid-cols-1 gap-4">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold">HR staff recruitment</h4>
                        <br></br>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium">Phone number</label>

                                            <input type="text" value={inputValues.phonenumber} name="phonenumber" onChange={(event) => handleOnChange(event)}    className="mt-1 block w-full border border-gray-300 rounded-md p-2" />

                                </div>
                            </div>

                            <button onClick={() => handleSubmit()} type="button"   className='btn gradient-btn' >
                                <i class="ti-file btn1-icon-prepend"></i>
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Recruitment
