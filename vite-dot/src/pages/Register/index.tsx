import React, { useState } from "react";
import { useMutation } from "react-query";
import api from "@/helpers/api";
import { useNavigate, Link } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation(
    async () => {
      const response = await api.post("/auth/register", {
        username,
        password,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        navigate("/login");
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors duration-200"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Registering..." : "Register"}
          </button>
          {mutation.isError && (
            <div className="mt-4 text-red-500">
              Registration failed. Please try again.
            </div>
          )}
        </form>
        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <Link to="/login" className="text-red-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
