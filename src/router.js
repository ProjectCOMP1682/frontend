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
import ManageCompany from "./pages/system/Company/ManageCompany";
import ViewCompany from "./pages/system/Company/ViewCompany";
import ManagePost from "./pages/system/Post/ManagePost";
import ViewPost from "./pages/system/Post/ViewPost";
import NotePost from "./pages/system/Post/NotePost";
import ManageJobType from "./pages/system/JobType/ManageJobType";
import AddJobType from "./pages/system/JobType/AddJobType";
import ManageJobSkill from "./pages/system/JobSkill/ManageJobSkill";
import AddJobSkill from "./pages/system/JobSkill/AddJobSkill";
import ManageJobLevel from "./pages/system/JobLevel/ManageJobLevel";
import AddJobLevel from "./pages/system/JobLevel/AddJobLevel";
import ManageWorkType from "./pages/system/WorkType/ManageWorkType";
import AddWorkType from "./pages/system/WorkType/AddWorkType";
import ManageSalaryType from "./pages/system/SalaryType/ManageSalaryType";
import AddSalaryType from "./pages/system/SalaryType/AddSalaryType";
import ManageExpType from "./pages/system/ExpType/ManageExpType";
import AddExpType from "./pages/system/ExpType/AddExpType";
import ManagePackagePost from "./pages/system/PackagePost/ManagePackagePost";
import AddPackagePost from "./pages/system/PackagePost/AddPackagePost";
import ManagePackageCv from "./pages/system/PackageCv/ManagePackageCv";
import AddPackageCv from "./pages/system/PackageCv/AddPackageCv";
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
            {
                path: "edit-user/:id",
                element: <AddUser/> // Ví dụ một trang dashboard admin
            },

            {
                path: "list-company-admin",
                element: <ManageCompany/> // Ví dụ một trang dashboard admin
            },

            {
                path: "view-detail-company-admin/:id",
                element: <ViewCompany/> // Ví dụ một trang dashboard admin
            },
                {
                path: "list-post-admin",
                element: <ManagePost/> // Ví dụ một trang dashboard admin
            },
            {
                path: "edit-post/:id",
                element: <ViewPost/> // Ví dụ một trang dashboard admin
            },
            {
                path: "note/:id",
                element: <NotePost/> // Ví dụ một trang dashboard admin
            },
            {
                path: "list-job-type",
                element: <ManageJobType/> // Ví dụ một trang dashboard admin
            },
            {
                path: "edit-job-type/:code",
                element: <AddJobType/> // Ví dụ một trang dashboard admin
            },
            {
                path: "add-job-type",
                element: <AddJobType/> // Ví dụ một trang dashboard admin
            },
            {
                path: "list-job-skill",
                element: <ManageJobSkill/> // Ví dụ một trang dashboard admin
            },
            {
                path: "edit-job-skill/:code",
                element: <AddJobSkill/> // Ví dụ một trang dashboard admin
            },
            {
                path: "add-job-skill",
                element: <AddJobSkill/> // Ví dụ một trang dashboard admin
            },
            {
                path: "list-job-level",
                element: <ManageJobLevel/> // Ví dụ một trang dashboard admin
            },
            {
                path: "edit-job-level/:id",
                element: <AddJobLevel/> // Ví dụ một trang dashboard admin
            },
            {
                path: "add-job-level",
                element: <AddJobLevel/> // Ví dụ một trang dashboard admin
            },
            {
                path: "list-work-type",
                element: <ManageWorkType/> // Ví dụ một trang dashboard admin
            },
            {
                path: "edit-work-type/:id",
                element: <AddWorkType/> // Ví dụ một trang dashboard admin
            },
            {
                path: "add-work-type",
                element: <AddWorkType/> // Ví dụ một trang dashboard admin
            },
            {
                path: "list-salary-type",
                element: <ManageSalaryType/> // Ví dụ một trang dashboard admin
            },
            {
                path: "edit-salary-type/:id",
                element: <AddSalaryType/> // Ví dụ một trang dashboard admin
            },
            {
                path: "add-salary-type",
                element: <AddSalaryType/> // Ví dụ một trang dashboard admin
            },
            {
                path: "list-exp-type",
                element: <ManageExpType/> // Ví dụ một trang dashboard admin
            },
            {
                path: "edit-exp-type/:id",
                element: <AddExpType/> // Ví dụ một trang dashboard admin
            },

            {
                path: "add-exp-type",
                element: <AddExpType/> // Ví dụ một trang dashboard admin
            },
            {
                path: "list-package-post",
                element: <ManagePackagePost/> // Ví dụ một trang dashboard admin
            },
            {
                path: "edit-package-post/:id",
                element: <AddPackagePost/> // Ví dụ một trang dashboard admin
            },
            {
                path: "add-package-post",
                element: <AddPackagePost/> // Ví dụ một trang dashboard admin
            },
            {
                path: "list-package-cv",
                element: <ManagePackageCv/> // Ví dụ một trang dashboard admin
            },
            {
                path: "edit-package-cv/:id",
                element: <AddPackageCv/> // Ví dụ một trang dashboard admin
            },
            {
                path: "add-package-cv",
                element: <AddPackageCv/> // Ví dụ một trang dashboard admin
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