import React from 'react'
import { useEffect, useState } from 'react';
import {Link, NavLink} from 'react-router-dom'
import { handleLoginService } from '../../service/userService';
import { toast } from 'react-toastify';
const Login = () => {
    const [inputValues, setInputValues] = useState({
        password: '', phonenumber: ''
    });
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleLogin = async () => {

        let res = await handleLoginService({
            phonenumber: inputValues.phonenumber,
            password: inputValues.password
        })

        if (res && res.errCode === 0) {


            localStorage.setItem("userData", JSON.stringify(res.user))
            localStorage.setItem("token_user", res.token)
            if (res.user.roleCode === "ADMIN" || res.user.roleCode === "EMPLOYER" || res.user.roleCode === "COMPANY") {
                window.location.href = "/admin/"
            }
            else {
                const lastUrl = localStorage.getItem("lastUrl")
                if (lastUrl) {
                    localStorage.removeItem("lastUrl")
                    window.location.href = lastUrl
                }
                else {
                    window.location.href = "/"
                }
            }
        }
        else {
            toast.error(res.errMessage)
        }
    }
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
            <div className="min-h-screen  flex items-center justify-center">
                <div className="w-full max-w-lg">
                    <div className="bg-white p-10 rounded-lg shadow-lg">
                        <div className="text-center mb-6">
                            <NavLink to={'/'} className="active btn font-extrabold text-left p-0 bg-transparent hover:bg-transparent text-black border-none normal-case text-xl">
                                <span className='text-black'>JobFinder</span>
                            </NavLink>
                        </div>
                        <h4 className="text-2xl font-semibold text-center mb-2">Hello! Apply now!</h4>
                        <h6 className="text-center text-gray-600 mb-6">Sign in to continue.</h6>
                        <form className="space-y-4">
                            <div className="form-group">
                                <input
                                    type="number"
                                    value={inputValues.phonenumber}
                                    name="phonenumber"
                                    onChange={(event) => handleOnChange(event)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                    placeholder="Enter phone number"
                                />
                            </div>


                            <div className="form-group">
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={inputValues.password}
                                        name="password"
                                        onChange={(event) => handleOnChange(event)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                        placeholder="Enter password"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-3 text-gray-600"
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>
                            <div className="mt-3">
                                <button
                                    type="button"
                                    onClick={() => handleLogin()}
                                    className="w-full py-3 bg-[#7E90FE] text-white rounded-lg font-semibold hover:bg-[#6C7DD8] transition"
                                >
                                    Log in
                                </button>
                            </div>
                            <div className="my-2 flex justify-between items-center">
                                <Link
                                    to="/forget-password"
                                    className="text-indigo-500 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="text-center mt-4 text-gray-600">
                                Don't have an account?
                                <Link
                                    to="/register"
                                    className="text-indigo-600 hover:underline ml-1"
                                >
                                    Create now
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>


)
}

export default Login
