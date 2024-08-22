/* eslint-disable react-hooks/rules-of-hooks */
import { AdminAuthContext } from "../../layout/AdminAuthProvider";
import { Edit2 } from "lucide-react";
import moment from "moment";
import { useContext, useState } from "react";
import EditTreeForm from "../../forms/EditTreeForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

export const Treecolumn = [
  {
    accessorKey: "_id",
    header: "Sl No.",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "tree_image",
    header: "Tree Image",
    cell: ({ row }) => (
      <div className="w-20  h-20">
        <img
          src={row.original.tree_image}
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Tree Name",
  },
  {
    accessorKey: "soil_type",
    header: "Soil Type",
  },
  {
    accessorKey: "age",
    header: "Tree Age",
  },
  {
    accessorKey: "added_by",
    header: "Added By",
  },
  {
    accessorKey: "createdAt",
    header: "Added Date Time",
    cell: ({ row }) => (
      <div className="flex flex-col gap-3 items-center">
        <p>{moment(row.original.createdAt).format("DD-MM-YYYY")}</p>
        <p>{moment(row.original.createdAt).format("HH:MM")}</p>
        <p></p>
      </div>
    ),
  },
  {
    accessorKey: "_id",
    header: "Action",
    cell: ({ row }) => {
      const { apiClient } = useContext(AdminAuthContext);
      const [openDialog, setopenDialog] = useState(false);
      const AdminUpdateTree = async ({ treeId, submitData }) => {
        const res = await apiClient.patch(
          `/admin/update-tree/${treeId}`,
          submitData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return res.data;
      };

      return (
        <Dialog onOpenChange={setopenDialog} open={openDialog}>
          <DialogTrigger>
            <Edit2 className="cursor-pointer text-green-500 hover:text-green-700" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Tree Info</DialogTitle>
            </DialogHeader>
            <EditTreeForm
              tree={row.original}
              setopenDialog={setopenDialog}
              editFunction={AdminUpdateTree}
            />
          </DialogContent>
        </Dialog>
      );
    },
  },
];
