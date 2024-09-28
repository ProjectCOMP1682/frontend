import axios from "../axios";



//===============ALL CODE========================//
const getAllCodeService = (type) => {
    return axios.get(`/api/get-all-code?type=${type}`)

}
const getListJobTypeAndCountPost = (data) => {
    return axios.get(`/api/get-list-job-count-post?limit=${data.limit}&offset=${data.offset}`)

}
//==================USER==========================//
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

const getListCompany = (data) => {
    return axios.get(`/api/get-list-company?limit=${data.limit}&offset=${data.offset}&search=${data.search}`)

}
const getDetailCompanyById = (id) => {
    return axios.get(`/api/get-detail-company-by-id?id=${id}`)

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
  createNewUser,handleLoginService,changePasswordByphone, checkUserPhoneService, getDetailUserById, UpdateUserService,handleChangePassword,
    getListCompany, getDetailCompanyById,
    getListPostService,getDetailPostByIdService
}