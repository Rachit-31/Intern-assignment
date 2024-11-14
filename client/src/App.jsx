// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import UploadCar from './pages/UploadCar';
import ViewCars from './pages/ViewCars';
import ManageCars from './pages/ManageCars';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />}>
                        <Route index element={<Dashboard />} />
                        <Route path="upload" element={<UploadCar />} />
                        <Route path="view" element={<ViewCars />} />
                        <Route path="manage" element={<ManageCars />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;