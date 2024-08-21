/* eslint-disable react/display-name */
import Sidebar from "./Sidebar";

const AdminLayout = (WrappedComponent) => {
  return () => {
    return (
      <div className="grid grid-cols-12 w-full h-dvh md:h-screen border border-black bg-gray-100">
        <div className="col-span-2 ">
          <Sidebar />
        </div>
        <div className="col-span-10">
          <WrappedComponent />
        </div>
      </div>
    );
  };
};

export default AdminLayout;