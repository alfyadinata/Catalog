import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Products = lazy(() => import("@/pages/Product"));
const Users = lazy(() => import("@/pages/Users"));
const Settings = lazy(() => import("@/pages/Settings"));
const Categories = lazy(() => import("@/pages/Category"));

import Sidebar from "@/layouts/Sidebar";
import Header from "@/layouts/Header";
import Loading from "@/components/Loading";

interface RouteItem {
  path: string;
  element: JSX.Element;
}

const privateRoutes: RouteItem[] = [
  { path: "/", element: <Dashboard /> },
  { path: "/products", element: <Products /> },
  { path: "/users", element: <Users /> },
  { path: "/settings", element: <Settings /> },
  { path: "/categories", element: <Categories /> }, // New route for categories
];

const AppRouter: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {isAuthenticated || token ? (
          <Route
            path="*"
            element={
              <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <main className="flex-1 bg-gray-100 p-6">
                    <Suspense fallback={<Loading />}>
                      <Routes>
                        {privateRoutes.map((route, index) => (
                          <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                          />
                        ))}
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>
                    </Suspense>
                  </main>
                </div>
              </div>
            }
          />
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
