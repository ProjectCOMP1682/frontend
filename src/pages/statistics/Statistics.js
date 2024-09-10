import React from 'react';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import Chart from '../../components/chart/Chart';

const Statistics = () => {
    return (
        <div className='py-10'>
            <Breadcrumb>
                <h2 className='text-3xl font-bold mb-2'>
                    Assignment Statistics
                </h2>
            </Breadcrumb>

            <div className='py-10'>
                <Chart />
            </div>
        </div>
    );
};

export default Statistics;