import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
// import api from "@/helpers/api";
import { login } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation(
    async () => {
      // const response = await api.post("/users", {
      //   username,
      //   password,
      // });
      // if (response.data.length === 0) throw new Error("Invalid credentials");
      // const credential = {
      //   ...response.data[0],
      // };
      const credential = {
        username: "Stive",
        token: "123123",
      };
      return credential;
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        dispatch(login({ token: data.token, username: data.username }));
        navigate("/");
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
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
            {mutation.isLoading ? "Logging in..." : "Login"}
          </button>
          {mutation.isError && (
            <div className="mt-4 text-red-500">
              Login failed. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
