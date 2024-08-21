import { LayoutDashboard, Trees, FilePenLine } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
    const location = useLocation();
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
            label: "Edit Request",
            icon: FilePenLine,
        },
    ];
    return (
        <div className="w-full flex flex-col items-center  h-full px-2 bg-green-600">
            <h1 className="mt-4 text-lg font-normal text-white">Welcome Admin</h1>
            <div className="w-[90%] flex flex-col space-y-5 mt-10">
                {sideBarLinks.map((i) => (
                    <Link
                        key={i.label}
                        to={i.href}
                        className={`w-full flex gap-5 p-2 rounded-md ${location.pathname === i.href
                                ? "bg-white text-black"
                                : "border text-white"
                            }`}
                    >
                        <i.icon
                            size={25}
                            className={`${location.pathname === i.href
                                    ? "bg-white text-black"
                                    : "text-white"
                                }`}
                        />
                        <p>{i.label}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
