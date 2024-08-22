import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { AuthContext } from "../layout/AuthProvider";
import { Button } from "../ui/button";

/* eslint-disable react/prop-types */
const EditTreeForm = ({ tree, setopenDialog, editFunction }) => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: tree?.name || "",
    soil_type: tree?.soil_type || "",
    age: tree?.age || "",
  });
  const [isFormModified, setIsFormModified] = useState(false);
  const [toastId, setToastId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const isModified =
      formData.name !== tree.name ||
      formData.soil_type !== tree.soil_type ||
      formData.age !== tree.age;

    setIsFormModified(isModified);
  }, [formData, tree]);

  const { mutate, isPending } = useMutation({
    mutationFn: editFunction,
    onMutate: () => {
      const id = toast.loading("Sending Tree Update Request to Admin");
      setToastId(id);
    },
    onSuccess: (data) => {
      toast.success(data.message, { id: toastId });
      queryClient.invalidateQueries({ queryKey: ["trees"] });

      setopenDialog(false);
    },
    onError: () => {
      toast.error("Error While Making Update Request", { id: toastId });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      tree_id: tree._id,
      name: formData.name || undefined,
      soil_type: formData.soil_type || undefined,
      age: formData.age || undefined,
      proposed_by: user.email,
    };

    Object.keys(submitData).forEach(
      (key) => submitData[key] === undefined && delete submitData[key]
    );

    mutate({ treeId: tree._id, submitData });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full py-2">
      <div className="mt-5 px-3 w-full flex flex-col space-y-3">
        <img
          src={tree?.tree_image}
          alt="tree-image"
          loading="lazy"
          className="w-full h-20 mb-4 object-contain"
        />
        <div className="flex flex-col">
          <label htmlFor="name" className="font-medium font-serif">
            Tree Name
          </label>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              name="name"
              className="font-normal p-2 text-sm border border-zinc-400 w-full h-7 rounded placeholder:text-sm"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter the tree name"
            />
          </div>
        </div>
        <div>
          <label htmlFor="soil_type" className="font-medium font-serif">
            Soil Type
          </label>
          <input
            type="text"
            name="soil_type"
            className="font-normal p-2 text-sm border border-zinc-400 w-full h-7 rounded placeholder:text-sm"
            value={formData.soil_type}
            onChange={handleInputChange}
            placeholder="Soil Type"
          />
        </div>
        <div>
          <label htmlFor="age" className="font-medium font-serif">
            Tree Age
          </label>
          <input
            type="text"
            name="age"
            className="font-normal p-2 text-sm border border-zinc-400 w-full h-7 rounded placeholder:text-sm"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Enter the tree age"
          />
        </div>
        <div className="w-full pb-5">
          <Button
            type="submit"
            className="w-full"
            disabled={!isFormModified || isPending}
          >
            Edit Tree Data
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditTreeForm;
