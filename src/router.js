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


        ]
    },
    {
        path: "*",
        element: <Broken />
    }
])

export default router;