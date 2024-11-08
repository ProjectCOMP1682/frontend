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
export {
    createNewCv,getAllListCvByUserIdService,getDetailCvService,
}