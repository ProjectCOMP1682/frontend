import axios from "../axios";



//===============ALL CODE========================//
const getAllCodeService = (type) => {
    return axios.get(`/api/get-all-code?type=${type}`)

}

const getListPostService = (data) => {
    if (!data?.search)
    {
        data.search = ''
    }
    if (data.isHot === 1)
    {
        return axios.get(
            `/api/get-filter-post?limit=
            ${data.limit}
            &offset=${data.offset}
            &categoryJobCode=${data.categoryJobCode}
            &addressCode=${data.addressCode}
            &salaryJobCode=${data.salaryJobCode}
            &categoryJoblevelCode=${data.categoryJoblevelCode}
            &categoryWorktypeCode=${data.categoryWorktypeCode}
            &experienceJobCode=${data.experienceJobCode}
            &sortName=${data.sortName}
            &isHot=${data.isHot}
            &search=${data.search}`
        );

    }
    return axios.get(`/api/get-filter-post?limit=${data.limit}&offset=${data.offset}&categoryJobCode=${data.categoryJobCode}&addressCode=${data.addressCode}&salaryJobCode=${data.salaryJobCode}&categoryJoblevelCode=${data.categoryJoblevelCode}&categoryWorktypeCode=${data.categoryWorktypeCode}&experienceJobCode=${data.experienceJobCode}&sortName=${data.sortName}&search=${data.search}`)
}

const getDetailPostByIdService = (id) => {
    return axios.get(`/api/get-detail-post-by-id?id=${id}`)
}
export {
  getAllCodeService,
    getListPostService,getDetailPostByIdService
}