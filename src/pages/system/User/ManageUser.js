import React, { useEffect, useState } from 'react';
import { getAllUsers, BanUserService, UnbanUserService } from '../../../service/userService';
import moment from 'moment';
import { PAGINATION } from '../../../util/constant';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommonUtils from '../../../util/CommonUtils';
import { Input } from 'antd';

const ManageUser = () => {

    const [user, setUser] = useState({})
    const [dataUser, setdataUser] = useState([]);
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState(0)
    const [search,setSearch] = useState('')
    const [total, setTotal] = useState(0)
    const fetchAllUser = async () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setUser(userData);

        let res = await getAllUsers({
            limit: PAGINATION.pagerow,
            offset: 0,
            search: CommonUtils.removeSpace(search)
        });
        if (res && res.errCode === 0) {
            setnumberPage(0);
            setdataUser(res.data);
            setCount(Math.ceil(res.count / PAGINATION.pagerow));
            setTotal(res.count);
        }
    };

    useEffect(() => {
        fetchAllUser();
    }, [search]);

    const handleChangePage = async (number) => {
        setnumberPage(number.selected);
        let arrData = await getAllUsers({
            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow,
            search: CommonUtils.removeSpace(search)
        });
        if (arrData && arrData.errCode === 0) {
            setdataUser(arrData.data);
            setTotal(arrData.count);
        }
    };

    const handlebanUser = async (event, item) => {
        event.preventDefault();
        let res = {};

        // Call the respective service to ban or unban the user
        if (item.statusCode === 'S1') {
            res = await BanUserService(item.userAccountData.id);
        } else {
            res = await UnbanUserService(item.userAccountData.id);
        }

        // Handle the API response
        if (res && res.errCode === 0) {
            toast.success(res.errMessage);

            // Update the current user status immediately in the UI
            const updatedUsers = dataUser.map(user => {
                if (user.userAccountData.id === item.userAccountData.id) {
                    return {
                        ...user,
                        statusCode: item.statusCode === 'S1' ? 'S0' : 'S1', // Toggle status
                    };
                }
                return user;
            });

            // Set the updated data to display immediately
            setdataUser(updatedUsers);

            // Optionally, re-fetch the list of users to get the most updated data from the server
            let updatedData = await getAllUsers({
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow,
                search: CommonUtils.removeSpace(search),
            });

            if (updatedData && updatedData.errCode === 0) {
                setdataUser(updatedData.data);
                setTotal(updatedData.count);
                setCount(Math.ceil(updatedData.count / PAGINATION.pagerow));
            }
        } else {
            toast.error(res.errMessage);
        }
    };



    const handleSearch = (value) => {
        setSearch(value);
    };

    return (
        <div>
            <div className="col-12 grid-margin">
                <div className="card bg-white p-6 rounded-lg shadow-lg">
                    <div className="card-body">
                        <h4 className="text-lg font-semibold">List of users</h4>
                        <Input.Search
                            onSearch={handleSearch}
                            className="mt-5 mb-5"
                            placeholder="Enter phone number"
                            allowClear
                            enterButton="Search"
                        />
                        <div>Number of users: {total}</div>

                        <div className="table-responsive pt-2">
                            <table className="table w-full border border-gray-300">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2">No</th>
                                    <th className="border border-gray-300 px-4 py-2">Full Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Phone number</th>
                                    <th className="border border-gray-300 px-4 py-2">Gender</th>
                                    <th className="border border-gray-300 px-4 py-2">Date of birth</th>
                                    <th className="border border-gray-300 px-4 py-2">Role</th>
                                    <th className="border border-gray-300 px-4 py-2">Status</th>
                                    <th className="border border-gray-300 px-4 py-2">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {dataUser && dataUser.length > 0 &&
                                    dataUser.map((item, index) => {
                                        let date = item.userAccountData.dob
                                            ? moment.unix(item.userAccountData.dob / 1000).format('DD/MM/YYYY')
                                            : 'Không có thông tin';
                                        return (
                                            <tr key={index} className="bg-white hover:bg-gray-50">
                                                <td className="border border-gray-300 px-4 py-2">{index + 1 + numberPage * PAGINATION.pagerow}</td>
                                                <td className="border border-gray-300 px-4 py-2">{`${item.userAccountData.firstName} ${item.userAccountData.lastName}`}</td>
                                                <td className="border border-gray-300 px-4 py-2">{item.phonenumber}</td>
                                                <td className="border border-gray-300 px-4 py-2">{item.userAccountData.genderData.value}</td>
                                                <td className="border border-gray-300 px-4 py-2">{date}</td>
                                                <td className="border border-gray-300 px-4 py-2">{item.roleData.value}</td>
                                                <td className="border border-gray-300 px-4 py-2">
                            <span
                                className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                                    item.statusCode === 'S1' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                                }`}
                            >
                              {item.statusAccountData.value}
                            </span>
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    <Link className="text-blue-600 hover:underline" to={`/admin/edit-user/${item.userAccountData.id}/`}>Edit</Link>
                                                    &nbsp;&nbsp;
                                                    {user.id !== item.id && (
                                                        <a
                                                            href="#"
                                                            onClick={(event) => handlebanUser(event, item)}
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            {item.statusCode === 'S1' ? 'Ban' : 'Unban'}
                                                        </a>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                                {dataUser && dataUser.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="text-center py-4">
                                            No data available
                                        </td>
                                    </tr>
                                )}
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
    );
};

export default ManageUser;
