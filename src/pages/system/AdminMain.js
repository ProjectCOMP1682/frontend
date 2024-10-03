import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Menu from './Menu';
const AdminMain = () => {


    return (
        <>
            <div className="">
                <div className="flex overflow-scroll ">
                    <div className="basis-[12%] h-[100vh]">
                        <Menu />
                    </div>
                    <div className="basis-[88%] border overflow-scroll h-[100vh]">
                        <Header />
                        <div>
                            <Outlet></Outlet>
                        </div>
                    </div>

                </div>
            </div>


        </>
    )
}

export default AdminMain