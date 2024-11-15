import commonAPI from "./commonAPI"
import SERVER_URL from "./serverUrl"


export const registerAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}

export const loginAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}

export const addTaskAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-task`,reqBody,reqHeader)
}

export const allTaskAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-task`,{},reqHeader)
}

export const updateTaskAPI =async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/tasks/${id}/edit-task`,reqBody,reqHeader)
}

export const removeTaskAPI = async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/tasks/${id}/delete-task`,{},reqHeader)
}

export const getSingleTaskAPI=async(id)=>{
    return await commonAPI("GET",`${SERVER_URL}/allTasks/${id}`,"")
}