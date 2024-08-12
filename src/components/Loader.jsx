import { Loader } from "lucide-react";

const LoaderComponent = () => {
  return (
    <div className="w-full h-dvh sm:h-screen flex justify-center items-center">
      <Loader size={30} className="animate-spin " />
    </div>
  );
};

export default LoaderComponent;
