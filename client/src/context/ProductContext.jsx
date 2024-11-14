import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API } from "../utils/ApiURI"; 
import { PRODUCT_FILES } from "../utils/ApiURI"; 

// Create a Context for products
const ProductContext = createContext();

// Provide context values to the component tree
export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProducts = async () => {
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("token");

            
            if (!token) {
                setError("You must be logged in to view products.");
                setLoading(false);
                return;
            }

            const response = await axios.get(`${PRODUCT_FILES}/cars`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass the token here
                },
            });

            // Set the fetched products
            setProducts(response.data.data);
            console.log(response.data.data)
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError("Error fetching products.");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, loading, error }}>
            {children}
        </ProductContext.Provider>
    );
};

// Custom hook to use product context
export const useProducts = () => {
    return useContext(ProductContext);
};