import apiClient from "../app/apiClient";
interface IUser{
    _id:string;
    name:string;
    email:string;
}
const searchUserApi = async (query: string):Promise<IUser[]> =>{
    const user = await apiClient.get(`/user/search?search=${query}`)
    return user.data
    
}

export {searchUserApi}