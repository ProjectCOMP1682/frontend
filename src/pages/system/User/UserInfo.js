import React from 'react'
import { useEffect, useState } from 'react';
import { createNewUser, getDetailUserById, UpdateUserService } from '../../../service/userService';
import { useFetchAllcode } from '../../../util/fetch';
import DatePicker from '../../../components/input/DatePicker';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import localization from 'moment/locale/vi';
import moment from 'moment';
import Lightbox from 'react-image-lightbox';
import CommonUtils from '../../../util/CommonUtils';
import 'react-image-lightbox/style.css'; // Import the CSS for the Lightbox

// Your existing component logic

const UserInfo = () => {
    const [birthday, setbirthday] = useState('');
    const [isChangeDate, setisChangeDate] = useState(false)
    const [isChangeImg,setisChangeImg] = useState(false)
    const [isActionADD, setisActionADD] = useState(true)
    const { id } = useParams();
    const [inputValues, setInputValues] = useState({
        password: '', firstName: '', lastName: '', address: '', phonenumber: '', genderCode: '', roleCode: '', id: '', dob: '', image: '', imageReview: '', isOpen: false,email: ''
    });

    let setStateUser = (data) => {
        setInputValues({
            ...inputValues,
            ["firstName"]: data.userAccountData.firstName,
            ["lastName"]: data.userAccountData.lastName,
            ["address"]: data.userAccountData.address,
            ["phonenumber"]: data.phonenumber,
            ["genderCode"]: data.userAccountData.genderCode,
            ["roleCode"]: data.userAccountData.roleCode,
            ["id"]: data.userAccountData.id,
            ["dob"]: data.userAccountData.dob,
            ["image"]: data.userAccountData.image,
            ["imageReview"]: data.userAccountData.image,
            ["email"] : data.userAccountData.email
        })
        setbirthday(moment.unix(+data.userAccountData.dob / 1000).locale('vi').format('DD/MM/YYYY'))
    }
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            let fetchUser = async () => {
                setisActionADD(false)
                let user = await getDetailUserById(userData.id)
                if (user && user.errCode === 0) {
                    setStateUser(user.data)
                }
            }
            fetchUser()
        }
    }, [])

    const { data: dataGender } = useFetchAllcode('GENDER');
    const { data: dataRole } = useFetchAllcode('ROLE')


    if (dataGender && dataGender.length > 0 && inputValues.genderCode === '' && dataRole && dataRole.length > 0 && inputValues.roleCode === '') {
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
    let handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file)
            setisChangeImg(true)
            setInputValues({ ...inputValues, ["image"]: base64, ["imageReview"]: objectUrl })

        }
    }
    let openPreviewImage = () => {
        if (!inputValues.imageReview) return;

        setInputValues({ ...inputValues, ["isOpen"]: true })
    }
    let handleSaveUser = async () => {

        let res = await UpdateUserService({
            id: inputValues.id,
            firstName: inputValues.firstName,
            lastName: inputValues.lastName,
            address: inputValues.address,
            roleCode: inputValues.roleCode,
            genderCode: inputValues.genderCode,
            dob: isChangeDate === false ? inputValues.dob : new Date(birthday).getTime(),
            image: isChangeImg ? inputValues.image : null,
            email: inputValues.email
        })
        if (res && res.errCode === 0) {
            localStorage.setItem("userData", JSON.stringify(res.user))
            toast.success("User update successful")
            setTimeout(()=> {
                window.location.reload()
            },1000)
        } else {
            toast.error(res.errMessage)
        }



    }
    return (
        <div>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <div className="mb-4">
                            <h4 className="text-xl font-semibold">Personal information</h4>
                        </div>
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Last name</label>
                                    <input
                                        type="text"
                                        value={inputValues.firstName}
                                        name="firstName"
                                        onChange={(event) => handleOnChange(event)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">First name</label>
                                    <input
                                        type="text"
                                        value={inputValues.lastName}
                                        name="lastName"
                                        onChange={(event) => handleOnChange(event)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Address</label>
                                    <input
                                        type="text"
                                        value={inputValues.address}
                                        name="address"
                                        onChange={(event) => handleOnChange(event)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone number</label>
                                    <input
                                        type="number"
                                        value={inputValues.phonenumber}
                                        disabled={!isActionADD}
                                        name="phonenumber"
                                        onChange={(event) => handleOnChange(event)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                                    <select
                                        value={inputValues.genderCode}
                                        name="genderCode"
                                        onChange={(event) => handleOnChange(event)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        style={{ color: "black" }}
                                    >
                                        {dataGender &&
                                            dataGender.length > 0 &&
                                            dataGender.map((item, index) => (
                                                <option key={index} value={item.code}>
                                                    {item.value}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date of birth</label>
                                    <DatePicker
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={handleOnChangeDatePicker}
                                        value={birthday}

                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Image</label>
                                    <input
                                        accept="image/*"
                                        onChange={(event) => handleOnChangeImage(event)}
                                        type="file"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Image display</label>
                                    <div
                                        className="mt-1 w-full h-32 bg-cover bg-center border border-gray-300 rounded-md shadow-sm"
                                        style={{ backgroundImage: `url(${inputValues.imageReview})` }}
                                        onClick={() => openPreviewImage()}
                                    ></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        value={inputValues.email}
                                        name="email"
                                        onChange={(event) => handleOnChange(event)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => handleSaveUser()}
                                className='btn gradient-btn'   >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {inputValues.isOpen && (
                <Lightbox
                    mainSrc={inputValues.imageReview}
                    onCloseRequest={() => setInputValues({ ...inputValues, isOpen: false })}
                />
            )}
        </div>
    );

}

export default UserInfo
