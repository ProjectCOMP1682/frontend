import React from 'react'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import CommonUtils from '../../../util/CommonUtils';
import { createCompanyService, getDetailCompanyByUserId, updateCompanyService } from '../../../service/userService';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Spinner, Modal } from 'reactstrap'
import '../../../components/modal/modal.css'
import { useHistory, useParams } from 'react-router-dom';
const AddCompany = () => {
    const { id } = useParams()
    const mdParser = new MarkdownIt();
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [inputValues, setInputValues] = useState({
        image: '', coverImage: '', imageReview: '', coverImageReview: '', isOpen: false, name: '', phonenumber: '', address: '', website: '',
        amountEmployer: '', taxnumber: '', descriptionHTML: '', descriptionMarkdown: '', isActionADD: true, id: '', file: '', imageClick: '',
        isFileChange: false
    });
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData.roleCode !== "ADMIN") {
            fetchCompany(userData.id)
        }
        else if (id && userData.roleCode === 'ADMIN') {
            fetchCompany(null, id)
        }
        setUser(userData)
    }, [])
    let fetchCompany = async (userId, companyId = null) => {
        let res = await getDetailCompanyByUserId(userId, companyId)
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
                ["isActionADD"]: false,
                ["id"]: res.data.id,
                ["file"]: res.data.file
            })
        }
    }
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        const { name } = event.target;
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file)
            setInputValues({ ...inputValues, [name]: base64, [`${name}Review`]: objectUrl })

        }

    }

    let handleOnChangeFile = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            if (file.size > 2097152) {
                toast.error("Your file is too large. Only send files under 2MB.")
                return
            }
            let base64 = await CommonUtils.getBase64(file);

            setInputValues({ ...inputValues, file: base64, isFileChange: true })
        }
    }
    let openPreviewImage = (event) => {
        const name = event.target.getAttribute('name')
        if (!inputValues.imageReview && !inputValues.coverImageReview) return;
        setInputValues({ ...inputValues, imageClick: name === 'cover' ? inputValues.coverImage : inputValues.imageReview, ["isOpen"]: true })
    }
    let handleSaveCompany = async () => {
        setIsLoading(true)
        if (inputValues.isActionADD === true) {
            let params = {
                name: inputValues.name,
                phonenumber: inputValues.phonenumber,
                address: inputValues.address,
                thumbnail: inputValues.image,
                coverimage: inputValues.coverImage,
                descriptionHTML: inputValues.descriptionHTML,
                descriptionMarkdown: inputValues.descriptionMarkdown,
                amountEmployer: inputValues.amountEmployer,
                taxnumber: inputValues.taxnumber,
                website: inputValues.website,
                userId: user.id,
            }
            if (inputValues.file) {
                params.file = inputValues.file
            }
            let res = await createCompanyService(params)
            setTimeout(() => {
                setIsLoading(false)
                if (res && res.errCode === 0) {
                    toast.success("Create a successful new company")
                    fetchCompany(user.id)
                    let userData = JSON.parse(localStorage.getItem("userData"))
                    let newUser = { ...userData, roleCode: "COMPANY", companyId: res.companyId }
                    localStorage.setItem("userData", JSON.stringify(newUser))
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000)
                } else {
                    toast.error(res.errMessage)
                }
            }, 1000);
        } else {
            let params = {
                name: inputValues.name,
                phonenumber: inputValues.phonenumber,
                address: inputValues.address,
                thumbnail: inputValues.image,
                coverimage: inputValues.coverImage,
                descriptionHTML: inputValues.descriptionHTML,
                descriptionMarkdown: inputValues.descriptionMarkdown,
                amountEmployer: inputValues.amountEmployer,
                taxnumber: inputValues.taxnumber,
                website: inputValues.website,
                id: inputValues.id
            }
            if (inputValues.isFileChange) {
                params.file = inputValues.file
            }
            let res = await updateCompanyService(params)
            setIsLoading(false)
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
            } else {
                toast.error(res.errMessage)
            }

        }
    }
    let handleEditorChange = ({ html, text }) => {
        setInputValues({
            ...inputValues,
            ["descriptionMarkdown"]: text,
            ["descriptionHTML"]: html
        })
    }
    return (
        <>
            <div className="">
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <div className="mb-4">
                            <h4 className="text-lg font-semibold">{inputValues.isActionADD === true ? 'Add new company' : (user?.roleCode === 'ADMIN' ? 'View company information' : 'Company Update')}</h4>
                            <br></br>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>

                                            <label className="col-sm-3 col-form-label">Company name</label>

                                                <input disabled={user?.roleCode === "ADMIN" ? true : false} value={inputValues.name} name="name" onChange={(event) => handleOnChange(event)} type="text"    className="mt-1 block w-full border border-gray-300 rounded-md p-2" />

                                    </div>

                                    <div >
                                            <label className="col-sm-3 col-form-label">Phone number</label>
                                                <input disabled={user?.roleCode === "ADMIN" ? true : false} value={inputValues.phonenumber} name="phonenumber" onChange={(event) => handleOnChange(event)} type="number"    className="mt-1 block w-full border border-gray-300 rounded-md p-2" />

                                    </div>

                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div >

                                            <label className="col-sm-3 col-form-label">Tax code</label>

                                                <input disabled={user?.roleCode === "ADMIN" ? true : false} value={inputValues.taxnumber} name="taxnumber" onChange={(event) => handleOnChange(event)} type="text"  className="mt-1 block w-full border border-gray-300 rounded-md p-2" />

                                    </div>
                                    <div >

                                            <label className="col-sm-3 col-form-label">Number of employees</label>

                                                <input disabled={user?.roleCode === "ADMIN" ? true : false} value={inputValues.amountEmployer} name="amountEmployer" onChange={(event) => handleOnChange(event)} type="number"  className="mt-1 block w-full border border-gray-300 rounded-md p-2" />

                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                        <div >
                                            <label className="col-sm-3 col-form-label">Address</label>

                                                <input disabled={user?.roleCode === "ADMIN" ? true : false} value={inputValues.address} name="address" onChange={(event) => handleOnChange(event)} type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />

                                        </div>

                                    <div >

                                            <label className="col-sm-3 col-form-label">Website link</label>

                                                <input disabled={user?.roleCode === "ADMIN" ? true : false} value={inputValues.website} name="website" onChange={(event) => handleOnChange(event)} type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />


                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div >

                                            <label className="col-sm-3 col-form-label">Avatar</label>

                                                <input disabled={user?.roleCode === "ADMIN" ? true : false} name='image' onChange={(event) => handleOnChangeImage(event)} accept='image/*' type="file" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />

                                    </div>
                                    <div >

                                            <label className="col-sm-3 col-form-label">Display</label>

                                        <div
                                            name='cover'
                                            onClick={(event) => openPreviewImage(event)}
                                            className="w-full h-64 bg-cover bg-center cursor-pointer"
                                            style={{ backgroundImage: `url(${inputValues.imageReview})` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div >

                                            <label className="col-sm-3 col-form-label">Cover photo</label>

                                                <input disabled={user?.roleCode === "ADMIN" ? true : false} name='coverImage' onChange={(event) => handleOnChangeImage(event)} accept='image/*' type="file" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />


                                    </div>
                                    <div >

                                            <label className="col-sm-3 col-form-label">Display</label>

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
                                        <MdEditor
                                            style={{ height: '500px' }}
                                            renderHTML={text => mdParser.render(text)}
                                            onChange={handleEditorChange}
                                            value={inputValues.descriptionMarkdown}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="block text-lg font-semibold mb-2">Certification Profile</label>
                                        <div className="col-sm-9">
                                            <input disabled={user?.roleCode === "ADMIN" ? true : false} name='coverImage' onChange={(event) => handleOnChangeFile(event)} accept='.pdf' type="file" className="form-control form-file" />
                                        </div>
                                    </div>
                                    {
                                        inputValues.file &&
                                        <div>
                                            <label className="block text-lg font-semibold mb-2">Display certification Profile</label>
                                            <iframe width={'100%'} height={'700px'} src={inputValues.file}></iframe>
                                        </div>
                                    }
                                </div>
                                {
                                    user.roleCode !== "ADMIN" &&
                                    <button onClick={() => handleSaveCompany()} type="button"  className='btn gradient-btn'>
                                        <i className="ti-file"> Save</i>
                                    </button>
                                }
                            </form>
                        </div>
                    </div>
                </div>
                {
                    inputValues.isOpen === true &&
                    <Lightbox mainSrc={inputValues.imageClick}
                              onCloseRequest={() => setInputValues({ ...inputValues, ["isOpen"]: false })}
                    />
                }
            </div>
            {isLoading &&
                <Modal isOpen='true' centered contentClassName='closeBorder' >

                    <div style={{
                        position: 'absolute', right: '50%',
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Spinner animation="border"  ></Spinner>
                    </div>

                </Modal>
            }
        </>
    )
}

export default AddCompany
