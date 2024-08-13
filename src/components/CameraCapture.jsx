/* eslint-disable react/prop-types */
import { Camera, CameraIcon, RotateCcw } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const CameraCapture = ({ setImageFile, imageFile }) => {
  const [showWebcam, setShowWebcam] = useState(false);
  const webcamRef = useRef(null);

  const base64ToFile = (base64, fileName) => {
    const [header, data] = base64.split(",");
    const mime = header.match(/:(.*?);/)[1];
    const binary = atob(data);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new File([new Uint8Array(array)], fileName, { type: mime });
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const file = base64ToFile(imageSrc, "captured-image.jpg");
        setImageFile(file);

        setShowWebcam(false);
      }
    }
  }, [webcamRef, setImageFile]);

  const handleRetry = () => {
    setImageFile(null);
    setShowWebcam(true);
  };

  const handleStartCamera = () => {
    setShowWebcam(true);
  };

  return (
    <div className="relative w-full ">
      {!showWebcam && !imageFile ? (
        <div
          className="w-full md:w-[68%] bg-zinc-300 rounded-md flex justify-center items-center h-56 cursor-pointer relative"
          onClick={handleStartCamera}
        >
          <Camera size={45} strokeWidth={0.9} />
          <div className="absolute w-12 h-12 rounded-full bg-green-600 text-white flex justify-center items-center bottom-4 right-4">
            <CameraIcon />
          </div>
        </div>
      ) : showWebcam ? (
        <div className="relative">
          <Webcam
            audio={false}
            ref={webcamRef}
            imageSmoothing={true}
           videoConstraints = {
      facingMode: { exact: "environment" }
    }
            screenshotFormat="image/jpeg"
            mirrored={true}
            className="h-52 w-96 bg-zinc-300 relative"
            autoPlay={true}
          />
          <div
            className="absolute bottom-4 right-4 bg-green-600 text-white p-2 rounded-full cursor-pointer"
            onClick={capture}
          >
            <CameraIcon size={24} />
          </div>
        </div>
      ) : imageFile ? (
        <div className="relative">
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Captured"
            className="h-52 w-full border border-red-600 object-contain"
          />
          <div
            onClick={handleRetry}
            className="absolute bottom-4 right-4 bg-red-600 text-white p-2 rounded-full cursor-pointer"
          >
            <RotateCcw size={24} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CameraCapture;
