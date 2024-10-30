import React from 'react'
import { useEffect, useState } from 'react';
import { getListNoteByPost } from '../../../service/userService';
import moment from 'moment';
import { PAGINATION } from '../../../util/constant';
import ReactPaginate from 'react-paginate';
import {useNavigate, useParams} from "react-router-dom";


const NotePost = () => {
    const user = JSON.parse(localStorage.getItem("userData"))
    const [dataNotePost, setdataNotePost] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            try {
                let fetchData = async () => {
                    let arrData = await getListNoteByPost({
                        limit: PAGINATION.pagerow,
                        offset: 0,
                        id: id
                    })
                    if (arrData && arrData.errCode === 0) {
                        setdataNotePost(arrData.data)
                        setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
                    }
                }
                fetchData();
            } catch (error) {
                console.log(error)
            }
        }


    }, [])

    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getListNoteByPost({


            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow,
            id: id

        })
        if (arrData && arrData.errCode === 0) {
            setdataNotePost(arrData.data)

        }
    }

    return (

        <div>

            <div className="col-12 grid-margin">
                <div className="w-full">

                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div onClick={() => navigate(-1)} className='btn gradient-btn' >
                            Back
                        </div>
                        <h4 className="text-lg font-semibold">Post notes details</h4>

                        <div className="overflow-x-auto pt-2">
                            <table  className="table w-full border border-gray-300">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">
                                            No
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Note taker
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            No note taker
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Note
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Time noted
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataNotePost && dataNotePost.length > 0 &&
                                        dataNotePost.map((item, index) => {

                                            return (
                                                <tr key={index} className="bg-white hover:bg-gray-50">
                                                    <td className="border border-gray-300 px-4 py-2">{index + 1 + numberPage * PAGINATION.pagerow}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.userNoteData.firstName + " " + item.userNoteData.lastName}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.userNoteData.id}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.note}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{moment(item.createdAt).format('DD-MM-YYYY HH:mm:ss')}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                                    { dataNotePost && dataNotePost.length==0 && <div style={{textAlign:'center'}}>No data available</div> }
                        </div>
                    </div>

                </div>

            </div>



        </div>
    )
}

export default NotePost
