import React from "react";
import "./App.css";
import { Products } from "../Products";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Menu } from "../Menu";
import { ProductPost } from "../Products/ProductPost";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { LogoutPage } from "../LogoutPage";
import { ProfilePage } from "../ProfilePage";
import {AuthProvider } from "../Auth"
import { ProtectedRoute } from "../Auth/ProtectedRoute";

function App() {
  return (
    <>
      <HashRouter>
        <AuthProvider>
          <Menu />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductPost />} />

            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/logout"
              element={
                <ProtectedRoute>
                  <LogoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/me"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </>
  );
}

export default App;
