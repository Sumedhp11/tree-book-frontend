/* eslint-disable react-hooks/rules-of-hooks */
import useApiClient from "../components/admin/apiClient";
import axios from "axios";

const fetchTreeAPI = async (searchTerm) => {
  try {
    let url = "https://tree-book-backend.vercel.app/api/trees/all";
    if (searchTerm) {
      url = url + `?searchTerm=${searchTerm}`;
    }
    const res = await axios.get(url);
    const data = res?.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError) {
      throw new Error(error);
    }
  }
};
const EditTreeRequestAPI = async (submitData) => {
  try {
    let url =
      "https://tree-book-backend.vercel.app/api/trees/request-tree-update";

    const res = await axios.patch(url, submitData);
    const data = res?.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError) {
      throw new Error(error);
    }
  }
};

const getAllTreesApi = async()=>{
  const apiClient= useApiClient()
  const res = await apiClient.get('/admin/get-all-trees',{
    withCredentials:true
  })
  return res?.data

}

const AdminLoginAPI = async ({ email, password }) => {

  const response = await axios.post(
    "https://tree-book-backend.vercel.app/api/admin/login",
    { email, password }
  );
  return response.data;
};
export { fetchTreeAPI, EditTreeRequestAPI, AdminLoginAPI, getAllTreesApi };
