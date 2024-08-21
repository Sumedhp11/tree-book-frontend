/* eslint-disable react-refresh/only-export-components */
import { useQuery } from "@tanstack/react-query";
import AdminLayout from "../Admin";
import { useContext } from "react";
import { AdminAuthContext } from "../../layout/AdminAuthProvider";

const Trees = () => {
  const { apiClient } = useContext(AdminAuthContext);
  const { data, error, isLoading } = useQuery({
    queryKey: ["trees"],
    queryFn: async () => {
      try {
        const res = await apiClient.get("/admin/get-all-trees");
        console.log(res);

        return res.data;
      } catch (err) {
        console.error("Error fetching trees:", err);
        throw err;
      }
    },
    onError: (err) => {
      console.error("Query error:", err);
    },
    retry: 0,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  return (
    <div className="h-full w-full flex justify-center items-center">
      {/* <DataTable data={data} /> */}
    </div>
  );
};

export default AdminLayout(Trees);
