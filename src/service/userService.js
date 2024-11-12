import axios from "../axios";



//===============ALL CODE========================//
const getAllCodeService = (type) => {
    return axios.get(`/api/get-all-code?type=${type}`)

}
const getListJobTypeAndCountPost = (data) => {
    return axios.get(`/api/get-list-job-count-post?limit=${data.limit}&offset=${data.offset}`)

}
const DeleteAllcodeService = (allcodeId) => {
    return axios.delete(`/api/delete-all-code`, {
        data: {
            code: allcodeId
        }
    })
}
const getListAllCodeService = (data) => {
    return axios.get(`/api/get-list-allcode?type=${data.type}&limit=${data.limit}&offset=${data.offset}&search=${data.search}`)

}
const createAllCodeService = (data) => {
    return axios.post(`/api/create-new-all-code`, data)

}
const getDetailAllcodeByCode = (code) => {
    return axios.get(`/api/get-detail-all-code-by-code?code=${code}`)

}
const UpdateAllcodeService = (data) => {
    return axios.put(`/api/update-all-code`, data)

}
const createSkilleService = (data) => {
    return axios.post(`/api/create-new-skill`, data)

}
const DeleteSkillService = (skillId) => {
    return axios.delete(`/api/delete-skill`, {
        data: {
            id: skillId
        }
    })
}
const UpdateSkillService = (data) => {
    return axios.put(`/api/update-skill`, data)

}
const getListSkill  = (data) => {
    return axios.get(`/api/get-list-skill?categoryJobCode=${data.categoryJobCode}&limit=${data.limit}&offset=${data.offset}&search=${data.search}`)

}
const getDetailSkillById = (id) => {
    return axios.get(`/api/get-detail-skill-by-id?id=${id}`)

}
const getAllSkillByJobCode = (categoryJobCode) => {
    return axios.get(`/api/get-all-skill-by-job-code?categoryJobCode=${categoryJobCode}`)

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
const UpdateUserSettingService = (data) => {
    return axios.put(`/api/setDataUserSetting`, data)

}
//================================== COMPANY ============================
const createCompanyService = (data) => {
    return axios.post(`/api/create-new-company`, data)

}
const updateCompanyService = (data) => {
    return axios.put(`/api/update-company`, data)

}
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
const RecruitmentService = (data) => {
    return axios.put(`/api/add-user-company`, data)

}
const getAllUserByCompanyIdService = (data) => {
    return axios.get(`/api/get-all-user-by-companyId?companyId=${data.companyId}&limit=${data.limit}&offset=${data.offset}`)

}
const QuitCompanyService = (data) => {
    return axios.put(`/api/quit-company`, data)

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
const banPostService = (data) => {
    return axios.put(`/api/ban-post`, data)
}
const getAllPostByAdminService = (data) => {
    return axios.get(`/api/get-list-post-admin?companyId=${data.companyId}&limit=${data.limit}&offset=${data.offset}&search=${data.search}&censorCode=${data.censorCode}`)

}
const activePostService = (data) => {
    return axios.put(`/api/active-post`, data)

}
const getAllPostByRoleAdminService = (data) => {
    return axios.get(`/api/get-all-post-admin?limit=${data.limit}&offset=${data.offset}&search=${data.search}&censorCode=${data.censorCode}`)

}
const acceptPostService = (data) => {
    return axios.put(`/api/accept-post`, data)
}
const getListNoteByPost = (data) => {
    return axios.get(`/api/get-note-by-post?limit=${data.limit}&offset=${data.offset}&id=${data.id}`)
}
const createPostService = (data) => {
    return axios.post(`/api/create-new-post`, data)

}
const updatePostService = (data) => {
    return axios.put(`/api/update-post`, data)

}
const reupPostService = (data) => {
    return axios.post(`/api/create-reup-post`, data)

}

//======================== PACKAGE ====================================//

const getAllPackage = (data) => {
    return axios.get(`/api/get-all-package?limit=${data.limit}&offset=${data.offset}&search=${data.search}`)
}
const setActiveTypePackage= (data) => {
    return axios.put(`/api/set-active-package-post`, data)
}
const getPackageById = (id) => {
    return axios.get(`/api/get-package-by-id?id=${id}`)
}
const createPackagePost= (data) => {
    return axios.post(`/api/create-package-post`, data)
}
const updatePackagePost = (data) => {
    return axios.put(`/api/update-package-post`, data)
}
const getPackageByType = (isHot) => {
    return axios.get(`/api/get-package-by-type?isHot=${isHot}`)
}
const getPaymentLink = (id,amount) => {
    return axios.get(`/api/get-payment-link?id=${id}&amount=${amount}`)
}
const paymentOrderSuccessService = (data) => {
    return axios.post(`/api/payment-success`, data)
}
const getHistoryTradePost = (data) => {
    return axios.get(`/api/get-history-trade-post?limit=${data.limit}&offset=${data.offset}&fromDate=${data.fromDate}&toDate=${data.toDate}&companyId=${data.companyId}`)
}
//======================== PACKAGE Cv ====================================//

const getAllPackageCv = (data) => {
    return axios.get(`/api/get-all-package-cv?limit=${data.limit}&offset=${data.offset}&search=${data.search}`)
}
const setActiveTypePackageCv= (data) => {
    return axios.put(`/api/set-active-package-cv`, data)
}
const getPackageByIdCv = (id) => {
    return axios.get(`/api/get-package-cv-by-id?id=${id}`)
}
const createPackageCv= (data) => {
    return axios.post(`/api/create-package-cv`, data)
}
const updatePackageCv = (data) => {
    return axios.put(`/api/update-package-cv`, data)
}
const getPaymentLinkCv = (id,amount) => {
    return axios.get(`/api/get-payment-cv-link?id=${id}&amount=${amount}`)
}
const getAllToSelect = () => {
    return axios.get(`/api/get-all-package-cv-select`)
}
const paymentOrderSuccessServiceCv = (data) => {
    return axios.post(`/api/payment-cv-success`, data)
}
export {
  getAllCodeService, getListJobTypeAndCountPost,getListAllCodeService,DeleteAllcodeService,createAllCodeService,  getDetailAllcodeByCode, UpdateAllcodeService,DeleteSkillService, getListSkill,createSkilleService,getDetailSkillById,UpdateSkillService,getAllSkillByJobCode,
    createNewUser,handleLoginService,changePasswordByphone, checkUserPhoneService, getDetailUserById, UpdateUserService,handleChangePassword,BanUserService,UnbanUserService, getAllUsers,UpdateUserSettingService,
    createCompanyService,updateCompanyService, getListCompany, getDetailCompanyById, getAllCompany , accecptCompanyService, banCompanyService, unbanCompanyService,getDetailCompanyByUserId,RecruitmentService,getAllUserByCompanyIdService,QuitCompanyService,
    getListPostService,getDetailPostByIdService,banPostService,acceptPostService, getAllPostByAdminService,getAllPostByRoleAdminService,activePostService,getListNoteByPost, createPostService,updatePostService,reupPostService,
    setActiveTypePackage, getAllPackage,getPackageById,createPackagePost,updatePackagePost,getPackageByType,getPaymentLink,paymentOrderSuccessService,getHistoryTradePost,
    getAllPackageCv,setActiveTypePackageCv, getPackageByIdCv,createPackageCv,updatePackageCv,getPaymentLinkCv,getAllToSelect,paymentOrderSuccessServiceCv,
}