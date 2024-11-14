// src/components/Navbar.js
import React from 'react';
import { FaBars } from 'react-icons/fa';

const Navbar = ({ toggleSidebar }) => {
    return (
        <header className="bg-gray-100 shadow-md fixed w-full top-0 z-10 flex items-center justify-between p-4">
            {/* Sidebar Toggle Button for Mobile */}
            <button
                className="text-gray-800 sm:hidden"
                onClick={toggleSidebar}
            >
                <FaBars size={24} />
            </button>
            <div className="flex-grow">
                <input
                    type="text"
                    placeholder="Search cars..."
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
            </div>
        </header>
    );
};

export default Navbar;
