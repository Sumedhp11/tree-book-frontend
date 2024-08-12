/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useLocation } from "react-router-dom";

/* eslint-disable react/display-name */
const Applayout = (WrappedComponent) => {
  return ({ user, isLoading }) => {
    const location = useLocation();
    return (
      <div className="sm:h-screen h-dvh w-full grid grid-rows-12">
        <div className="flex justify-end items-center py-4 w-full bg-green-600 text-black row-span-1">
          <ul className="flex justify-center gap-4 items-center mr-5">
            <Link
              className={`text-base font-normal ${
                location.pathname === "/add-tree"
                  ? "bg-zinc-300 text-black p-1 rounded"
                  : "text-white"
              }`}
              to={"/add-tree"}
            >
              Add Tree Form
            </Link>
            <Link
              className={`text-base font-normal ${
                location.pathname === "/tree-map"
                  ? "bg-zinc-300 text-black p-1 rounded"
                  : "text-white"
              }`}
              to={"/tree-map"}
            >
              Tree Map
            </Link>
          </ul>
        </div>
        <div className="row-span-11">
          <WrappedComponent user={user} isLoading={isLoading} />
        </div>
      </div>
    );
  };
};

export default Applayout;
