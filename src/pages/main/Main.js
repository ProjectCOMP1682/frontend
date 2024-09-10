import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

const Main = () => {
    return (
        <>
            <div className='container mx-auto'>
                <Header />
                <Outlet />

            </div>
            <Footer />
        </>
    )
}

export default Main