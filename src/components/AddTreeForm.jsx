/* eslint-disable react-refresh/only-export-components */
import exifr from "exifr";
import { Plus } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import Applayout from "./layout/AppLayout";
import ImagePreview from "./ImagePreview";

const AddTreeForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [geoLocation, setGeoLocation] = useState({ lat: "", long: "" });
  const [formData, setFormData] = useState({
    tree_name: "",
    soil_type: "",
    tree_age: "",
    kb_link: "",
  });
  const [errors, setErrors] = useState({
    imageError: null,
    locationError: null,
    formError: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDivClick = useCallback((event) => {
    event.stopPropagation();

    console.log("Div clicked", event);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileChange = useCallback(async (event) => {
    const file = event.target?.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
      try {
        const { latitude, longitude } = await exifr.gps(file);
        if (latitude && longitude) {
          setGeoLocation({ lat: latitude, long: longitude });
          setErrors((prev) => ({ ...prev, locationError: null }));
        } else {
          setGeoLocation({ lat: "N/A", long: "N/A" });
          setErrors((prev) => ({
            ...prev,
            locationError:
              "Image is not GeoTagged, Please Upload GeoTagged Image",
          }));
        }
      } catch (error) {
        console.error("Failed to extract geolocation data", error);
        setGeoLocation({ lat: "N/A", long: "N/A" });
        setErrors((prev) => ({
          ...prev,
          locationError: "Image is not GeoTagged, Please upload another image",
        }));
      }
    } else {
      alert("Please upload a valid image file.");
    }
  }, []);

  const submitHandler = async () => {
    if (!formData.tree_name) {
      setErrors((prev) => ({
        ...prev,
        formError: "Tree name is required.",
      }));
      return;
    }
    setIsSubmitting(true);
    const submitdata = new FormData();
    submitdata.append("name", formData.tree_name);
    submitdata.append("geolocation", `${geoLocation.lat},${geoLocation.long}`);
    submitdata.append("age", formData.tree_age);
    submitdata.append("soil_type", formData.soil_type);
    submitdata.append("kb_link", formData.kb_link);
    submitdata.append("file", imageFile);
    try {
      const res = await fetch(
        "https://tree-book-backend.vercel.app/api/trees/add",
        {
          method: "POST",
          body: submitdata,
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to submit the form.");
        throw new Error(data.message || "Failed to submit the form.");
      }
      toast.success("Tree Added Successfully");
      setFormData({
        tree_name: "",
        soil_type: "",
        tree_age: "",
        kb_link: "",
      });
      setGeoLocation({ lat: "", long: "" });
      setImagePreview(null);
      setImageFile(null);
      setErrors({
        imageError: null,
        locationError: null,
        formError: null,
      });
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        formError: error.message,
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.tree_name &&
    geoLocation.lat &&
    geoLocation.long &&
    imageFile &&
    formData.kb_link;

  return (
    <div className="w-full mt-12 flex justify-center items-center">
      <div className="w-4/5 sm:w-[70%] md:w-[60%] lg:w-[30%] h-fit py-5 border border-gray-300 rounded-lg px-1">
        <h1 className="text-center font-serif font-semibold text-lg">
          Add Tree 🪖
        </h1>
        <div className="w-full px-3 mt-3 space-y-2 relative">
          <label className="font-medium font-serif">Upload Tree Image</label>
          <ImagePreview
            imagePreview={imagePreview}
            classname="w-full sm:w-1/3 h-32 max-h-[250px] bg-zinc-300 flex justify-center items-center cursor-pointer relative"
            Icon={Plus}
            onClick={handleDivClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            className="absolute inset-0 opacity-0 cursor-pointer w-full sm:w-1/3"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <p className="text-orange-700 px-3 font-medium text-xs mt-1">
          The Location will be fetched Automatically from Image*
        </p>
        <div className="w-full px-3 my-3 flex flex-col">
          <label htmlFor="tree_name" className="font-medium font-serif">
            Tree Name:
          </label>
          <input
            className="font-medium font-serif px-1 border border-zinc-400 w-full h-8 rounded"
            value={formData.tree_name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, tree_name: e.target.value }))
            }
          />
        </div>
        <div className="mt-5 flex items-center gap-5 px-3 w-full">
          <div className="w-1/2 flex flex-col">
            <label htmlFor="lat" className="font-medium font-serif">
              Latitude
            </label>
            <input
              disabled
              className="font-normal p-2 border text-sm border-zinc-400 w-full h-7 rounded placeholder:text-sm"
              value={geoLocation.lat || ""}
              placeholder="latitude will be fetched from image"
            />
          </div>
          <div className="w-1/2 flex flex-col">
            <label htmlFor="long" className="font-medium font-serif">
              Longitude
            </label>
            <input
              disabled
              className="font-normal p-2 text-sm border border-zinc-400 w-full h-7 rounded placeholder:text-sm"
              value={geoLocation.long || ""}
              placeholder="longitude will be fetched from image"
            />
          </div>
        </div>
        {errors.locationError && (
          <p className="text-xs font-medium my-2 text-orange-700 px-3">
            {errors.locationError}
          </p>
        )}
        <div className="w-full px-3 my-3 flex flex-col">
          <label htmlFor="soilType" className="font-medium font-serif">
            Soil Type:
          </label>
          <input
            className="font-medium font-serif px-1 border border-zinc-400 w-full h-8 rounded"
            value={formData.soil_type}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, soil_type: e.target.value }))
            }
          />
        </div>
        <div className="w-full px-3 my-3 flex flex-col">
          <label htmlFor="age" className="font-medium font-serif">
            Tree Age:
          </label>
          <input
            className="font-medium px-1 font-serif border border-zinc-400 w-full h-8 rounded"
            value={formData.tree_age}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, tree_age: e.target.value }))
            }
          />
        </div>
        <div className="w-full px-3 my-3 flex flex-col">
          <label htmlFor="kb_link" className="font-medium font-serif">
            Kb Link:
          </label>
          <input
            className="font-medium px-1 font-serif border border-zinc-400 w-full h-8 rounded"
            value={formData.kb_link}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, kb_link: e.target.value }))
            }
          />
        </div>
        <div className="w-full px-3">
          <button
            onClick={submitHandler}
            className={`w-full p-2 rounded-lg mt-3 ${
              isSubmitting || !isFormValid
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
            disabled={isSubmitting || !isFormValid}
          >
            {isSubmitting ? "Submitting..." : "Add Tree"}
          </button>
          {errors.formError && (
            <p className="text-xs font-medium my-2 text-orange-700 px-3">
              {errors.formError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applayout(AddTreeForm);
