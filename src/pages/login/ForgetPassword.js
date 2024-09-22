import React from 'react'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { checkUserPhoneService, changePasswordByphone, handleLoginService } from '../../service/userService';
import OtpForgetPassword from './OtpForgetPassword';
import {Link, NavLink} from 'react-router-dom';
import handleValidate from '../../util/Validation';
const ForgetPassword = () => {
    const [inputValidates, setValidates] = useState({
        phonenumber: true, newPassword: true, confirmPassword: true
    })
    const [inputValues, setInputValues] = useState({
        phonenumber: '', isOpen: false, isSuccess: false, newPassword: '', confirmPassword: '',
    });

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };

    let handleOpenVerifyOTP = async () => {
        let checkPhone = handleValidate(inputValues.phonenumber, "phone")
        if (!(checkPhone === true)) {
            setValidates({
                ...inputValidates,
                phonenumber: checkPhone
            })
            return
        }
        let res = await checkUserPhoneService(inputValues.phonenumber)
        if (res === true) {
            setInputValues({ ...inputValues, ["isOpen"]: true })
        } else {
            setValidates({
                ...inputValidates,
                phonenumber: true
            })
            toast.error("Phone number does not exist!")
        }

    }
    const recieveVerify = (success) => {
        setInputValues({ ...inputValues, ["isOpen"]: false, ["isSuccess"]: true })
    }
    let handleLogin = async (phonenumber, password) => {

        let res = await handleLoginService({
            phonenumber: phonenumber,
            password: password
        })

        if (res && res.errCode === 0) {
            localStorage.setItem("userData", JSON.stringify(res.user))
            if (res.user.roleCode === "ADMIN" || res.user.roleCode === "EMPLOYER") {
                window.location.href = "/admin/"
            }
            else {
                window.location.href = "/"
            }
        }
        else {
            toast.error(res.errMessage)
        }
    }
    let handleForgetPassword = async () => {
        let checkNewPass = handleValidate(inputValues.newPassword, "password")
        if (!(checkNewPass === true)) {
            setValidates({
                ...inputValidates,
                newPassword: checkNewPass
            })
            if (inputValues.confirmPassword !== inputValues.newPassword) {
                setValidates({
                    ...inputValidates,
                    confirmPassword: "Re-entered password does not match"
                })
                return
            }
            return
        }
        let res = await changePasswordByphone({

            phonenumber: inputValues.phonenumber,
            password: inputValues.newPassword,
        })
        if (res && res.errCode === 0) {
            toast.success("Password changed successfully")
            handleLogin(inputValues.phonenumber, inputValues.newPassword)
        } else {
            toast.error(res.errMessage)
        }

    }
    return (
        <>
            {inputValues.isOpen === false &&
                <div className="min-h-screen flex justify-center items-center bg-gray-100">
                    <div className="w-full max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg">
                        <div className="mb-8 text-center">
                            <NavLink to={'/'} className="active btn font-extrabold text-left p-0 bg-transparent hover:bg-transparent text-black border-none normal-case text-xl">
                                <span className='text-black'>JobFinder</span>
                            </NavLink>
                            <h4 className="text-2xl font-semibold mt-4">Forgot password?</h4>
                            <h6 className="text-gray-500 font-light">Don't worry! Restore in seconds</h6>
                        </div>
                        <form className="space-y-6">
                            {inputValues.isSuccess === true && (
                                <>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            value={inputValues.newPassword}
                                            name="newPassword"
                                            onChange={(event) => handleOnChange(event)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                            placeholder="New Password"
                                        />
                                        {inputValidates.newPassword && (
                                            <p className="text-red-500">{inputValidates.newPassword}</p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            value={inputValues.confirmPassword}
                                            name="confirmPassword"
                                            onChange={(event) => handleOnChange(event)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                            placeholder="Confirm Password"
                                        />
                                        {inputValidates.confirmPassword && (
                                            <p className="text-red-500">{inputValidates.confirmPassword}</p>
                                        )}
                                    </div>
                                    <div className="mt-3">
                                        <button
                                            type="button"
                                            onClick={() => handleForgetPassword()}
                                            className="w-full py-3 bg-[#7E90FE] text-white rounded-lg font-semibold hover:bg-[#6C7DD8] transition"
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </>
                            )}
                            {inputValues.isSuccess === false && (
                                <>
                                    <div className="form-group">
                                        <input
                                            type="number"
                                            value={inputValues.phonenumber}
                                            name="phonenumber"
                                            onChange={(event) => handleOnChange(event)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                            placeholder="Phone number"
                                        />
                                        {inputValidates.phonenumber && (
                                            <p className="text-red-500">{inputValidates.phonenumber}</p>
                                        )}
                                    </div>
                                    <div className="mt-3">
                                        <button
                                            type="button"
                                            onClick={() => handleOpenVerifyOTP()}
                                            className="w-full py-3 bg-[#7E90FE] text-white rounded-lg font-semibold hover:bg-[#6C7DD8] transition"
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </>
                            )}
                            <div className="text-center mt-4 text-gray-500">
                                <p>
                                    Don't have an account?{' '}
                                    <Link to="/register" className="text-blue-500 hover:underline">
                                        Register
                                    </Link>
                                </p>
                                <p>
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-blue-500 hover:underline">
                                        Log in
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

            }
            {inputValues.isOpen === true &&
                <OtpForgetPassword dataUser={inputValues.phonenumber} recieveVerify={recieveVerify} />
            }
        </>
    )
}

export default ForgetPassword
