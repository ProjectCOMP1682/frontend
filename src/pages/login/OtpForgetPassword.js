import React, { useEffect, useState } from 'react'
import firebase from '../../util/firebase';
import { toast } from 'react-toastify';
import { createNewUser, handleLoginService } from '../../service/userService';
import {NavLink} from "react-router-dom";
const OtpForgetPassword = (props) => {
    const [dataUser, setdataUser] = useState({})
    const [otpnumber, setotpnumber] = useState('')
    const [inputValues, setInputValues] = useState({
        so1: '', so2: '', so3: '', so4: '', so5: '', so6: ''
    });
    useEffect(() => {
        if (props.dataUser) {
            let fetchOtp = async () => {
                await onSignInSubmit(false)
            }
            fetchOtp()

        }



    }, [props.dataUser])
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let configureCaptcha = () => {

        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            defaultCountry: "VN"
        });
    }
    let onSignInSubmit = async (isResend) => {
        if (!isResend)
            configureCaptcha()
        let phoneNumber = props.dataUser
        if (phoneNumber) {
            phoneNumber = "+84" + phoneNumber.slice(1);
        }


        console.log("check phonenumber", phoneNumber)
        const appVerifier = window.recaptchaVerifier;


        await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                toast.success("OTP code sent to phone")
                // ...
            }).catch((error) => {
                console.log(error)
                toast.error("Send code failed!")
            });
    }
    let submitOTP = async () => {
        const code = +(inputValues.so1 + inputValues.so2 + inputValues.so3 + inputValues.so4 + inputValues.so5 + inputValues.so6);

        await window.confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            toast.success("OTP code confirmed !")
            props.recieveVerify(true)
            // ...
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            toast.error("Incorrect OTP code!")
        });
    }
    let resendOTP = async () => {
        await onSignInSubmit(true)
    }
    return (
        <>
            <div className="flex justify-center items-center h-screen ">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center w-full max-w-md">
                    <div className="mb-5">
                        <div className="text-center mb-6">
                            <NavLink to={'/'} className="active btn font-extrabold text-left p-0 bg-transparent hover:bg-transparent text-black border-none normal-case text-xl">
                                <span className='text-black'>JobFinder</span>
                            </NavLink>
                        </div>
                        <h5 className="text-2xl font-semibold text-black mb-2">OTP AUTHENTICATION</h5>
                        <div>
                            <small className="text-gray-600">Code has been sent to phone number {props.dataUser && props.dataUser.phonenumber}</small>
                        </div>
                    </div>
                    <div className="flex justify-center mt-2 space-x-2">
                        <input value={inputValues.so1} name="so1" onChange={(event) => handleOnChange(event)} type="text" className="w-10 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" maxLength={1} />
                        <input value={inputValues.so2} name="so2" onChange={(event) => handleOnChange(event)} type="text" className="w-10 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" maxLength={1} />
                        <input value={inputValues.so3} name="so3" onChange={(event) => handleOnChange(event)} type="text" className="w-10 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" maxLength={1} />
                        <input value={inputValues.so4} name="so4" onChange={(event) => handleOnChange(event)} type="text" className="w-10 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" maxLength={1} />
                        <input value={inputValues.so5} name="so5" onChange={(event) => handleOnChange(event)} type="text" className="w-10 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" maxLength={1} />
                        <input value={inputValues.so6} name="so6" onChange={(event) => handleOnChange(event)} type="text" className="w-10 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" maxLength={1} />
                    </div>
                    <div className="mt-3">
                        <small className="text-gray-600">
                            You did not receive Otp?
                            <a onClick={() => resendOTP()} className="text-blue-500 cursor-pointer ml-2">Resend</a>
                        </small>
                    </div>
                    <div className="mt-5">
                        <button onClick={() => submitOTP()} className="w-full py-3 bg-[#7E90FE] text-white rounded-lg font-semibold hover:bg-[#6C7DD8] transition">Authentication</button>
                    </div>
                </div>
            </div>
        </>


)
}

export default OtpForgetPassword
