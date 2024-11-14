import { useState } from "react";
const DeleteCar = ({ carId }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
  
    const handleDelete = async () => {
      setLoading(true);
      setError("");
      setSuccess("");
  
      try {
        const token = localStorage.getItem("token");
  
        await axios.delete(`http://localhost:8000/api/car/${carId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setSuccess("Car deleted successfully.");
        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (err.response) {
          setError(err.response.data.message || "Failed to delete car.");
        } else {
          setError("An error occurred while deleting the car.");
        }
      }
    };
  
    return (
      <div>
        <button onClick={handleDelete} disabled={loading}>
          {loading ? "Deleting..." : "Delete Car"}
        </button>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </div>
    );
  };
  
  export default DeleteCar;
  