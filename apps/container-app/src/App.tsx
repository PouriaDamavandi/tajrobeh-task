import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy load the remote components - use the correct module names
const ProductsApp = lazy(() => import("products_app/ProductsApp"));
const CartApp = lazy(() => import("cart_app/CartApp"));

const App: React.FC = () => {
  return (
    <>
      <ProductsApp />
      <CartApp />

      <Router>
        <div className="min-h-screen bg-gray-50">
          <main>
            <Routes>
              <Route
                path="/products"
                element={
                  <Suspense fallback={<div>loading ...</div>}>
                    <ProductsApp />
                  </Suspense>
                }
              />
              <Route
                path="/cart"
                element={
                  <Suspense fallback={<div>loading ...</div>}>
                    <CartApp />
                  </Suspense>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
};

export default App;
