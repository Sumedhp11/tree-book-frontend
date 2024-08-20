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

export { fetchTreeAPI, EditTreeRequestAPI };
