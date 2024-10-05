import axios from "../axios";



//===============ALL CODE========================//
const getAllCodeService = (type) => {
    return axios.get(`/api/get-all-code?type=${type}`)

}
const getListJobTypeAndCountPost = (data) => {
    return axios.get(`/api/get-list-job-count-post?limit=${data.limit}&offset=${data.offset}`)

}
//==================USER==========================//
const getAllUsers = (data) => {
    return axios.get(`/api/get-all-user?limit=${data.limit}&offset=${data.offset}&search=${data.search}`)

}
const BanUserService = (userId) => {
    return axios.post(`/api/ban-user`, {
        data: {
            id: userId
        }
    })

}

const UnbanUserService = (userId) => {
    return axios.post(`/api/unban-user`, {
        data: {
            id: userId
        }
    })

}
const createNewUser = (data) => {
    return axios.post(`/api/create-new-user`, data)

}

const handleLoginService = (data) => {
    return axios.post(`/api/login`, data)

}
const checkUserPhoneService = (phonenumber) => {
    return axios.get(`/api/check-phonenumber-user?phonenumber=${phonenumber}`)
}
const changePasswordByphone = (data) => {
    return axios.post(`/api/changepasswordbyPhone`,data)
}
const getDetailUserById = (id) => {
    return axios.get(`/api/get-detail-user-by-id?id=${id}`)

}
const UpdateUserService = (data) => {
    return axios.put(`/api/update-user`, data)

}
const handleChangePassword = (data) => {
    return axios.post(`/api/changepassword`, data)
}

//================================== COMPANY ============================

const getDetailCompanyByUserId = (userId,companyId) => {
    return axios.get(`/api/get-detail-company-by-userId?userId=${userId}&companyId=${companyId}`)

}

const getListCompany = (data) => {
    return axios.get(`/api/get-list-company?limit=${data.limit}&offset=${data.offset}&search=${data.search}`)

}
const getDetailCompanyById = (id) => {
    return axios.get(`/api/get-detail-company-by-id?id=${id}`)

}


const getAllCompany = (data) => {
    return axios.get(`/api/get-all-company?limit=${data.limit}&offset=${data.offset}&search=${data.search}&censorCode=${data.censorCode}`)
}

const banCompanyService = (data) => {
    return axios.put(`/api/ban-company`, data)
}

const unbanCompanyService = (data) => {
    return axios.put(`/api/unban-company`, data)

}

const accecptCompanyService = (data) => {
    return axios.put(`/api/accecpt-company`, data)

}
//======================== POST ====================================//

const getListPostService = (data) => {
    if (!data?.search)
    {
        data.search = ''
    }
    if (data.isHot === 1) {
        return axios.get(
            `/api/get-filter-post?limit=${data.limit}&offset=${data.offset}&categoryJobCode=${data.categoryJobCode}&addressCode=${data.addressCode}&salaryJobCode=${data.salaryJobCode}&categoryJoblevelCode=${data.categoryJoblevelCode}&categoryWorktypeCode=${data.categoryWorktypeCode}&experienceJobCode=${data.experienceJobCode}&sortName=${data.sortName}&isHot=${data.isHot}&search=${data.search}`
        );
    }

    return axios.get(`/api/get-filter-post?limit=${data.limit}&offset=${data.offset}&categoryJobCode=${data.categoryJobCode}&addressCode=${data.addressCode}&salaryJobCode=${data.salaryJobCode}&categoryJoblevelCode=${data.categoryJoblevelCode}&categoryWorktypeCode=${data.categoryWorktypeCode}&experienceJobCode=${data.experienceJobCode}&sortName=${data.sortName}&search=${data.search}`)
}

const getDetailPostByIdService = (id) => {
    return axios.get(`/api/get-detail-post-by-id?id=${id}`)
}

export {
  getAllCodeService, getListJobTypeAndCountPost,
  createNewUser,handleLoginService,changePasswordByphone, checkUserPhoneService, getDetailUserById, UpdateUserService,handleChangePassword,BanUserService,UnbanUserService, getAllUsers,
    getListCompany, getDetailCompanyById, getAllCompany , accecptCompanyService, banCompanyService, unbanCompanyService,getDetailCompanyByUserId,
    getListPostService,getDetailPostByIdService
}