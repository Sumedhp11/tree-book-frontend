/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminAuthContext } from "../../layout/AdminAuthProvider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useContext } from "react";
export const EditRequestColumn = [
  {
    accessorKey: "_id",
    header: "Sl No.",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "request_type",
    header: "Request Type",
  },
  {
    accessorKey: "original_data",
    header: "Original Data",
    cell: ({ row }) => (
      <div className="px-3 w-full flex flex-col  space-y-3">
        <p className="text-sm  text-left">
          Tree Name : {row.original.original_data.name}
        </p>
        <p className="text-sm  text-left">
          Age : {row.original.original_data.age}
        </p>
        <p className="text-sm  text-left">
          Soil type : {row.original.original_data.soil_type}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "proposed_data",
    header: "Proposed Data",
    cell: ({ row }) => (
      <div className="px-3 w-full flex flex-col space-y-3">
        <p className="text-sm  text-left">
          Tree Name : {row.original.proposed_data.name}
        </p>
        <p className="text-sm text-left">
          Age : {row.original.proposed_data.age}
        </p>
        <p className="text-sm  text-left">
          Soil type : {row.original.proposed_data.soil_type}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "proposed_by",
    header: "Proposed By",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { apiClient } = useContext(AdminAuthContext);

      const ChangeEditRequestStatus = async ({ requestId, status }) => {
        const res = await apiClient.patch(
          `/admin/handle-edit-requests/${requestId}`,
          { status },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return res.data;
      };
      const queryClient = useQueryClient();

      const { mutate } = useMutation({
        mutationFn: ChangeEditRequestStatus,
        onSuccess: () => {
          queryClient.invalidateQueries("edit-requests");
        },
      });
      const handleStatusChange = (requestId, status) => {
        mutate({ requestId, status });
      };
      return (
        <div className="flex justify-center items-center">
          {row.original.status === "pending" ? (
            <div className="">
              <Select
                onValueChange={(status) =>
                  handleStatusChange(row.original._id, status)
                }
              >
                <SelectTrigger className="w-[70%] border border-black  text-orange-700 focus:outline-none">
                  <SelectValue
                    placeholder={
                      row.original.status.charAt(0).toUpperCase() +
                      row.original.status.slice(1)
                    }
                  />
                </SelectTrigger>
                <SelectContent className="border border-black">
                  <SelectGroup>
                    <SelectItem
                      value="approved"
                      className="border-b-[0.8px] border-black font-medium hover:text-green-800 text-green-700 cursor-pointer"
                    >
                      Approve
                    </SelectItem>
                    <SelectItem
                      value="rejected"
                      className="border-b-[0.8px] border-black font-medium hover:text-red-800 text-red-700 cursor-pointer"
                    >
                      Reject
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ) : (
            <p
              className={`text-sm font-medium ${
                row.original.status === "approved"
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              {row.original.status.charAt(0).toUpperCase() +
                row.original.status.slice(1)}
            </p>
          )}
        </div>
      );
    },
  },
];
