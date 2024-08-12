/* eslint-disable react-refresh/only-export-components */
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CameraCapture from "./CameraCapture";
import Applayout from "./layout/AppLayout";
import LoaderComponent from "./Loader";
import { AuthContext } from "./layout/AuthProvider";

const AddTreeForm = () => {
  const { user, isLoading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    tree_name: "",
    tree_age: "",
  });

  const [geoLocation, setGeoLocation] = useState({
    lat: null,
    long: null,
  });

  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({ formError: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (imageFile) {
      const getGoogleMapsLocation = async () => {
        const response = await fetch(
          "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDoXymPuoD_3En9-KxcHIr3jegSR6E4G-o",
          {
            method: "POST",
          }
        );
        const data = await response.json();
        setGeoLocation({
          lat: data.location.lat,
          long: data.location.lng,
        });
      };
      getGoogleMapsLocation();
    }
  }, [imageFile, errors]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
    submitdata.append("file", imageFile);
    submitdata.append("added_by", user.email);

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
        tree_age: "",
      });
      setGeoLocation({ lat: null, long: null });
      setImageFile(null);
      setErrors({ formError: null });
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
    formData.tree_name && geoLocation.lat && geoLocation.long && imageFile;

  return isLoading ? (
    <LoaderComponent />
  ) : (
    <div className="w-full mt-12 flex justify-center items-center">
      <div className="w-4/5 sm:w-[70%] md:w-[60%] lg:w-[30%] h-fit py-5 border border-gray-300 rounded-lg px-1">
        <h1 className="text-center font-serif font-semibold text-lg">
          Add Tree 🪖
        </h1>
        <div className="mt-5 px-3 w-full flex flex-col space-y-3">
          <CameraCapture setImageFile={setImageFile} imageFile={imageFile} />
          <div>
            <label htmlFor="tree_name" className="font-medium font-serif">
              Tree Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="tree_name"
                className="font-normal p-2 text-sm border border-zinc-400 w-full h-7 rounded placeholder:text-sm relative"
                value={formData.tree_name}
                onChange={handleInputChange}
                placeholder="Enter the tree name"
                required
              />
              <div className="absolute  rounded-full text-red-700 font-semibold text-base -top-4  right-0 ">
                *
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="email" className="font-medium font-serif">
              Your Email:
            </label>
            <input
              type="text"
              name="email"
              className="font-normal p-2 text-sm border border-zinc-400 w-full h-7 rounded placeholder:text-sm"
              value={user?.email}
              readOnly
              placeholder="Email Address"
            />
          </div>
          <div>
            <label htmlFor="tree_age" className="font-medium font-serif">
              Tree Age
            </label>
            <input
              type="text"
              name="tree_age"
              className="font-normal p-2 text-sm border border-zinc-400 w-full h-7 rounded placeholder:text-sm"
              value={formData.tree_age}
              onChange={handleInputChange}
              placeholder="Enter the tree age"
            />
          </div>
        </div>
        <div className="w-full px-3 mt-5">
          <button
            onClick={submitHandler}
            className={`w-full p-2 rounded-lg mt-3 ${
              isSubmitting || !isFormValid
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-500 text-white"
            }`}
            disabled={isSubmitting || !isFormValid}
          >
            {isSubmitting ? "Submitting..." : "Add Tree"}
          </button>

          {errors.formError && (
            <p className="text-xs text-red-600 my-2">{errors.formError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applayout(AddTreeForm);
