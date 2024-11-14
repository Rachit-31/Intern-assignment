// src/components/Sidebar.js
import React from 'react';
import { FaCar, FaUpload, FaList, FaEdit } from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <aside
            className={`bg-gray-800 text-white fixed top-0 left-0 h-full z-20 transition-transform transform ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } sm:translate-x-0 w-64`}
        >
            <div className="px-4 py-6 text-2xl font-semibold text-center">
                Car Management
            </div>
            <nav className="mt-8">
                <ul>
                    <li className="hover:bg-gray-700 p-4 cursor-pointer">
                        <FaCar className="inline mr-3" /> Dashboard
                    </li>
                    <li className="hover:bg-gray-700 p-4 cursor-pointer">
                        <FaUpload className="inline mr-3" /> Upload Car
                    </li>
                    <li className="hover:bg-gray-700 p-4 cursor-pointer">
                        <FaList className="inline mr-3" /> View Cars
                    </li>
                    <li className="hover:bg-gray-700 p-4 cursor-pointer">
                        <FaEdit className="inline mr-3" /> Manage Cars
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
