import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../ui/DataTable";
import AdminLayout from "../Admin";
import { getAllTreesApi } from "../../../apis/treesAPI";


const Trees = () => {
    const { data } = useQuery({
        queryKey: ["trees"],
        queryFn: getAllTreesApi()
    })
    console.log(data)
    return (
        <div className="h-full w-full flex justify-center items-center">
            {/* <DataTable/> */}
        </div>
    );
};

export default AdminLayout(Trees);