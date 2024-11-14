import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateCar from "./UpdateCar";
import DeleteCar from "./DeleteCar";

const ManageCarsPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:8000/api/cars", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCars(response.data.data);
      } catch (err) {
        console.log("Error fetching cars:", err);
      }
    };

    fetchCars();
  }, []);

  return (
    <div>
      <h1 className="font-bold  text-3xl">Manage Your Cars</h1>
      {cars.map((car) => (
        <div key={car._id} className="car-card">
          <h3>{car.title}</h3>
          <p>{car.description}</p>
          <UpdateCar carId={car._id} />
          <DeleteCar carId={car._id} />
        </div>
      ))}
    </div>
  );
};

export default ManageCarsPage;
