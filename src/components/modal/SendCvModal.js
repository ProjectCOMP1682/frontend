import React, { useEffect, useState } from 'react';
import { createNewCv } from '../../service/cvService';
import { getDetailUserById } from '../../service/userService';
import './modal.css'
import {toast} from 'react-toastify'

    function SendCvModal(props) {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const [isLoading, setIsLoading] = useState(false);
        const [inputValue, setInputValue] = useState({
            userId: '', postId: '', file: '', description: '', linkFile: '', linkFileUser: '', fileUser: ''
        });
        const [typeCv, setTypeCv] = useState('pcCv');

        // Lấy CV online của người dùng nếu có
        const getFileCv = async (id) => {
            // Giả sử `getDetailUserById` trả về dữ liệu người dùng bao gồm file CV
            let res = await getDetailUserById(id);
            setInputValue((prev) => ({
                ...prev,
                userId: id,
                postId: props.postId,
                linkFileUser: res.data.userAccountData.userSettingData.file,
                fileUser: res.data.userAccountData.userSettingData.file
            }));
        };

        useEffect(() => {
            if (userData) getFileCv(userData.id);
        }, [userData]);

        // Xử lý khi thay đổi input
        const handleChange = (event) => {
            const { name, value } = event.target;
            setInputValue((prev) => ({
                ...prev,
                [name]: value
            }));
        };

        // Xử lý chọn loại CV
        const radioOnChange = (e) => {
            const { value } = e.target;
            if (value === 'userCv' && !inputValue.linkFileUser) {
                toast.warn('Currently not posting CV online');
            } else {
                setTypeCv(value);
            }
        };

        // Xử lý file CV
        const handleOnChangeFile = async (event) => {
            const file = event.target.files[0];
            if (file && file.size <= 2097152) { // Giới hạn kích thước file 2MB
                const reader = new FileReader();
                reader.onload = () => {
                    setInputValue((prev) => ({
                        ...prev,
                        file: reader.result,
                        linkFile: URL.createObjectURL(file)
                    }));
                };
                reader.readAsDataURL(file);
            } else {
                toast.warn("File is too large, select file under 2MB");
            }
        };

        // Gửi CV
        const handleSendCV = async () => {
            setIsLoading(true);
            const cvSend = typeCv === 'userCv' ? inputValue.fileUser : inputValue.file;
            const kq = await createNewCv({
                userId: inputValue.userId,
                file: cvSend,
                postId: inputValue.postId,
                description: inputValue.description
            });
            setIsLoading(false);
            if (kq.errCode === 0) {
                toast.success("CV sent successfully");
                props.onHide();
            } else {
                toast.error("CV sent failed");
            }
        };

        // Trả về giao diện modal
        return (
            props.isOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-4">
                        <h2 className="text-center text-2xl font-semibold text-gray-800">Submit your CV</h2>

                        <div className="mt-6">
                            <label className="block text-gray-700 font-medium mb-1">Introduce yourself:</label>
                            <textarea
                                placeholder="Introduce yourself briefly"
                                name="description"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                rows="4"
                                onChange={handleChange}
                            ></textarea>

                            <div className="flex items-center justify-between mt-4 space-x-4">
                                <label className="flex items-center">
                                    <input type="radio" checked={typeCv === 'pcCv'} value="pcCv" onChange={radioOnChange} className="mr-2" />
                                    <span className="text-gray-700">Choose your CV</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="radio" checked={typeCv === 'userCv'} value="userCv" onChange={radioOnChange} className="mr-2" />
                                    <span className="text-gray-700">CV online</span>
                                </label>
                            </div>

                            {typeCv === 'pcCv' && (
                                <div className="mt-4">
                                    <input type="file" accept=".pdf" onChange={handleOnChangeFile} className="block w-full text-gray-600" />
                                    {inputValue.linkFile && (
                                        <a
                                            href={inputValue.linkFile}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-500 mt-2 inline-block"
                                        >
                                            Review CV
                                        </a>
                                    )}
                                </div>
                            )}

                            {typeCv === 'userCv' && inputValue.linkFileUser && (
                                <a href={inputValue.linkFileUser} target="_blank" rel="noreferrer" className="text-blue-500 mt-4 block">
                                    Review CV
                                </a>
                            )}
                        </div>

                        <div className="flex items-center justify-between mt-6 space-x-4">
                            <button
                                onClick={handleSendCV}
                                disabled={isLoading}
                                className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
                                    isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                            >
                                {isLoading ? "Submitting..." : "Submitting profile"}
                            </button>
                            <button
                                onClick={props.onHide}
                                className="w-full py-2 px-4 rounded-lg bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )
        );
    }

    export default SendCvModal;
