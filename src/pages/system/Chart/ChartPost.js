import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getSumByYearPost } from '../../../service/userService';
import Chart from 'chart.js/auto';
import { Col, Row, Select } from 'antd';
function ChartPost() {
    const [valueYear,setValueYear] = useState(new Date().getFullYear())
    const options = {
        legend: { display: false },
        title: {
          display: true,
          text: "Chart Post"
        }
    }
    const currentYear = new Date().getFullYear();

// Tự động tạo yearOptions (5 năm gần đây)
    const yearOptions = Array.from({ length: 10 }, (_, index) => {
        const year = currentYear - index;
        return { value: year, label: year.toString() };
    });

// Tự động tạo defaultMonthModel
    const defaultMonthModel = Array.from({ length: 12 }, (_, index) => ({
        [index + 1]: 0
    })).reduce((acc, cur) => ({ ...acc, ...cur }), {});

// Tự động tạo labelsMonth (tên tháng)
    const labelsMonth = Array.from({ length: 12 }, (_, index) =>
        new Date(0, index).toLocaleString("en-US", { month: "short" })
    );


    const [data,setData] = useState({
        labels: labelsMonth,
        datasets: []
    })

    let getData = async ()=> {
        let res = await getSumByYearPost(valueYear)
        if (res.errCode === 0) {
            let monthModel = { ...defaultMonthModel };
            res.data.forEach((item) => {
              monthModel[item.month] = item.total;
            });
            let newData = []
            for (let key in monthModel) {
                newData.push(monthModel[key])
            }
            setData({
                labels: labelsMonth,
                datasets: [{
                    label: 'USD',
                    data: newData
                }]
            })
        }

    }
    let handleOnChange = (value)=> {
        setValueYear(value)
    }
    useEffect(()=> {
        getData()
    },[valueYear])
    return (
        <div className="col-12 grid-margin">
            <div className="card bg-white p-6 rounded-lg shadow-lg">
                <div className="card-body">
                    <h4 className="text-xl font-semibold">Post Package Revenue Graph</h4>
                <Row>
                            <Col xs={12} xxl={12}>
                                <Select onChange={(value) => handleOnChange(value)} style={{ width: '50%' }} size='default' defaultValue={valueYear} options={yearOptions}>

                                </Select>
                            </Col>

                </Row>
                <Bar
                data={data}
                options={options}/>
            </div>
        </div>
    </div>
    );
}

export default ChartPost;