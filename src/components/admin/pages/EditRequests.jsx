/* eslint-disable react-refresh/only-export-components */
import LoaderComponent from "../../Loader";
import AdminLayout from "../Admin";
import DataTable from "../../tables/DataTable";
import { useContext } from "react";
import { AdminAuthContext } from "../../layout/AdminAuthProvider";
import { useQuery } from "@tanstack/react-query";
import { EditRequestColumn } from "../columns/EditRequestColumn";

const EditRequests = () => {
  const { apiClient } = useContext(AdminAuthContext);
  const { data, isLoading } = useQuery({
    queryKey: ["edit-requests"],
    queryFn: async () => {
      try {
        const res = await apiClient.get("/admin/edit-requests", {
          withCredentials: true,
        });

        return res.data;
      } catch (err) {
        console.error("Error fetching Edit Requests:", err);
        throw err;
      }
    },

    retry: 0,
  });
  return (
    <div className="h-full w-full px-3">
      <h1 className="my-9 font-medium text-lg">Edit Requests</h1>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <DataTable data={data?.editRequests} columns={EditRequestColumn} />
      )}
    </div>
  );
};

export default AdminLayout(EditRequests);
