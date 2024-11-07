import React, { useState } from 'react';

function ReupPostModal(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [timeEnd, setTimeEnd] = useState('');

    // Hàm xử lý thay đổi thời gian kết thúc
    const handleOnChangeDatePicker = (event) => {
        setTimeEnd(new Date(event.target.value).getTime());
    };

    // Hàm xử lý khi click "Hoàn thành"
    const handlePost = () => {
        setIsLoading(true);
        props.handleFunc(timeEnd); // Truyền timeEnd cho hàm xử lý
        setIsLoading(false);
        props.onHide(); // Đóng modal
    };

    // Nếu không mở modal thì không render gì
    if (!props.isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <p className="text-center text-lg font-semibold">Please select the closing date of the recruitment</p>



                {/* Chọn thời gian kết thúc */}
                <label className="block text-sm font-medium text-gray-700">Select end time</label>
                <input
                    type="date"
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
                    onChange={handleOnChangeDatePicker}
                    value={timeEnd ? new Date(timeEnd).toISOString().slice(0, 10) : ''}
                />

                {/* Chân modal */}
                <div className="mt-4 flex justify-between">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                        onClick={handlePost}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Done'}
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        onClick={props.onHide}
                    >
                        Cancel
                    </button>
                </div>
            </div>

            {isLoading && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-60">
                    <div className="animate-spin border-4 border-t-4 border-blue-500 border-solid w-8 h-8 rounded-full"></div>
                </div>
            )}
        </div>
    );
}

export default ReupPostModal;
