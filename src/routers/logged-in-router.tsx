import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../components/common/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { Restaurants } from "../pages/client/restaurants";
import { ConfirmEmail } from "../pages/user/confirm-email";

const ClientRoutes = [
  <Route path="/" element={<Restaurants />} key="/" />,
  <Route path="/confirm" element={<ConfirmEmail />} key="/confirm" />,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (loading || !data || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {data.me.role === "CLIENT" && ClientRoutes}
        <Route path="*" element={<NotFound />} key="/404" />
      </Routes>
    </BrowserRouter>
  );
};
