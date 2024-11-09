import React from 'react'
import { useEffect, useState } from 'react';
import { getAllUserByCompanyIdService, QuitCompanyService } from '../../../service/userService';
import moment from 'moment';
import { PAGINATION } from '../../../util/constant';
import ReactPaginate from 'react-paginate';

import { toast } from 'react-toastify';
const ManageEmployer = () => {
    const [user, setUser] = useState({})
    const [dataUser, setdataUser] = useState([]);
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setUser(userData)
        if (userData && userData.companyId) {
            fetchAllUser(userData.companyId)
        }


    }, [])
    let fetchAllUser = async (userId) => {
        let res = await getAllUserByCompanyIdService({
            limit: PAGINATION.pagerow,
            offset: 0,
            companyId: userId
        })
        if (res && res.errCode === 0) {

            setdataUser(res.data);
            setCount(Math.ceil(res.count / PAGINATION.pagerow))
        }
    }

    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getAllUserByCompanyIdService({


            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow,
            companyId: user.companyId

        })
        if (arrData && arrData.errCode === 0) {
            setdataUser(arrData.data)

        }
    }
    let handleQuitCompany = async (userId) => {
        let res = await QuitCompanyService({
            userId: userId
        })
        if (res && res.errCode === 0) {
            toast.success("Successfully quit your job !")
            let response = await getAllUserByCompanyIdService({
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow,
                companyId: user.companyId
            })
            if (response && response.errCode === 0) {

                setdataUser(response.data);
                setCount(Math.ceil(response.count / PAGINATION.pagerow))
            }
        } else {
            toast.error(res.errMessage)
        }
    }
    return (
        <div>
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="text-lg font-semibold">HR Staff List</h4>

                        <div className="table-responsive pt-2">
                            <table className="table  w-full border border-gray-300">
                                <thead>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">
                                            No
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                            Full Name
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                            Phone number
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                            Gender
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                            Date of birth
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                           Role
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                         Status
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataUser && dataUser.length > 0 &&
                                        dataUser.map((item, index) => {
                                            let date = moment.unix(item.dob / 1000).format('DD/MM/YYYY')
                                            return (
                                                <tr key={index} className="bg-white hover:bg-gray-50">
                                                    <td className="border border-gray-300 px-4 py-2">{index + 1 + numberPage * PAGINATION.pagerow}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{`${item.firstName} ${item.lastName}`}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.userAccountData.phonenumber}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.genderData.value}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{date}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.userAccountData.roleData.value}</td>
                                                    <td className="border border-gray-300 px-4 py-2"><label className={item.userAccountData.statusCode === 'S1' ? 'badge badge-success' : 'badge badge-danger'}>{item.userAccountData.statusAccountData.value}</label></td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                       {user.id != item.id &&  <a onClick={() => handleQuitCompany(item.id)} style={{ color: '#4B49AC', cursor: 'pointer' }} >Stop working</a>}
                                                        &nbsp; &nbsp;
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <ReactPaginate
                        forcePage={numberPage}
                        previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        pageCount={count}
                        marginPagesDisplayed={3}
                        containerClassName="flex justify-center space-x-2 py-3"
                        pageClassName="flex items-center justify-center w-10 h-10 border border-gray-300 rounded"
                        pageLinkClassName="flex items-center justify-center w-full h-full text-gray-700 hover:bg-gray-200"
                        previousClassName="flex items-center justify-center w-10 h-10 border border-gray-300 rounded"
                        previousLinkClassName="flex items-center justify-center w-full h-full text-gray-700 hover:bg-gray-200"
                        nextClassName="flex items-center justify-center w-10 h-10 border border-gray-300 rounded"
                        nextLinkClassName="flex items-center justify-center w-full h-full text-gray-700 hover:bg-gray-200"
                        breakClassName="flex items-center justify-center w-10 h-10 border border-gray-300 rounded"
                        breakLinkClassName="flex items-center justify-center w-full h-full text-gray-700 hover:bg-gray-200"
                        activeClassName="bg-[#9873ff] text-white"
                        onPageChange={handleChangePage}
                    />
                </div>

            </div>
        </div>
    )
}

export default ManageEmployer
