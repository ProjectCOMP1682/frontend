import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {paymentOrderSuccessServiceCv} from '../../../service/userService'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams,
    useLocation,
    useNavigate
} from "react-router-dom";


function useQuery() {
    const { search } = useLocation();
    
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

function PaymentSuccessCv(props) {
    let query = useQuery();
    const [message, setMessage] = useState("Processing")
    useEffect(() => {
        let orderData =  JSON.parse(localStorage.getItem("orderCvData"))
        if(orderData){
            orderData.paymentId = query.get("paymentId")
            orderData.token = query.get("token")
            orderData.PayerID = query.get("PayerID")
            createNewOrder(orderData)
        }
        else {
            setMessage("Invalid order information")
        }
    }, [])
    let createNewOrder = async (data) =>{
        let res = await paymentOrderSuccessServiceCv(data)
        if(res && res.errCode == 0){
            toast.success(res.errMessage)
            localStorage.removeItem("orderCvData")
            setMessage("Congratulations on your successful purchase of the candidate search package.")
        }else{
            toast.error(res.errMessage)
        }
    }
    const navigate = useNavigate();
    return (
        <div className="h-[50vh] flex flex-col items-center justify-center">
            <p>{message}</p>
            {message === 'Congratulations on your successful purchase of the candidate search package.' && (
                <div className="mt-5">
                    <button
                        onClick={() => navigate("/admin/list-candiate")}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                    >
                        Find candidates now
                    </button>
                </div>
            )}
        </div>


    );
}

export default PaymentSuccessCv;
