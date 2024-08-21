import { useState } from "react";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div
                className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-200 ease-in-out`}
            >
                {/* Logo */}
                <div className="text-white text-2xl font-semibold text-center">
                    MyApp
                </div>
                {/* Menu items */}
                <nav>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                        Dashboard
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                        Tree
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                        Edit Request 
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                        Logout
                    </a>
                </nav>
            </div>

            {/* Toggle Button */}
            <button
                className="p-2 bg-gray-800 text-white rounded-md m-2"
                onClick={toggleSidebar}
            >
                {isOpen ? "Close" : "Open"}
            </button>

            {/* Content */}
            <div className="p-8 ml-16">
                <h1 className="text-3xl font-semibold">Content Area</h1>
                <p>This is where your main content will go.</p>
            </div>
        </div>
    );
};

export default Sidebar;
