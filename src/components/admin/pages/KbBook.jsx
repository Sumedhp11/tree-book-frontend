/* eslint-disable react-refresh/only-export-components */
import { useQuery } from "@tanstack/react-query";
import LoaderComponent from "../../Loader";
import AdminLayout from "../Admin"
import { KbBookColumn } from "../columns/KbBookColumn"
import { useContext } from "react";
import { AdminAuthContext } from "../../layout/AdminAuthProvider";
import DataTable from "../../tables/DataTable";
import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog'

import AddKbForm from "../form/AddKbForm";

const KbBook = () => {
    const { apiClient } = useContext(AdminAuthContext);
    const { data, isLoading } = useQuery({
        queryKey: ["get-all-kbs"],
        queryFn: async () => {
            try {
                const res = await apiClient.get("/admin/get-all-kbs", {
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
    console.log(data)

    return (
        <div>
            <div className="h-full w-full px-3">
                <div className="flex justify-between my-2">
                    <div> <h1 className=" font-medium text-lg">KB</h1></div>
                    <div>
                        <Dialog >
                            <DialogTrigger>
                                <button className="bg-green-700 p-1 text-lg px-5 rounded-md text-white border border-[#B6B6BE] ">Add +</button>
                            </DialogTrigger>
                            <DialogContent className="h-[90%]">
                                <AddKbForm />
                            </DialogContent>
                        </Dialog>




                    </div>
                </div>
                <>
                    {isLoading ? (
                        <LoaderComponent />
                    ) : (
                        <DataTable data={data?.data} columns={KbBookColumn} />
                    )}
                </>
            </div>
        </div>
    )
}

export default AdminLayout(KbBook)