import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API, PRODUCT_FILES } from "../utils/ApiURI";

const UpdateCar = ({carId}) => {
    const navigate = useNavigate();

    const [car, setCar] = useState({
        title: "",
        description: "",
        tags: { car_type: "", company: "", dealer: "" },
        images: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${PRODUCT_FILES}/cars/${carId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCar(response.data.data);
            } catch (err) {
                setError("Failed to fetch car details.");
            }
        };
        fetchCar();
    }, [carId]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("title", car.title);
        formData.append("description", car.description);
        formData.append("car_type", car.tags.car_type);
        formData.append("company", car.tags.company);
        formData.append("dealer", car.tags.dealer);

        if (file) {
            // File size validation (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                setError("File size exceeds 5MB.");
                setLoading(false);
                return;
            }
            formData.append("image", file);
        }

        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `${PRODUCT_FILES}/car/${carId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setLoading(false);
            navigate(`/product/${carId}`);  // Redirect to the updated car details page or another page
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || "Failed to update car.");
        }
    }, [car, file, carId, navigate]);

    return (
        <div className="container mx-auto p-6">
            {error && <div className="bg-red-100 text-red-800 p-2 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={car.title}
                        onChange={(e) => setCar((prevCar) => ({ ...prevCar, title: e.target.value }))}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-gray-700">Description</label>
                    <textarea
                        id="description"
                        value={car.description}
                        onChange={(e) => setCar((prevCar) => ({ ...prevCar, description: e.target.value }))}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="tags" className="block text-gray-700">Tags</label>
                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Car Type"
                            value={car.tags.car_type}
                            onChange={(e) => setCar((prevCar) => ({ ...prevCar, tags: { ...prevCar.tags, car_type: e.target.value } }))}
                            className="w-full p-2 border rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Company"
                            value={car.tags.company}
                            onChange={(e) => setCar((prevCar) => ({ ...prevCar, tags: { ...prevCar.tags, company: e.target.value } }))}
                            className="w-full p-2 border rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Dealer"
                            value={car.tags.dealer}
                            onChange={(e) => setCar((prevCar) => ({ ...prevCar, tags: { ...prevCar.tags, dealer: e.target.value } }))}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="image" className="block text-gray-700">Image</label>
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Car"}
                </button>
            </form>
        </div>
    );
};

export default UpdateCar;
