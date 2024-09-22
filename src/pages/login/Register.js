import React from 'react'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { checkUserPhoneService } from '../../service/userService';
import { useFetchAllcode } from '../../util/fetch';
import Otp from './Otp';
import handleValidate from '../../util/Validation';
import {Link, NavLink} from 'react-router-dom'
const Register = () => {
    const [inputValidates, setValidates] = useState({
        phonenumber: true, password: true, firstName: true, lastName: true, email: true,againPass: true
    })
    const [inputValues, setInputValues] = useState({
        phonenumber: '', firstName: '', lastName: '', password: '', isOpen: false, dataUser: {}, roleCode: '',email:'',againPass:'', genderCode: ''
    });
    let { data: dataRole } = useFetchAllcode('ROLE');
    let { data : dataGender} = useFetchAllcode('GENDER');

    if (dataRole && dataRole.length > 0) {
        dataRole = dataRole.filter(item => item.code !== "ADMIN" && item.code!== "COMPANY")

    }
    if (dataGender && dataGender.length > 0 && inputValues.genderCode === '' && dataRole && dataRole.length > 0 && inputValues.roleCode === '') {
        setInputValues({ ...inputValues, ["genderCode"]: dataGender[0].code, ["roleCode"]: dataRole[0].code })
    }

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    let handleOpenVerifyOTP = async () => {
        let checkPhonenumber = handleValidate(inputValues.phonenumber, "phone")
        let checkPassword = handleValidate(inputValues.password, "password")
        let checkFirstName = handleValidate(inputValues.firstName, "isEmpty")
        let checkLastName = handleValidate(inputValues.lastName, "isEmpty")
        let checkEmail = handleValidate(inputValues.email,"email")
        if (!(checkPhonenumber === true && checkPassword === true && checkFirstName === true && checkLastName === true && checkEmail === true)) {
            setValidates({
                phonenumber: checkPhonenumber, password: checkPassword, firstName: checkFirstName, lastName: checkLastName, email: checkEmail
            })
            return
        }

        if (inputValues.againPass !== inputValues.password)
        {
            toast.error("Re-entered password does not match!")
            return
        }
        let res = await checkUserPhoneService(inputValues.phonenumber)
        if (res === true) {
            toast.error("Phone number already exists!")
        } else {
            setInputValues({
                ...inputValues, ["dataUser"]:
                {
                    phonenumber: inputValues.phonenumber,
                    firstName: inputValues.firstName,
                    lastName: inputValues.lastName,
                    password: inputValues.password,
                    roleCode: inputValues.roleCode,
                    email: inputValues.email
                }, ["isOpen"]: true
            })
        }

    }
    return (
        <>
            {!inputValues.isOpen &&
                <div className="min-h-screen  flex items-center justify-center">
                    <div className="w-full max-w-lg">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <div className="text-center mb-6">
                                <NavLink to={'/'} className="active btn font-extrabold text-left p-0 bg-transparent hover:bg-transparent text-black border-none normal-case text-xl">
                                    <span className='text-black'>JobFinder</span>
                                </NavLink>
                            </div>
                            <h4 className="text-2xl font-semibold text-center mb-2">Welcome to Job Finder!</h4>
                            <h6 className="text-center text-gray-600 mb-6">Easy registration in just a few simple steps</h6>
                            <form className="space-y-4">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        value={inputValues.firstName}
                                        name="firstName"
                                        onChange={(event) => handleOnChange(event)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                        placeholder="First Name"
                                    />
                                    {inputValidates.firstName && <p className="text-red-500">{inputValidates.firstName}</p>}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        value={inputValues.lastName}
                                        name="lastName"
                                        onChange={(event) => handleOnChange(event)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                        placeholder="Last Name"
                                    />
                                    {inputValidates.lastName && <p className="text-red-500">{inputValidates.lastName}</p>}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="number"
                                        value={inputValues.phonenumber}
                                        name="phonenumber"
                                        onChange={(event) => handleOnChange(event)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                        placeholder="Phone Number"
                                    />
                                    {inputValidates.phonenumber && <p className="text-red-500">{inputValidates.phonenumber}</p>}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        value={inputValues.email}
                                        name="email"
                                        onChange={(event) => handleOnChange(event)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                        placeholder="Email"
                                    />
                                    {inputValidates.email && <p className="text-red-500">{inputValidates.email}</p>}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        value={inputValues.password}
                                        name="password"
                                        onChange={(event) => handleOnChange(event)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                        placeholder="Password"
                                    />
                                    {inputValidates.password && <p className="text-red-500">{inputValidates.password}</p>}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        value={inputValues.againPass}
                                        name="againPass"
                                        onChange={(event) => handleOnChange(event)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                        placeholder="Re-Enter Password"
                                    />
                                    {inputValidates.againPass && <p className="text-red-500">{inputValidates.againPass}</p>}
                                </div>
                                <div className="form-group">
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-black"
                                        value={inputValues.roleCode}
                                        name="roleCode"
                                        onChange={(event) => handleOnChange(event)}
                                    >
                                        {dataRole && dataRole.length > 0 &&
                                            dataRole.map((item, index) => {
                                                if (item.code !== "ADMIN" && item.code !== "COMPANY") {
                                                    return (
                                                        <option key={index} value={item.code}>{item.value}</option>
                                                    )
                                                }
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-black"
                                        value={inputValues.genderCode}
                                        name="genderCode"
                                        onChange={(event) => handleOnChange(event)}
                                    >
                                        {dataGender && dataGender.length > 0 &&
                                            dataGender.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.code}>{item.value}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mt-3">
                                    <button
                                        type="button"
                                        onClick={() => handleOpenVerifyOTP()}
                                        className="w-full py-3 bg-[#7E90FE] text-white rounded-lg font-semibold hover:bg-[#6C7DD8] transition"
                                    >
                                        Register
                                    </button>
                                </div>
                                <div className="text-center mt-4 text-gray-600">
                                    Already have an account?
                                    <Link to="/login" className="text-indigo-600 hover:underline ml-1">Sign in now</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }

            {inputValues.isOpen &&
                <Otp dataUser={inputValues.dataUser} />
            }
        </>


)
}

export default Register
