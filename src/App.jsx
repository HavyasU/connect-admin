import React, { useEffect, useState, useRef } from "react";
import { Box, Button, useColorMode } from "@chakra-ui/react";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Flip, toast, ToastContainer } from "react-toastify";
import StatCards from "./components/StatCards/StatCards";
import Stats from "./pages/Stats/Stats";
import Users from "./pages/Users/Users";
import Posts from "./pages/Posts/Posts";
import "./index.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";
import { fetchRequestCaller } from "./utils";
import Login from "./pages/Login/Login";
import "react-toastify/dist/ReactToastify.css";

const backend_url =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/";
let adminToken = localStorage.getItem("connectadmin");
export const serverCon = axios.create({
  baseURL: backend_url,
  responseType: "json",
  headers: {
    Authorization: adminToken ? "Bearer " + adminToken : "",
  },
});
export const baseUrlForUploads = backend_url + "uploads";

export const ToastMessage = (message) => {
  toast(message);
};

const Layout = () => {
  const location = useLocation();
  return adminToken !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

function App() {
  const [admin, setAdmin] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  let mouseDivRef = useRef();
  const fetchPosts = async (search) => {
    let res = await fetchRequestCaller({
      url: "/admin/posts",
      method: "POST",
      data: search
        ? {
            search,
          }
        : {},
    });
    setPostsData(res?.data);
  };

  useEffect(() => {
    let adminToken = localStorage.getItem("connectadmin");
    if (adminToken) {
      setAdmin(adminToken);
    }
    fetchPosts();

    const checkJWT = () => {
      if (adminToken != null) {
        serverCon
          .get("/auth/checkToken", {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          })
          .then((res) => {
            if (res?.data?.success === "new") {
              setAdmin(res?.data?.newToken || null);
              localStorage.setItem("connectadmin", res?.data?.newToken);
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    checkJWT();
  }, []);

  return (
    <Box className="p-3">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"dark"}
        transition={Flip}
        className={"px-3 "}
      />
      <div ref={mouseDivRef} className="mousePointer"></div>
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        admin={admin}
        setAdmin={setAdmin}
      />
      <div
        className="w-full flex justify-start items-start mt-24 md:p-4
        "
      >
        {showSidebar && (
          <Box className="md:w-1/6 z-50">
            <Sidebar
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              admin={admin}
              setAdmin={setAdmin}
            />
          </Box>
        )}
        <Box className={"w-5/6 mx-auto max-md:w-full md:px-5 overflow-hidden"}>
          <Routes>
            <Route
              path="/login"
              element={<Login admin={admin} setAdmin={setAdmin} />}
            />
            <Route element={<Layout admin={admin} />}>
              <Route path="/" element={<Stats />} />

              <Route path="/users" element={<Users admin={admin} />} />
              <Route
                path="/posts"
                element={
                  <Posts postsData={postsData} fetchPosts={fetchPosts} />
                }
              />
            </Route>
          </Routes>
        </Box>
      </div>
    </Box>
  );
}

export default App;
