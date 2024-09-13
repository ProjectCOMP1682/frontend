import React from 'react'

const Category = (props) => {
    return (
        <>
            <div  className='flex flex-col items-start p-6 bg-[#7E90FE0D] rounded-lg'>
                <div className='flex mb-3 items-center justify-center w-16 h-16 rounded-md bg-[#7E90FE1A] text-[#A49DFF] text-3xl'>
                    <img style={{width: '70%' , height: '70%'}} src={props.data.postDetailData.jobTypePostData.image}></img>
                </div>
                <div className='ml-0'>
                    <h3 className='text-xl font-semibold'>{props.data.postDetailData.jobTypePostData.value}</h3>
                    <p className='text-[#A3A3A3]'>{props.data.amount} Jobs Availble</p>
                </div>
            </div>
        </>
    )
}

export default Category
