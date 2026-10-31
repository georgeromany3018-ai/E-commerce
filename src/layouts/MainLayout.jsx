import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Toaster } from "react-hot-toast";

export default function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-base">
      <Navbar />
      <Toaster position="top-center" />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
