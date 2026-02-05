import { Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = lazy(() => import("./pages/Products"));
const Product = lazy(() => import("./pages/Product"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen text-xl">
          Loading...
        </div>
      }
    >
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </Suspense>
  );
}

export default App;
