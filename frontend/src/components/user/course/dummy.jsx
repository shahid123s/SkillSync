import { useState } from "react";
import {adminAxiosInstance} from "../../../utils/adminAxiosInstance";

export default function CreateCourseForm() {
  const [courseData, setCourseData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!courseData.name || !courseData.description || !courseData.price) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await adminAxiosInstance.post("/course/add-course", { courseData });
      setSuccess(response.data.message);
      setCourseData({ name: "", description: "", price: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create course.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-xl font-semibold mb-4">Create Course</h2>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          value={courseData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
        <textarea
          name="description"
          placeholder="Course Description"
          value={courseData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="number"
          name="price"
          placeholder="Course Price"
          value={courseData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Create Course
        </button>
      </form>
    </div>
  );
}
