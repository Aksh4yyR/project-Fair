import SERVER_URL from "./serverUrl"
import commonAPI from "./commonAPI"


//registerAPI called by Auth component when user click register button
export const registerAPI=async(reqBody)=>
{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}

//loginAPI called by Auth component when user click login btn

export const loginAPI=async (reqBody)=>
{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}

//addProjectAPI called by Add Component when user click add button
export const addProjectAPI=async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}

//getHomeProjectAPI called by Home component when page loaded in browser(useEffect)
export const getHomeProjectAPI=async ()=>{
    return await commonAPI("GET",`${SERVER_URL}/home-project`,{})
}

//allProjectAPI called by Home component when page loaded in browser(useEffect)
export const allProjectAPI=async (searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-projects?search=${searchKey}`,{},reqHeader)
}

//userProjectAPI called by view component when page loaded in browser(useEffect)

export const userProjectAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-projects`,{},reqHeader)
}

//updateProjectAPI calledby Edit component when user click update btn http://localhost:3000/projects/6728bbdb0099055c031544da/edit

export const updateProjectAPI=async(id,reqBody,reqHeader)=>
{
    return await commonAPI("PUT",`${SERVER_URL}/projects/${id}/edit`,reqBody,reqHeader)
}

//userProjectRemoveAPI called by view component when user clicked delete  btn


export const userProjectRemoveAPI=async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/projects/${id}/remove`,{},reqHeader)
}

//updateUserAPI calledby profile component when user click update btn edit-user

export const updateUserAPI=async(reqBody,reqHeader)=>
    {
        return await commonAPI("PUT",`${SERVER_URL}/edit-user`,reqBody,reqHeader)
    }