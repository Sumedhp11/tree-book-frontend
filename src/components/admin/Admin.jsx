import Sidebar from "./Sidebar";

const AdminLayout = (WrappedComponent) => {
  const Layout = (props) => {
    return (
      <div className="grid grid-cols-12 w-full h-dvh md:h-screen overflow-hidden bg-gray-100">
        <div className="col-span-2 lg:col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-10 lg:col-span-11 p-4 overflow-y-auto">
          <WrappedComponent {...props} />
        </div>
      </div>
    );
  };

  return Layout;
};

export default AdminLayout;
