import axios from "../axios";



//===============ALL CODE========================//
const getAllCodeService = (type) => {
    return axios.get(`/api/get-all-code?type=${type}`)

}
const getListJobTypeAndCountPost = (data) => {
    return axios.get(`/api/get-list-job-count-post?limit=${data.limit}&offset=${data.offset}`)

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
    getListCompany, getDetailCompanyById,
    getListPostService,getDetailPostByIdService
}