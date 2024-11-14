import React from 'react'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {getStatisticalTypePost} from "../../service/userService";
import {getStatisticalCv} from "../../service/cvService";
import {PAGINATION} from "../../util/constant";
import { PieChart } from 'react-minimal-pie-chart';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { DatePicker } from 'antd';
import CommonUtils from "../../util/CommonUtils";
const AdminDashboard = () => {
    const { RangePicker } = DatePicker;
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = yyyy + '-' + mm + '-' + dd;
    const [user, setUser] = useState({})
    const [dataStatisticalTypePost, setDataStatisticalTypePost] = useState([])
    const [dataCv, setDataCv] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')

    let sendParams = {
        limit: PAGINATION.pagerow,
        offset: 0,
        fromDate: formattedToday,
        toDate: formattedToday,
        companyId: user.companyId
    }

    const getData = async (limit) => {
        let res = await getStatisticalTypePost(limit)
        let other = res.totalPost
        let otherPercent = 100
        let color = ['red', 'yellow', 'green', 'blue', 'orange']
        if (res.errCode === 0) {
            let newdata = res.data.map((item, index) => {
                other -= item.amount
                otherPercent -= Math.round((item.amount / res.totalPost * 100) * 100) / 100
                return {
                    title: item.postDetailData.jobTypePostData.value,
                    value: Math.round((item.amount / res.totalPost * 100) * 100) / 100,
                    color: color[index],
                    amount: item.amount
                }
            })
            if (other > 0) {
                newdata.push({ title: "Other fields", value: Math.round(otherPercent * 100) / 100, color: color[4], amount: other })
            }
            setDataStatisticalTypePost(newdata)
        }
        else toast.error(res.message)
    }

    let onDatePicker = async (values,type='') => {
        let fromDate = formattedToday
        let toDate = formattedToday
        if (values) {
            fromDate = values[0].format('YYYY-MM-DD')
            toDate = values[1].format('YYYY-MM-DD')
        }

            let arrData = await getStatisticalCv({
                ...sendParams,
                fromDate,
                toDate,
                offset: 0
            })
            if (arrData && arrData.errCode === 0) {
                setDataCv(arrData.data)
                setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
            }

    }

    let handleChangePage = async (number,type='') => {

            setnumberPage(number.selected)
            let arrData = await getStatisticalCv({
                ...sendParams,
                limit: PAGINATION.pagerow,
                offset: number.selected * PAGINATION.pagerow
            })
            if (arrData && arrData.errCode === 0) {
                setDataCv(arrData.data)
            }

    }
    useEffect(() => {
        const fetchData = async () => {
            const userData = JSON.parse(localStorage.getItem('userData'));
            setUser(userData);
            await getData(4);
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="container mx-auto px-6 py-12">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row items-center justify-between mb-14">
                    <div className="lg:w-2/3 text-center lg:text-left">
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-3">Wellcome {user.firstName + " " + user.lastName}</h1>
                        <p className="text-2xl text-gray-600 uppercase font-light tracking-wide">Job statistics chart</p>
                    </div>

                </div>

                {/* Main Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
                    {/* Statistic Box */}
                    <div className="bg-white rounded-2xl shadow-3xl hover:shadow-2xl transition-all duration-300 p-8 transform hover:scale-105">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Statistics of jobs</h2>
                        <div className="space-y-6">
                            {dataStatisticalTypePost.map((item, index) => (
                                <div className="flex items-center group" key={index}>
                                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="ml-4 text-xl text-gray-700 group-hover:text-gray-900 font-medium">{item.title}: <span className="font-semibold">{item.amount} posts</span></span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pie Chart Section */}
                    <div className="flex justify-center items-center">
                        <div className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 p-8 rounded-2xl shadow-3xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                            <PieChart
                                label={({ x, y, dx, dy, dataEntry }) => (
                                    <text
                                        x={x - 5}
                                        y={y}
                                        dx={dx}
                                        dy={dy}
                                        dominant-baseline="central"
                                        textAnchor="middle"
                                        className="text-[8px] font-light text-white"
                                    >
                                        {`${dataEntry.value}%`}
                                    </text>
                                )}
                                data={dataStatisticalTypePost}
                            />
                        </div>
                    </div>
                </div>
                {
                    user.companyId &&
                    <div className="col-12 grid-margin">
                        <div className="card bg-white p-6 rounded-lg shadow-lg">
                            <div className="card-body">
                                <h4 className="text-xl font-semibold">CV quantity statistics</h4>
                                <div className="mb-4">
                                <RangePicker
                                    onChange={onDatePicker}
                                    format={'DD/MM/YYYY'}
                                    className="mt-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300 ease-in-out"
                                />
                                </div>
                                <div className="overflow-x-auto pt-2">
                                    <table className="table w-full border border-gray-300">
                                        <thead>
                                        <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2">
                                               No
                                            </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Post Name
                                            </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Post code
                                            </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Posted by
                                            </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Number of CVs
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {dataCv && dataCv.length > 0 &&
                                            dataCv.map((item, index) => {

                                                return (
                                                    <tr key={index} className="bg-white hover:bg-gray-50">
                                                        <td className="border border-gray-300 px-4 py-2">{index + 1 + numberPage * PAGINATION.pagerow}</td>
                                                        <td className="border border-gray-300 px-4 py-2">{item.postDetailData.name}</td>
                                                        <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                                                        <td className="border border-gray-300 px-4 py-2">{item.userPostData.firstName + " " + item.userPostData.lastName}</td>
                                                        <td className="border border-gray-300 px-4 py-2">{item.total}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                    {
                                        dataCv && dataCv.length == 0 && (
                                            <div style={{ textAlign: 'center' }}>

                                                No data available

                                            </div>
                                        )
                                    }
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
                }
            </div>
        </>
    );

}

export default AdminDashboard
