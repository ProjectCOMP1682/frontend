import React from 'react'
import { FaCalculator } from 'react-icons/fa'
import { HiLightBulb } from 'react-icons/hi'
import { SiLoopback } from 'react-icons/si'
import { GiCircuitry } from 'react-icons/gi'

const JobCategoryList = () => {
    const data = [
        {
            id: 1,
            icon: <FaCalculator />,
            title: 'Accounting & Finance',
            count: 300
        },
        {
            id: 2,
            icon: <HiLightBulb />,
            title: 'Creative Design',
            count: "100+"
        },
        {
            id: 3,
            icon: <SiLoopback />,
            title: 'Marketing & Sales',
            count: 150
        },
        {
            id: 4,
            icon: <GiCircuitry />,
            title: 'Engineering Job',
            count: 224
        }
    ]
    return (
        <div className='py-10'>
            <div className='text-center'>
                <h2 className='text-3xl font-bold mb-2'>
                    Job Category List
                </h2>
                <p>
                    Explore thousands of job opportunities with all the information you need. Its your future
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10'>
                {data.map((item) => (
                    <div key={item.id} className='flex flex-col items-start p-6 bg-[#7E90FE0D] rounded-lg'>
                        <div className='flex mb-3 items-center justify-center w-16 h-16 rounded-md bg-[#7E90FE1A] text-[#A49DFF] text-3xl'>
                            {item.icon}
                        </div>
                        <div className='ml-0'>
                            <h3 className='text-xl font-semibold'>{item.title}</h3>
                            <p className='text-[#A3A3A3]'>{item.count} Jobs Availble</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}



export default JobCategoryList