// src/pages/HomePage.js
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const HomePage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-grow sm:ml-64">
                <Navbar toggleSidebar={toggleSidebar} />
                <main className="pt-20 px-4 sm:px-8">
                    <h1 className="text-3xl font-semibold mb-8">
                        Welcome to the Car Management Dashboard
                    </h1>
                    <div className="p-6 bg-white shadow-lg rounded-lg">
                        {/* Placeholder for operation-specific content */}
                        <p>Select an operation from the sidebar to get started.</p>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default HomePage;
