import React from 'react'
import { useEffect, useState } from 'react';
import { getDetailCvService } from '../../../service/cvService';


import { useNavigate} from 'react-router-dom';
import { useParams } from "react-router-dom";


const UserCv = () => {
    const user = JSON.parse(localStorage.getItem("userData"))
    const { id } = useParams();
    const [dataCV, setdataCV] = useState({
        userCvData: {
            firstName: '',
            lastName: ''
        },
        file: {
            data: ''
        }
    });
    useEffect(() => {
        if (id) {
            let fetchCV = async () => {
                let res = await getDetailCvService(id,user.roleCode)
                if (res && res.errCode === 0) {
                    setdataCV(res.data)
                }
            }
            fetchCV()

        }


    }, [])


    const navigate = useNavigate();

    return (


            <div className="">
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <div className="mb-4">
                        <div onClick={() => navigate(-1)} className='btn gradient-btn' >
                            Back
                        </div>
                        <h4 className="card-title">Introduce yourself</h4>
                        <blockquote class="blockquote blockquote-primary">
                            <p>{dataCV.description}</p>
                            <footer class="blockquote-footer"><cite title="Source Title">{dataCV.userCvData.firstName + " " + dataCV.userCvData.lastName}</cite></footer>
                        </blockquote>

                    </div>
                        <div className="bg-white shadow-md rounded-lg p-4">
                        <h4 className="card-title">FILE CV</h4>
                        <iframe width={'100%'} height={'700px'} src={dataCV.file}></iframe>
                    </div>
                </div>

            </div>



        </div>
    )
}

export default UserCv
