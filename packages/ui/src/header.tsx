import React from "react";

export interface HeaderProps {
  cartItemCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ cartItemCount = 0 }) => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">E-Commerce Store</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="hover:underline">
                Products
              </a>
            </li>
            <li className="relative">
              <a href="/cart" className="hover:underline">
                Cart
              </a>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
