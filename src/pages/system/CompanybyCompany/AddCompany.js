import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import CommonUtils from '../../../util/CommonUtils';
import { getDetailCompanyByUserId, createCompanyService,updateCompanyService } from '../../../service/userService';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Spinner, Modal } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';

const AddCompany = () => {
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
        const name = event.target.getAttribute('name');
        if (!inputValues.imageReview && !inputValues.coverImageReview) return;
        setInputValues({ ...inputValues, imageClick: name === 'cover' ? inputValues.coverImage : inputValues.imageReview, ["isOpen"]: true });
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
        });
    }


    return (
        <>
            <div className="">
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <div className="mb-4">

                            <h4 className="text-lg font-semibold">
                         Add new company
                            </h4>
                            <br />
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-medium">Company name</label>
                                        <input

                                            value={inputValues.name}
                                            onChange={(event) => handleOnChange(event)}
                                            name="name"
                                            type="text"
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium">Phone number</label>
                                        <input

                                            value={inputValues.phonenumber}
                                            onChange={(event) => handleOnChange(event)}
                                            name="phonenumber"
                                            type="number"
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium">Tax code</label>
                                        <input

                                            value={inputValues.taxnumber}
                                            onChange={(event) => handleOnChange(event)}
                                            name="taxnumber"
                                            type="text"
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium">Number of employees</label>
                                        <input

                                            value={inputValues.amountEmployer}
                                            onChange={(event) => handleOnChange(event)}
                                            name="amountEmployer"
                                            type="number"
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium">Address</label>
                                        <input

                                            value={inputValues.address}
                                            onChange={(event) => handleOnChange(event)}

                                            name="address"
                                            type="text"
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium">Website link</label>
                                        <input


                                            value={inputValues.website}
                                            onChange={(event) => handleOnChange(event)}

                                            name="website"
                                            type="text"
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium">Avatar</label>
                                        <div className="col-sm-9">
                                            <div >
                                                <input
                                                       name='image'
                                                       onChange={(event) => handleOnChangeImage(event)} accept='image/*' type="file"
                                                       className="w-full h-64 bg-cover bg-center cursor-pointer"/>

                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block font-medium">Display avatar</label>
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
                                        <label className="block font-medium">Cover image</label>
                                        <div className="col-sm-9">

                                            <input  name='coverImage' onChange={(event) => handleOnChangeImage(event)} accept='image/*' type="file" className="w-full h-64 bg-cover bg-center cursor-pointer"  />


                                        </div>
                                    </div>
                                    <div>
                                        <label className="block font-medium">Display cover image</label>
                                        <div className="col-sm-9">
                                            <div
                                                name='cover2'
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
                                </div>

                                {/* Add more form fields as necessary, similar to above */}



                                    <button onClick={() => handleSaveCompany()} type="button"  className='btn gradient-btn'>
                                        <i className="ti-file"> Save</i>

                                    </button>

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

export default AddCompany;
