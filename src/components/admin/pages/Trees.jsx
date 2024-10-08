/* eslint-disable react-refresh/only-export-components */
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AdminAuthContext } from "../../layout/AdminAuthProvider";
import LoaderComponent from "../../Loader";
import DataTable from "../../tables/DataTable";
import AdminLayout from "../Admin";
import { Treecolumn } from "../columns/TreesColumn";

const Trees = () => {
  const { apiClient } = useContext(AdminAuthContext);
  const { data, isLoading } = useQuery({
    queryKey: ["trees"],
    queryFn: async () => {
      try {
        const res = await apiClient.get("/admin/get-all-trees", {
          withCredentials: true,
        });

        return res.data;
      } catch (err) {
        console.error("Error fetching trees:", err);
        throw err;
      }
    },

    retry: 0,
  });

  return (
    <div className="h-full w-full px-3">
      <h1 className="my-9 font-medium text-lg">Trees</h1>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <DataTable data={data?.trees} columns={Treecolumn} />
      )}
    </div>
  );
};

export default AdminLayout(Trees);
