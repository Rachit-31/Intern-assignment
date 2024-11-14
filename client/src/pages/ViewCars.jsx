import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

const ViewCars = () => {
    const { products, loading, error } = useProducts();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold">Your Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {products.map((product) => (
                    <div key={product._id} className="border rounded-lg p-4 shadow-md">
                        <img
                            src={product.images[0] || "default-image.jpg"} 
                            alt={product.title}
                            className="w-full h-48 object-cover rounded-md"
                        />
                        <h3 className="mt-4 text-lg font-semibold">{product.title}</h3>
                        <p className="text-sm text-gray-600">{product.description.slice(0, 100)}...</p>
                        <Link
                            to={`/product/${product._id}`} 
                            className="text-blue-600 hover:text-blue-500 mt-2 inline-block"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewCars;
