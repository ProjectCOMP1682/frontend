import { createBrowserRouter } from "react-router-dom";
import Main from "./pages/main/Main";
import Home from "./pages/home/Home";
import JobDetails from "./components/jobDetails/JobDetails";
import Broken from "./pages/broken/Broken";
import AllJobs from "./pages/allJobs/AllJobs";
import Blogs from "./pages/blogs/Blogs";
import ListCompany from "./pages/Company/ListCompany";
import DetailCompany from "./pages/Company/DetailCompany";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import ForgetPassword from "./pages/login/ForgetPassword";
import { Navigate } from 'react-router-dom';
import CandidateInfo from './pages/Candidate/CandidateInfo';
import ChangePassword from "./pages/system/User/ChangePassword";
import AdminMain from "./pages/system/AdminMain";
import AdminDashboard from "./pages/system/AdminDashboard"
import UserInfo from "./pages/system/User/UserInfo";
import ManageUser from "./pages/system/User/ManageUser";
import AddUser from "./pages/system/User/AddUser";
// browser router file
const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/forget-password",
                element: <ForgetPassword />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/job-details/:id",
                element: <JobDetails />,
            },
            {
                path: "/company",
                element: <ListCompany />
            },
            {
                path: "/detail-company/:id",
                element: <DetailCompany />
            },

            {
                path: "/all-jobs",
                element: <AllJobs />
            },
            {
                path: "/blogs",
                element: <Blogs />
            },
            {
                path: "*",
                element: <Broken />
            },

            {
                path: "/candidate/info",
                element: JSON.parse(localStorage.getItem("userData")) &&
                JSON.parse(localStorage.getItem("userData")).roleCode === "CANDIDATE"
                    ? <CandidateInfo />
                    : <Navigate to="/login" />
            },
            {
                path: "/candidate/changepassword",
                element: JSON.parse(localStorage.getItem("userData")) &&
                JSON.parse(localStorage.getItem("userData")).roleCode === "CANDIDATE"
                    ? <ChangePassword />
                    : <Navigate to="/login" />
            },


        ]
    },
    {
        path: "/admin",
        element: JSON.parse(localStorage.getItem("userData")) &&
        JSON.parse(localStorage.getItem("userData")).roleCode === "ADMIN"
            ? <AdminMain />
            : <Navigate to="/login" />,
        children: [
            {
                path: "dashboard",
                element: <AdminDashboard /> // Ví dụ một trang dashboard admin
            },
            {
                path: "user-info",
                element: <UserInfo /> // Ví dụ một trang dashboard admin
            },
            {
                path: "changepassword",
                element: <ChangePassword/> // Ví dụ một trang dashboard admin
            },
            {
                path: "list-user",
                element: <ManageUser/> // Ví dụ một trang dashboard admin
            },
            {
                path: "add-user",
                element: <AddUser/> // Ví dụ một trang dashboard admin
            },
            // Các route khác của admin ở đây
        ]
    },
    {
        path: "*",
        element: <Broken />
    }
])

export default router;