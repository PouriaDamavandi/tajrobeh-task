import { lazy, Suspense } from "react";

const CartApp = lazy(() => import("cart_app/cart_app"));
const ProductApp = lazy(() => import("products_app/products_app"));

function App() {
  return (
    <div>
      Im a container-app
      <Suspense fallback={<div>Loading Cart App...</div>}>
        <CartApp />
      </Suspense>
      <Suspense fallback={<div>Loading Products App...</div>}>
        <ProductApp />
      </Suspense>
    </div>
  );
}

export default App;
