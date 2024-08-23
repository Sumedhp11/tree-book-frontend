import { useMutation } from "@tanstack/react-query";
import { FilePenLine, LayoutDashboard, LogOut, Trees, BookOpenText } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../layout/AdminAuthProvider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import toast from "react-hot-toast";
const Sidebar = () => {
  const { apiClient, setToken } = useContext(AdminAuthContext);
  const location = useLocation();
  const [toastId, setToastId] = useState(null);
  const navigate = useNavigate();
  const sideBarLinks = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/admin/trees",
      label: "Trees",
      icon: Trees,
    },
    {
      href: "/admin/edit-request",
      label: "Edit Requests",
      icon: FilePenLine,
    },
    {
      href: "/admin/kb",
      label: "KB",
      icon: BookOpenText,

    }
  ];
  const { mutate } = useMutation({
    mutationFn: async () => {
      await apiClient.post(`/admin/logout`, {}, {
        withCredentials: true,
      });
    },
    onMutate: () => {
      const id = toast.loading("Logging Out");
      setToastId(id);
    },
    onSuccess: () => {
      toast.success("Logout Successfully", { id: toastId });
      setToken(null);
      navigate("/admin");
    },
    onError: () => {
      toast.error("Error While Logging out", { id: toastId });
    },
  });
  const handleLogout = async () => {
    mutate();
  };
  return (
    <div className="w-full flex flex-col items-center  h-full px-2 bg-green-600">
      <h1 className="mt-4 text-lg font-normal text-white">Welcome Admin</h1>
      <div className="w-[95%] flex flex-col space-y-5 mt-10">
        {sideBarLinks.map((i) => (
          <Link
            key={i.label}
            to={i.href}
            className={`w-full flex items-center justify-between flex-nowrap p-2 rounded-md ${location.pathname === i.href
              ? "bg-white text-black"
              : "border text-white"
              }`}
          >
            <i.icon
              size={23}
              className={`${location.pathname === i.href
                ? "bg-white text-black"
                : "text-white"
                }`}
            />
            <p className="text-sm font-medium text-nowrap">{i.label}</p>
          </Link>
        ))}
      </div>
      <AlertDialog>
        <AlertDialogTrigger className="mt-auto mb-4 w-full flex items-center justify-between  p-2 rounded-md  text-white hover:bg-white hover:text-black transition-colors">
          {" "}
          <LogOut size={23} />
          <p className="text-sm font-medium">Logout</p>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You Want to Logout</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Sidebar;
