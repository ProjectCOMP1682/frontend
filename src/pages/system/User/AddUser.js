import React from 'react'
import { useEffect, useState } from 'react';
import { createNewUser, getDetailUserById, UpdateUserService } from '../../../service/userService';
import { useFetchAllcode } from '../../../util/fetch';
import DatePicker from '../../../components/input/DatePicker';
import { toast } from 'react-toastify';
import {useNavigate, useParams} from "react-router-dom";
import localization from 'moment/locale/vi';
import moment from 'moment';


const AddUser = () => {
    const user = JSON.parse(localStorage.getItem("userData"))
    const [birthday, setbirthday] = useState('');
    const [isChangeDate, setisChangeDate] = useState(false)
    const [isActionADD, setisActionADD] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate();


    const [inputValues, setInputValues] = useState({
        email: '', firstName: '', lastName: '', address: '', phonenumber: '', genderCode: '', roleCode: '', id: '', dob: '', image: ''
    });
    let setStateUser = (data) => {
        setInputValues({
            ...inputValues,
            ["firstName"]: data.userAccountData.firstName,
            ["lastName"]: data.userAccountData.lastName,
            ["address"]: data.userAccountData.address,
            ["phonenumber"]: data.phonenumber,
            ["genderCode"]: data.userAccountData.genderCode,
            ["roleCode"]: data.roleData.code,
            ["id"]: data.userAccountData.id,
            ["dob"]: data.userAccountData.dob,

        })
        document.querySelector('[name="genderCode"]').value = data.userAccountData.genderCode
        document.querySelector('[name="roleCode"]').value = data.roleData.code
        setbirthday(data.userAccountData.dob ? moment.unix(+data.userAccountData.dob / 1000).locale('vi').format('DD/MM/YYYY') : null)
    }
    useEffect(() => {

        if (id) {
            let fetchUser = async () => {
                setisActionADD(false)
                let user = await getDetailUserById(id)
                if (user && user.errCode === 0) {
                    setStateUser(user.data)
                }
            }
            fetchUser()
        }
    }, [])

    let { data: dataGender } = useFetchAllcode('GENDER');
    let { data: dataRole } = useFetchAllcode('ROLE')
    if (dataRole && dataRole.length > 0) {
        if (user.roleCode === 'COMPANY')
        dataRole = dataRole.filter(item => item.code !== "ADMIN" && item.code!== "CANDIDATE")
        else if (user.roleCode === 'ADMIN' && isActionADD=== true) {
        dataRole = dataRole.filter(item => item.code !== "COMPANY")
        }
    }
    if (dataGender && dataGender.length > 0 && inputValues.genderCode === '' && dataRole && dataRole.length > 0 && inputValues.roleCode === '' && isActionADD) {
        setInputValues({ ...inputValues, ["genderCode"]: dataGender[0].code, ["roleCode"]: dataRole[0].code })
    }


    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    let handleOnChangeDatePicker = (date) => {
        setbirthday(date[0])
        setisChangeDate(true)

    }
    let handleSaveUser = async () => {
        setIsLoading(true)
        if (isActionADD === true) {
            let params = {
                email : inputValues.email,
                firstName: inputValues.firstName,
                lastName: inputValues.lastName,
                address: inputValues.address,
                roleCode: inputValues.roleCode,
                genderCode: inputValues.genderCode,
                phonenumber: inputValues.phonenumber,
                image: 'https://res.cloudinary.com/bingo2706/image/upload/v1642521841/dev_setups/l60Hf_blyqhb.png',
                dob: new Date(birthday).getTime(),
            }
            if (user.roleCode === "COMPANY")
            {
                params.companyId = user.companyId
            }
            let res = await createNewUser(params)
            setTimeout(() => {
                setIsLoading(false)
                if (res && res.errCode === 0) {
                    toast.success("New user added successfully")
                    setInputValues({
                        ...inputValues,
                        ["firstName"]: '',
                        ["lastName"]: '',
                        ["address"]: '',
                        ["phonenumber"]: '',
                        ["genderCode"]: '',
                        ["roleCode"]: '',
                        ["image"]: '',
                        ["password"]: '',
                    })
                    setbirthday('')
                } else {

                    toast.error(res.errMessage)
                }
            }, 1000);
        } else {
            let res = await UpdateUserService({
                id: inputValues.id,
                firstName: inputValues.firstName,
                lastName: inputValues.lastName,
                address: inputValues.address,
                roleCode: inputValues.roleCode,
                genderCode: inputValues.genderCode,
                dob: isChangeDate === false ? inputValues.dob : new Date(birthday).getTime()
            })
            setTimeout(() => {
                setIsLoading(false)
                if (res && res.errCode === 0) {
                    toast.success("User update successful")

                } else {
                    toast.error(res.errMessage)
                }
            }, 1000);

        }
    }

    return (

        <div className="col-12 grid-margin">
            <div className="w-full">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div onClick={() => navigate(-1)} className='btn gradient-btn' >
                        Back
                    </div>
                    <h4 className="text-lg font-semibold">
                        {isActionADD ? 'Add new user' : 'Update user'}
                    </h4>
                    <br />

                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block font-medium">Last name</label>
                                <input
                                    type="text"
                                    value={inputValues.firstName}
                                    name="firstName"
                                    onChange={(event) => handleOnChange(event)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block font-medium">First name</label>
                                <input
                                    type="text"
                                    value={inputValues.lastName}
                                    name="lastName"
                                    onChange={(event) => handleOnChange(event)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block font-medium">Email</label>
                                <input
                                    type="email"
                                    value={inputValues.email}
                                    name="email"
                                    onChange={(event) => handleOnChange(event)}
                                    disabled={!isActionADD}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block font-medium">Phone number</label>
                                <input
                                    type="number"
                                    value={inputValues.phonenumber}
                                    name="phonenumber"
                                    onChange={(event) => handleOnChange(event)}
                                    disabled={!isActionADD}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                    <label className="block font-medium">Gender</label>
                                <select
                                    value={inputValues.genderCode}
                                    name="genderCode"
                                    onChange={(event) => handleOnChange(event)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    {dataGender && dataGender.length > 0 &&
                                        dataGender.map((item, index) => (
                                            <option key={index} value={item.code}>
                                                {item.value}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="block font-medium">Date of birth</label>
                                <DatePicker
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    onChange={handleOnChangeDatePicker}
                                    value={birthday}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block font-medium">Address</label>
                                <input
                                    type="text"
                                    value={inputValues.address}
                                    name="address"
                                    onChange={(event) => handleOnChange(event)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block font-medium">Role</label>
                                <select
                                    value={inputValues.roleCode}
                                    name="roleCode"
                                    onChange={(event) => handleOnChange(event)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    {dataRole && dataRole.length > 0 &&
                                        dataRole.map((item, index) => (
                                            <option key={index} value={item.code}>
                                                {item.value}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>


                        <button
                            type="button"
                            onClick={() => handleSaveUser()}
                            className='btn gradient-btn'
                        >
                            <i className="ti-file"></i> Save
                        </button>
                    </form>
                </div>
            </div>


        </div>
    );

}

export default AddUser
