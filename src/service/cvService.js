import axios from "../axios";


//==================Cv==========================//
const createNewCv = (data) => {
    return axios.post(`/api/create-new-cv`, data)
}
const getAllListCvByUserIdService = (data) => {
    return axios.get(`/api/get-all-cv-by-userId?limit=${data.limit}&offset=${data.offset}&userId=${data.userId}`)
}
const getDetailCvService = (id,roleCode) => {
    return axios.get(`/api/get-detail-cv-by-id?cvId=${id}&roleCode=${roleCode}`)
}
const getAllListCvByPostService = (data) => {
    return axios.get(`/api/get-all-list-cv-by-post?limit=${data.limit}&offset=${data.offset}&postId=${data.postId}`)
}
const getFilterCv = (data) => {
    return axios.get(`/api/fillter-cv-by-selection?limit=${data.limit}&offset=${data.offset}&experienceJobCode=${data.experienceJobCode}&categoryJobCode=${data.categoryJobCode}&listSkills=${data.listSkills}&otherSkills=${data.otherSkills}&salaryCode=${data.salaryCode}&provinceCode=${data.provinceCode}`)
}
const checkSeeCandiate = (data)=> {
    return axios.get(`/api/check-see-candiate?userId=${data.userId}&companyId=${data.companyId}`)
}
const getStatisticalCv = (data) => {
    return axios.get(`/api/get-statistical-cv?limit=${data.limit}&offset=${data.offset}&fromDate=${data.fromDate}&toDate=${data.toDate}&companyId=${data.companyId}`)
}
export {
    createNewCv,getAllListCvByUserIdService,getDetailCvService,getAllListCvByPostService,getFilterCv, checkSeeCandiate,getStatisticalCv,
}