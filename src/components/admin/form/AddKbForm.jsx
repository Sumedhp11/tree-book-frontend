/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react"; // Example icon, replace with your preferred icon
import { useContext, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AdminAuthContext } from "../../layout/AdminAuthProvider";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

const AddKbForm = ({ setDialog }) => {
  const [bannerPreview, setBannerPreview] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [toastId, setToastId] = useState(null);
  const fileInputRef = useRef(null);
  const { apiClient } = useContext(AdminAuthContext);
  const { mutate } = useMutation({
    mutationFn: async (submitdata) => {
      await apiClient.post(`/admin/add-kb`, submitdata, {
        withCredentials: true,
      });
    },
    onMutate: () => {
      const id = toast.loading("Kb Adding....");
      setToastId(id);
    },
    onSuccess: () => {
      toast.success("Successfully Added Kb", { id: toastId });
      setDialog(false);
    },
    onError: () => {
      toast.error("Error While Adding Kb", { id: toastId });
    },
  });
  const { register, getValues, control, resetField, handleSubmit } = useForm();

  const createFieldArrayHandlers = (fieldName) => {
    const { fields, append, remove } = useFieldArray({
      control,
      name: fieldName,
    });

    const handleAddItem = () => {
      const fieldValue = getValues(`${fieldName}Input`);
      if (fieldValue) {
        append({ value: fieldValue });
        resetField(`${fieldName}Input`);
      }
    };

    return { fields, append, remove, handleAddItem };
  };

  const usesHandlers = createFieldArrayHandlers("uses");
  const availabilityHandlers = createFieldArrayHandlers("availability");
  const physicalCharacteristicsHandlers = createFieldArrayHandlers(
    "physicalCharacteristics"
  );
  const survivalConditionsHandlers =
    createFieldArrayHandlers("survivalConditions");

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    setBannerFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onIconClick = () => {
    fileInputRef.current.click();
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", bannerFile);
    formData.append("family", data.family);
    formData.append("commonName", data.commonName);
    formData.append("scientificName", data.scientificName);

    // Helper function to append arrays correctly
    const appendArrayToFormData = (key, array) => {
      array.forEach((item) => {
        formData.append(key, item);
      });
    };

    appendArrayToFormData(
      "uses",
      data.uses.map((item) => item.value)
    );
    appendArrayToFormData(
      "availability",
      data.availability.map((item) => item.value)
    );
    appendArrayToFormData(
      "physicalCharacteristics",
      data.physicalCharacteristics.map((item) => item.value)
    );
    appendArrayToFormData(
      "survivalConditions",
      data.survivalConditions.map((item) => item.value)
    );

    // Log for debugging
    console.log("FormData payload:", formData);

    // Submit the form data
    mutate(formData);
  };

  const renderFieldSection = (label, fieldName, handlers) => (
    <div
      className={` ${
        handlers.fields.length > 0
          ? "border p-2 mt-1 border-gray-200 space-y-2"
          : ""
      }`}
    >
      <Label>{label}</Label>
      <div className="flex items-center relative mb-2">
        <Input {...register(`${fieldName}Input`)} className="w-full " />
        <Button
          className="absolute bottom-0 right-0 mt-2 ml-2"
          type="button"
          onClick={handlers.handleAddItem}
        >
          Add
        </Button>
      </div>
      <ul className={``}>
        {handlers.fields.map((field, index) => (
          <li
            key={field.id}
            className="flex justify-between items-center gap-3"
          >
            <span>{field.value}</span>
            <Button
              size="xs"
              className="p-2 my-1"
              type="button"
              onClick={() => handlers.remove(index)}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="h-full overflow-y-scroll">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 px-2">
        <div className="">
          <Label>Tree Image</Label>
          <div className="w-full  flex items-center mt-2">
            <button
              type="button"
              onClick={onIconClick}
              className="flex items-center justify-center p-2 border rounded"
            >
              {!bannerPreview && <PlusIcon size={60} />}
              {bannerPreview && (
                <img
                  src={bannerPreview}
                  alt="Banner Preview"
                  className=" border w-full h-24 object-contain"
                />
              )}
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleBannerChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="">
          <Label>Family</Label>
          <Input {...register("family")} className="w-full " />
        </div>
        <div className="">
          <Label>Common Name</Label>
          <Input {...register("commonName")} className="w-full " />
        </div>
        <div className="">
          <Label>Scientific Name</Label>
          <Input {...register("scientificName")} className="w-full " />
        </div>
        {renderFieldSection("Uses", "uses", usesHandlers)}
        {renderFieldSection(
          "Availability",
          "availability",
          availabilityHandlers
        )}
        {renderFieldSection(
          "Survival Conditions",
          "survivalConditions",
          survivalConditionsHandlers
        )}
        {renderFieldSection(
          "Physical Characteristics",
          "physicalCharacteristics",
          physicalCharacteristicsHandlers
        )}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AddKbForm;
