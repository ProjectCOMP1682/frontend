import React from 'react'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getStatisticalTypePost, getStatisticalPackagePost, getStatisticalPackageCv } from '../../service/userService';
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
    const [dataStatisticalPackagePost, setDataStatisticalPackagePost] = useState([])
    const [dataStatisticalPackageCv, setDataStatisticalPackageCv] = useState([])
    const [dataSum,setDataSum] = useState(0)
    const [dataSumCv,setDataSumCv] = useState(0)
    const [formDatePost,setFormDatePost] = useState(formattedToday)
    const [formDateCv,setFormDateCv] = useState(formattedToday)
    const [toDatePost,setToDatePost] = useState(formattedToday)
    const [toDateCv,setToDateCv] = useState(formattedToday)
    const [countCv, setCountCv] = useState('')
    const [numberPageCv, setnumberPageCv] = useState('')

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
    // Hàm để lấy ngày từ localStorage hoặc sử dụng giá trị mặc định nếu không có
    const getSavedDates = () => {
        const savedFromDate = localStorage.getItem('fromDate');
        const savedToDate = localStorage.getItem('toDate');

        return savedFromDate && savedToDate ? [savedFromDate, savedToDate] : [null, null];
    };
    let getStatistical = async(fromDate,toDate,type='packageCv') => {
        let arrData = []
        if (type==='packagePost') {
            setFormDatePost(fromDate)
            arrData = await getStatisticalPackagePost({
                fromDate,
                toDate,
                limit: PAGINATION.pagerow,
                offset: 0,
            })
            if (arrData && arrData.errCode === 0) {
                setDataStatisticalPackagePost(arrData.data)
                setDataSum(arrData.sum)
                setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
            }
        } else {
            setFormDateCv(fromDate)
            arrData = await getStatisticalPackageCv({
                fromDate,
                toDate,
                limit: PAGINATION.pagerow,
                offset: 0,
            })
            if (arrData && arrData.errCode === 0) {
                setDataStatisticalPackageCv(arrData.data)
                setDataSumCv(arrData.sum)
                setCountCv(Math.ceil(arrData.count / PAGINATION.pagerow))
            }
        }
    }
    let onDatePicker = async (values, type = '') => {
        let fromDate = "2000-01-01"; // Ngày mặc định nếu không có ngày chọn
        let toDate = formattedToday;  // Ngày kết thúc mặc định là hôm nay

        // Cập nhật lại ngày từ picker
        if (values) {
            fromDate = values[0].format('YYYY-MM-DD');
            toDate = values[1].format('YYYY-MM-DD');
            // Lưu trữ vào localStorage
            localStorage.setItem('fromDate', fromDate);
            localStorage.setItem('toDate', toDate);
        } else {
            let fromDate = "2000-01-01"; // Ngày mặc định nếu không có ngày chọn
            let toDate = formattedToday;  // Ngày kết thúc mặc định là hôm nay
            // Lưu trữ vào localStorage
            localStorage.setItem('fromDate', fromDate);
            localStorage.setItem('toDate', toDate);
        }

        try {
            // Fetch data với khoảng thời gian đã chọn

                if (user.roleCode !== "ADMIN") {
                let arrData = await getStatisticalCv({
                    ...sendParams,
                    fromDate,
                    toDate,
                    offset: 0
                });
                if (arrData && arrData.errCode === 0) {
                    setDataCv(arrData.data);
                    setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
                }
                } else {
                    getStatistical(fromDate, toDate, type);
                }
        } catch (error) {
            console.error("Error in onDatePicker:", error);
        }
    };
    let getStatisticalChangePage= async(type,number) => {
        const [fromDate, toDate] = getSavedDates();
        let arrData = []
        if (type ==='packagePost') {
            setnumberPage(number.selected)
            arrData = await getStatisticalPackagePost({
                fromDate,
                toDate,
                limit: PAGINATION.pagerow,
                offset: number.selected * PAGINATION.pagerow
            })
            if (arrData && arrData.errCode === 0) {
                setDataStatisticalPackagePost(arrData.data)
                setDataSum(arrData.sum)

                setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
            }
        } else {
            setnumberPageCv(number.selected)
            arrData = await getStatisticalPackageCv({
                fromDate,   // Đảm bảo ngày đã chọn được truyền vào
                toDate ,     // Đảm bảo ngày đã chọn được truyền vào
                limit: PAGINATION.pagerow,
                offset: number.selected * PAGINATION.pagerow
            })
            if (arrData && arrData.errCode === 0) {
                setDataStatisticalPackageCv(arrData.data)
                setDataSumCv(arrData.sum)
                setCountCv(Math.ceil(arrData.count / PAGINATION.pagerow))
            }
        }
    }
    let handleChangePage = async (number, type = '') => {
        // Lấy ngày đã chọn từ localStorage
        const [fromDate, toDate] = getSavedDates();

        if (user.roleCode !== "ADMIN") {
            setnumberPage(number.selected);
            let arrData = await getStatisticalCv({
                ...sendParams,
                limit: PAGINATION.pagerow,
                offset: number.selected * PAGINATION.pagerow,
                fromDate,   // Đảm bảo ngày đã chọn được truyền vào
                toDate      // Đảm bảo ngày đã chọn được truyền vào
            });
            if (arrData && arrData.errCode === 0) {
                setDataCv(arrData.data);
            }
        } else {
            getStatisticalChangePage(type, number);
        }
    };
    let handleOnClickExport =async (type) =>{
        let res = []
        if (type === 'packagePost') {
            res = await getStatisticalPackagePost({
                fromDate: formDatePost,
                toDate: toDatePost,
                limit: '',
                offset: ''
            })
        }
        else {
            res = await getStatisticalPackageCv({
                fromDate: formDateCv,
                toDate: toDateCv,
                limit: '',
                offset: ''
            })
        }
        if(res.errCode === 0){
            let formatData = res.data.map(item=> {
                let obj = {
                    'Package ID': item.id,
                    'Package Name': item.name,
                    'Package Type':item.isHot === 1 ? 'Featured Type': 'Normal Type',
                    'Quantity': +item.count,
                    'Total': +item.total+'USD'
                }
                if (type !== 'packagePost') delete obj['Package type']
                return obj
            })
            if (type === 'packagePost') {
                await CommonUtils.exportExcel(formatData,"Statistical Package Post","Statistical Package Post")
            }
            else {
                await CommonUtils.exportExcel(formatData,"Statistical Package Candiate","Statistical Package Candiate")
            }
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
    useEffect(() => {
        try {
            let fetchData = async () => {
                const userData = JSON.parse(localStorage.getItem('userData'));
                const defaultFromDate = "2000-01-01";  // Default fromDate (can be changed to your desired start date)
                const defaultToDate = formattedToday;  // Default toDate is today's date

                if (userData.roleCode !== "ADMIN") {
                    // Fetch data without date filtering or using default dates
                    let arrData = await getStatisticalCv({
                        ...sendParams,
                        companyId: userData.companyId,
                        fromDate: defaultFromDate,
                        toDate: defaultToDate
                    });

                    if (arrData && arrData.errCode === 0) {
                        setDataCv(arrData.data);
                        setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
                    }
                } else {
                    // For admins, you can also set the default date range as necessary
                    getStatistical(defaultFromDate, defaultToDate, 'packagePost');
                    getStatistical(defaultFromDate, defaultToDate, 'packageCv');
                }
            };

            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, []); // Runs only once on component mount

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
            </div> {
            user.roleCode === 'ADMIN' &&
            <>
            <div className="col-12 grid-margin">
                <div className="card bg-white p-6 rounded-lg shadow-lg">
                    <div className="card-body">
                        <h4 className="text-xl font-semibold">Revenue statistics table of post packages</h4>
                        <div className="mb-4">
                            <RangePicker
                                onChange={(values)=>onDatePicker(values,'packagePost')}
                                format={'DD/MM/YYYY'}
                                className="mt-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300 ease-in-out"
                            />
                            <button
                                className="float-right bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 flex items-center"
                                onClick={() => handleOnClickExport('packagePost')}
                            >
                                Excel Export<i className="fa-solid fa-file-excel ml-2"></i>
                            </button>

                        </div>
                        <div className="overflow-x-auto pt-2">
                            <table className="table w-full border border-gray-300">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2">
                                            No
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Package name
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Package code
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Package type
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Quantity sold
                                        </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Revenue
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {dataStatisticalPackagePost && dataStatisticalPackagePost.length > 0 &&
                                        dataStatisticalPackagePost.map((item, index) => {

                                            return (
                                                <tr key={index} className="bg-white hover:bg-gray-50">
                                                    <td className="border border-gray-300 px-4 py-2">{index + 1 + numberPage * PAGINATION.pagerow}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.isHot == 0 ? "Normal type" : "Featured type"}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.count}</td>
                                                    <td className="border border-gray-300 px-4 py-2" style={{ textAlign: 'right' }}>{item.total} USD</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                                {
                                    dataStatisticalPackagePost && dataStatisticalPackagePost.length == 0 && (
                                        <div style={{ textAlign: 'center'}}>

                                            No data available

                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        {
                            dataStatisticalPackagePost && dataStatisticalPackagePost.length > 0 &&
                            <div className="flex justify-end mr-4 text-lg font-semibold text-blue-600 bg-gray-100 p-2 rounded shadow-md">
                                Total revenue: <span className="ml-2 text-green-500">{dataSum} USD</span>
                            </div>
                        }
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
                <div className="col-12 grid-margin">
                    <div className="card bg-white p-6 rounded-lg shadow-lg">
                        <div className="card-body">
                            <h4 className="text-xl font-semibold">Revenue statistics table of packages purchased to view candidates</h4>
                            <div className="mb-4">
                                <RangePicker
                                    onChange={(values)=>onDatePicker(values,'packageCv')}
                                    format={'DD/MM/YYYY'}
                                    className="mt-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300 ease-in-out"
                                />
                                <button
                                    className="float-right bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 flex items-center"
                                    onClick={() => handleOnClickExport('packagePost')}
                                >
                                    Excel Export <i className="fa-solid fa-file-excel ml-2"></i>
                                </button>

                            </div>


                            <div className="overflow-x-auto pt-2">
                                <table className="table w-full border border-gray-300">
                                    <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2">
                                           No
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Package name
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Package code
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Quantity sold
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Revenue
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {dataStatisticalPackageCv && dataStatisticalPackageCv.length > 0 &&
                                        dataStatisticalPackageCv.map((item, index) => {

                                            return (
                                                <tr key={index} className="bg-white hover:bg-gray-50">
                                                    <td className="border border-gray-300 px-4 py-2">{index + 1 + numberPageCv * PAGINATION.pagerow}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.count}</td>
                                                    <td className="border border-gray-300 px-4 py-2" style={{ textAlign: 'right' }}>{item.total} USD</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                                {
                                    dataStatisticalPackageCv && dataStatisticalPackageCv.length == 0 && (
                                        <div style={{ textAlign: 'center'}}>

                                            No data available

                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        {
                            dataStatisticalPackageCv && dataStatisticalPackageCv.length > 0 &&

                            <div className="flex justify-end mr-4 text-lg font-semibold text-blue-600 bg-gray-100 p-2 rounded shadow-md">
                                Total revenue: <span className="ml-2 text-green-500">{dataSumCv} USD</span>
                            </div>
                        }
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
            </>

        }
        </>
    );

}

export default AdminDashboard