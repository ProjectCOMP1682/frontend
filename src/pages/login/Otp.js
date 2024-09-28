import React, { useEffect, useState } from 'react'
import firebase from '../../util/firebase';
import { toast } from 'react-toastify';
import { createNewUser, handleLoginService } from '../../service/userService';
const Otp = (props) => {
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
        let phoneNumber = props.dataUser.phonenumber
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
                toast.error("Send code failed !")
            });
    }
    let submitOTP = async () => {
        const code = +(inputValues.so1 + inputValues.so2 + inputValues.so3 + inputValues.so4 + inputValues.so5 + inputValues.so6);
        await window.confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            toast.success("Phone number verified !")
            let createUser = async () => {
                let res = await createNewUser({
                    password: props.dataUser.password,
                    firstName: props.dataUser.firstName,
                    lastName: props.dataUser.lastName,
                    phonenumber: props.dataUser.phonenumber,
                    roleCode: props.dataUser.roleCode,
                    email: props.dataUser.email,
                    image: 'https://res.cloudinary.com/bingo2706/image/upload/v1642521841/dev_setups/l60Hf_blyqhb.png',
                })
                if (res && res.errCode === 0) {
                    toast.success("Account created successfully")
                    handleLogin(props.dataUser.phonenumber, props.dataUser.password)
                } else {
                    toast.error(res.errMessage)
                }
            }
            createUser()
            // ...
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            toast.error("Incorrect OTP code !")
        });
    }
    let resendOTP = async () => {
        await onSignInSubmit(true)
    }
    let handleLogin = async (phonenumber, password) => {
        let res = await handleLoginService({
            phonenumber: phonenumber,
            password: password
        })
        if (res && res.errCode === 0) {
            localStorage.setItem("userData", JSON.stringify(res.user))
            localStorage.setItem("token_user", res.token)
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
    return (
        <>
            <div className="min-h-screen  flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
                    <div className="mb-6">
                        <img
                            src="https://raw.githubusercontent.com/Rustcodeweb/OTP-Verification-Card-Design/main/mobile.png"
                            alt="mobile"
                            className="mx-auto w-20"
                        />
                        <h5 className="text-xl font-semibold text-black mt-4">OTP AUTHENTICATION</h5>
                        <p className="text-gray-700 mt-2">
                            Code has been sent to phone number {props.dataUser && props.dataUser.phonenumber}
                        </p>
                    </div>
                    <div className="flex justify-center space-x-2 mb-4">
                        <input
                            value={inputValues.so1}
                            name="so1"
                            onChange={(event) => handleOnChange(event)}
                            type="text"
                            maxLength={1}
                            className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                        <input
                            value={inputValues.so2}
                            name="so2"
                            onChange={(event) => handleOnChange(event)}
                            type="text"
                            maxLength={1}
                            className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                        <input
                            value={inputValues.so3}
                            name="so3"
                            onChange={(event) => handleOnChange(event)}
                            type="text"
                            maxLength={1}
                            className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                        <input
                            value={inputValues.so4}
                            name="so4"
                            onChange={(event) => handleOnChange(event)}
                            type="text"
                            maxLength={1}
                            className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                        <input
                            value={inputValues.so5}
                            name="so5"
                            onChange={(event) => handleOnChange(event)}
                            type="text"
                            maxLength={1}
                            className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                        <input
                            value={inputValues.so6}
                            name="so6"
                            onChange={(event) => handleOnChange(event)}
                            type="text"
                            maxLength={1}
                            className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div className="text-gray-700 mb-4">
                        Didn't receive OTP?
                        <a
                            onClick={() => resendOTP()}
                            className="text-indigo-600 ml-1 cursor-pointer hover:underline"
                        >
                            Resend
                        </a>
                    </div>
                    <div className="mt-3 mb-5">
                        <div id="sign-in-button"></div>
                        <button onClick={() => submitOTP()} className="px-4 py-2 text-white bg-[#9873ff] rounded-lg font-semibold hover:bg-[#7E90FE] transition">Authentication
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Otp