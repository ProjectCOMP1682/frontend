import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { paymentOrderSuccessService } from '../../../service/userService';
import { useLocation, useNavigate } from 'react-router-dom';

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function PaymentSuccess(props) {
    let query = useQuery();
    const [message, setMessage] = useState("Processing");

    useEffect(() => {
        let orderData = JSON.parse(localStorage.getItem("orderData"));
        if (orderData) {
            orderData.paymentId = query.get("paymentId");
            orderData.token = query.get("token");
            orderData.PayerID = query.get("PayerID");
            createNewOrder(orderData);
        } else {
            setMessage("Invalid order information");
        }
    }, []);

    let createNewOrder = async (data) => {
        let res = await paymentOrderSuccessService(data);
        if (res && res.errCode === 0) {
            toast.success(res.errMessage);
            localStorage.removeItem("orderData");
            setMessage("Congratulations, you have successfully purchased posts.");
        } else {
            toast.error(res.errMessage);
        }
    };

    const navigate = useNavigate();

    return (
        <div className="h-[50vh] flex flex-col items-center justify-center">
            <p>{message}</p>
            {message === 'Congratulations, you have successfully purchased posts.' && (
                <div className="mt-5">
                    <button
                        onClick={() => navigate("/admin/add-post")}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                    >
                        Post now
                    </button>
                </div>
            )}
        </div>
    );
}

export default PaymentSuccess;
