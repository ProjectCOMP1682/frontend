import React from 'react'
import { useEffect, useState } from 'react';
import { handleChangePassword } from '../../../service/userService';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const ChangePassword = (props) => {
    const [inputValues, setInputValues] = useState({
        password: '', oldPassword: '', confirmPassword: ''
    });
    const [user, setUser] = useState({})
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setUser(userData)
    }, [])
    const handleOnChange = event => {
        const {name, value} = event.target;
        setInputValues({...inputValues, [name]: value});

    };
    let handleSave = async () => {
        if (inputValues.password !== inputValues.confirmPassword) {
            toast.error("Password re-entered is incorrect")
            return
        }
        let res = await handleChangePassword({
            id: user.id,
            oldpassword: inputValues.oldPassword,
            password: inputValues.password
        })
        if (res && res.errCode === 0) {
            toast.success("Password changed successfully")
            setInputValues({
                ...inputValues,
                ["oldPassword"]: '',
                ["password"]: '',
                ["confirmPassword"]: ''
            })
        } else {
            toast.error(res.errMessage)
        }
    }
    return (
        <div className="p-4">
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md">
                <div className="p-6">
                    <h4 className="text-xl font-semibold mb-4">Change password</h4>
                    <form className="space-y-4">
                        <div className="flex flex-col">
                            <label className="mb-1 text-gray-700">Old password</label>
                            <input
                                type="password"
                                value={inputValues.oldPassword}
                                name="oldPassword"
                                onChange={handleOnChange}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 text-gray-700">New Password</label>
                            <input
                                type="password"
                                value={inputValues.password}
                                name="password"
                                onChange={handleOnChange}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 text-gray-700">Re-enter password</label>
                            <input
                                type="password"
                                value={inputValues.confirmPassword}
                                name="confirmPassword"
                                onChange={handleOnChange}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <button
                            onClick={handleSave}
                            type="button"
                            className='btn gradient-btn'                              >

                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword
