import React from 'react'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {getStatisticalTypePost} from "../../service/userService";
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
                newdata.push({ title: "Lĩnh vực khác", value: Math.round(otherPercent * 100) / 100, color: color[4], amount: other })
            }
            setDataStatisticalTypePost(newdata)
        }
        else toast.error(res.message)
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
                                    <span className="ml-4 text-xl text-gray-700 group-hover:text-gray-900 font-medium">{item.title}: <span className="font-semibold">{item.amount} bài</span></span>
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
            </div>
        </>
    );

}

export default AdminDashboard
