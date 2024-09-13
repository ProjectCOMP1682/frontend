import { createBrowserRouter } from "react-router-dom";
import Main from "./pages/main/Main";
import Home from "./pages/home/Home";
import JobDetails from "./components/jobDetails/JobDetails";
import AppliedJobs from "./pages/appliedJobs/AppliedJobs";
import Statistics from "./pages/statistics/Statistics";
import Broken from "./pages/broken/Broken";
import AllJobs from "./pages/allJobs/AllJobs";
import Blogs from "./pages/blogs/Blogs";

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
                path: "/job-details/:id",
                element: <JobDetails />,
            },
            {
                path: "/applied",
                element: <AppliedJobs />
            },
            {
                path: "/statistics",
                element: <Statistics />
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
            }
        ]
    },
    {
        path: "*",
        element: <Broken />
    }
])

export default router;