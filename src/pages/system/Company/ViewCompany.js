import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import CommonUtils from '../../../util/CommonUtils';
import { getDetailCompanyByUserId } from '../../../service/userService';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Spinner, Modal } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';

const ViewCompany = () => {
    const { id } = useParams();
    const mdParser = new MarkdownIt();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [inputValues, setInputValues] = useState({
        image: '',
        coverImage: '',
        imageReview: '',
        coverImageReview: '',
        isOpen: false,
        name: '',
        phonenumber: '',
        address: '',
        website: '',
        amountEmployer: '',
        taxnumber: '',
        descriptionHTML: '',
        descriptionMarkdown: '',
        isActionADD: true,
        id: '',
        file: '',
        imageClick: '',
        isFileChange: false
    });

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData.roleCode !== "ADMIN") {
            fetchCompany(userData.id);
        } else if (id && userData.roleCode === 'ADMIN') {
            fetchCompany(null, id);
        }
        setUser(userData);
    }, []);

    let fetchCompany = async (userId, companyId = null) => {
        let res = await getDetailCompanyByUserId(userId, companyId);
        if (res && res.errCode === 0) {
            setInputValues({
                ...inputValues,
                ["name"]: res.data.name,
                ["phonenumber"]: res.data.phonenumber,
                ["address"]: res.data.address,
                ["image"]: res.data.thumbnail,
                ["coverImage"]: res.data.coverimage,
                ["descriptionHTML"]: res.data.descriptionHTML,
                ["descriptionMarkdown"]: res.data.descriptionMarkdown,
                ["amountEmployer"]: res.data.amountEmployer,
                ["taxnumber"]: res.data.taxnumber,
                ["website"]: res.data.website,
                ["imageReview"]: res.data.thumbnail,
                ["coverImageReview"]: res.data.coverimage,
                ["id"]: res.data.id,
                ["file"]: res.data.file
            });
        }
    }


    let openPreviewImage = (event) => {
        const name = event.target.getAttribute('name');
        if (!inputValues.imageReview && !inputValues.coverImageReview) return;
        setInputValues({ ...inputValues, imageClick: name === 'cover' ? inputValues.coverImage : inputValues.imageReview, ["isOpen"]: true });
    }

    let handleEditorChange = ({ html, text }) => {
        setInputValues({
            ...inputValues,
            ["descriptionMarkdown"]: text,
            ["descriptionHTML"]: html
        });
    }


    return (
        <>
            <div className="">
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <div className="mb-4">
                            <div onClick={() => navigate(-1)} className='btn gradient-btn' >
                               Back
                            </div>
                            <h4 className="text-lg font-semibold">
                                View company information
                            </h4>
                            <br />
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-medium">Company name</label>
                                        <input
                                            disabled
                                            value={inputValues.name}
                                            name="name"
                                            type="text"
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium">Phone number</label>
                                        <input
                                            disabled
                                            value={inputValues.phonenumber}
                                            name="phonenumber"
                                            type="number"
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium">Tax code</label>
                                        <input
                                            disabled
                                            value={inputValues.taxnumber}
                                            name="taxnumber"
                                            type="text"
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium">Number of employees</label>
                                        <input
                                            disabled
                                            value={inputValues.amountEmployer}
                                            name="amountEmployer"
                                            type="number"
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium">Address</label>
                                        <input
                                            disabled
                                            value={inputValues.address}
                                            name="address"
                                            type="text"
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium">Website link</label>
                                        <input
                                            disabled
                                            value={inputValues.website}
                                            name="website"
                                            type="text"
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>


                                    <div>
                                        <label className="block font-medium">Avatar</label>
                                        <div className="col-sm-9">
                                            <div
                                                name='cover'
                                                onClick={(event) => openPreviewImage(event)}
                                                className="w-full h-64 bg-cover bg-center cursor-pointer"
                                                style={{ backgroundImage: `url(${inputValues.imageReview})` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block font-medium">Cover photo</label>
                                        <div className="col-sm-9">
                                            <div
                                                name='cover'
                                                onClick={(event) => openPreviewImage(event)}
                                                className="w-full h-64 bg-cover bg-center cursor-pointer"
                                                style={{ backgroundImage: `url(${inputValues.coverImageReview})` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white shadow-md rounded-lg">
                                        <label className="block text-lg font-semibold mb-2">Company Introduction</label>
                                        <div className="mt-2 text-gray-700 leading-relaxed">
                                            {inputValues.descriptionMarkdown}

                                        </div>
                                    </div>
                                    <div>
                                        <label className="block font-medium">Certification Profile</label>
                                        <iframe width={'100%'} height={'700px'} src={inputValues.file}></iframe>

                                    </div>
                                </div>

                                {/* Add more form fields as necessary, similar to above */}



                            </form>
                        </div>
                    </div>
                </div>
                {
                    inputValues.isOpen &&
                    <Lightbox
                        mainSrc={inputValues.imageClick}
                        onCloseRequest={() => setInputValues({ ...inputValues, ["isOpen"]: false })}
                    />
                }
            </div>
            {isLoading &&
                <Modal isOpen={true} centered className="closeBorder">
                    <div className="flex justify-center items-center h-full">
                        <Spinner animation="border" />
                    </div>
                </Modal>
            }
        </>
    );
}

export default ViewCompany;
