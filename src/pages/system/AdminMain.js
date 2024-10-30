import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Menu from './Menu';
const AdminMain = () => {


    return (
        <>
            <div className="">
                <div className="flex overflow-hidden">
                    {/* Sidebar */}
                    <div className="basis-[12%] min-h-screen overflow-y-auto">
                        <Menu />
                    </div>
                    {/* Main Content */}
                    <div className="basis-[88%] border overflow-y-auto min-h-screen">
                        <Header />
                        <div>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>




        </>
    )
}

export default AdminMain