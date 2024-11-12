import React from 'react'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { PAGINATION } from '../../../util/constant';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { DatePicker } from 'antd';
import CommonUtils from '../../../util/CommonUtils';
import { getHistoryTradeCv } from '../../../service/userService';
const HistoryTradeCv = () => {
    const { RangePicker } = DatePicker;
    const [user, setUser] = useState({})
    const [dataSum,setDataSum] = useState(0)
    const [fromDatePost,setFromDatePost] = useState('')
    const [toDatePost,setToDatePost] = useState('')



    const [data, setData] = useState([])
    const [count, setCount] = useState('')

    const [numberPage, setnumberPage] = useState('')

    let sendParams = {
        limit: PAGINATION.pagerow,
        offset: 0,
        fromDate: '',
        toDate: '',
        companyId: user.companyId
    }

    let getData = async (params) => {

        let arrData = await getHistoryTradeCv(params)
        if (arrData && arrData.errCode === 0) {
            setData(arrData.data)
            setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
        }
    }

    let onDatePicker = async (values) => {
        let fromDate =''
        let toDate = ''
        if (values) {
            fromDate = values[0].format('YYYY-MM-DD')
            toDate = values[1].format('YYYY-MM-DD')
        }
        getData({
            ...sendParams,
            fromDate,
            toDate,
            offset: 0
        })
        setFromDatePost(fromDate)
        setToDatePost(toDate)
    }

    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        getData({
            ...sendParams,
            offset: number.selected * PAGINATION.pagerow
        })
    }
    let handleOnClickExport =async ()=>{
        let res = await getHistoryTradeCv({
            ...sendParams,
            limit: '',
            offset: '',
            fromDate: fromDatePost,
            toDate: toDatePost
        })
        if(res.errCode === 0){
            let formatData = res.data.map((item)=> {
                let obj = {
                    'Package name': item.packageOrderCvData.name,
                    'Transaction code': item.id,
                    'Quantity purchased': item.amount,
                    'Total Price': item.packageOrderCvData.price + " USD",
                    'Purchaser': item.userOrderCvData.firstName + ' ' + item.userOrderCvData.lastName,
                    'Time of purchase': moment(item.createdAt).format('DD-MM-YYYY HH:mm:ss')
                }
                return obj
            })
            await CommonUtils.exportExcel(formatData,"History Trade Cv","History Trade Cv")
        }
        
    }

    useEffect(() => {
        const fetchData = async () => {
            const userData = JSON.parse(localStorage.getItem('userData'));
            setUser(userData);


            await getData({ ...sendParams, companyId: userData.companyId });
        };

        fetchData();
    }, []);

    return (
        <div className="col-12 grid-margin">
            <div className="card bg-white p-6 rounded-lg shadow-lg">
                <div className="card-body">
                    <div className="mb-4">
                        <h4 className="text-xl font-semibold">Payment history</h4>
                        <button
                            onClick={() => handleOnClickExport()}
                            className="float-right bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out flex items-center space-x-2"
                        >
                            <span>Export excel</span>
                            <i className="fa-solid fa-file-excel text-lg text-green-400"></i>
                        </button>

                        <RangePicker
                            onChange={onDatePicker}
                            format={'DD/MM/YYYY'}
                            className="mt-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300 ease-in-out"
                        />



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

                                        Transaction code
                                            </th>
                                    <th className="border border-gray-300 px-4 py-2">

                                        Quantity purchased
                                            </th>
                                    <th className="border border-gray-300 px-4 py-2">

                                    Total price
                                            </th>
                                    <th className="border border-gray-300 px-4 py-2">

                                        Purchaser
                                            </th>
                                    <th className="border border-gray-300 px-4 py-2">

                                        Time of purchase
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data && data.length > 0 &&
                                            data.map((item, index) => {

                                                return (
                                                    <tr key={index}  className="bg-white hover:bg-gray-50">
                                                        <td className="border border-gray-300 px-4 py-2">{index + 1 + numberPage * PAGINATION.pagerow}</td>
                                                        <td className="border border-gray-300 px-4 py-2">{item.packageOrderCvData.name}</td>
                                                        <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                                                        <td className="border border-gray-300 px-4 py-2">{item.amount}</td>
                                                        <td className="border border-gray-300 px-4 py-2"  style={{ textAlign: 'right' }}>{item.packageOrderCvData.price} USD</td>
                                                        <td className="border border-gray-300 px-4 py-2">{item.userOrderCvData.firstName + ' ' + item.userOrderCvData.lastName }</td>
                                                        <td className="border border-gray-300 px-4 py-2">{moment(item.createdAt).format('DD-MM-YYYY HH:mm:ss')}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                        {
                                            data && data.length == 0 && (
                                                <div style={{ textAlign: 'center'}}>

                                                    No data available


                                                </div>
                                            )
                                        }
                            </div>
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

    )
}

export default HistoryTradeCv
