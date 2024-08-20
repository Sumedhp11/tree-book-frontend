/* eslint-disable react/prop-types */
import { SquareArrowOutUpRight, Edit2 } from "lucide-react";
import moment from "moment";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import EditTreeForm from "./forms/EditTreeForm";
import { useState } from "react";

const TreeInfoWindow = ({ tree }) => {
  const [openDialog, setopenDialog] = useState("");
  const generateMarkerUrl = () => {
    return `${window.location.origin}/tree-map?lat=${
      tree?.geolocation.split(",")[0]
    }&lng=${tree?.geolocation.split(",")[1]}`;
  };

  const copyToClipboard = () => {
    const url = generateMarkerUrl();
    navigator.clipboard.writeText(url).then(() => {
      toast.success(`Tree Link Copied Successfully`);
    });
  };

  return (
    <div className="w-56 flex flex-col space-y-1">
      <img
        src={tree?.tree_image}
        alt="tree-image"
        loading="lazy"
        className="w-full h-20 mb-4 object-contain"
      />
      <p className="text-sm font-medium ">Tree Name: {tree?.name}</p>
      <p className="text-sm font-medium">
        Tree Soil Type:
        {tree?.soil_type === "" ? "N/A" : tree.soil_type}
      </p>
      <p className="text-sm font-medium">
        Tree Age:
        {tree?.age === null ? "N/A" : tree.age}
      </p>

      <p className="text-sm font-medium">
        Added Date: {moment(tree.createdAt).format("DD/MM/YY")}
      </p>
      <p className="text-sm font-medium">
        Added Time: {moment(tree.createdAt).format("H:MM a")}
      </p>
      <p className="text-sm font-medium">
        Added By: {tree.added_by.split("@")[0]}
      </p>
      <div className="flex items-center gap-4">
        <SquareArrowOutUpRight
          size={20}
          className="cursor-pointer text-blue-500 hover:text-blue-700"
          onClick={copyToClipboard}
        />
        <Dialog onOpenChange={setopenDialog} open={openDialog}>
          <DialogTrigger>
            <Edit2 className="cursor-pointer text-green-500 hover:text-green-700" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Tree Info</DialogTitle>
            </DialogHeader>
            <EditTreeForm tree={tree} setopenDialog={setopenDialog} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TreeInfoWindow;
