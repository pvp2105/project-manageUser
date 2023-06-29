import React from "react";
import HomePage from "../Pages/homePage";
import LoginPage from "../Pages/loginPage";
import ManageUsersPage from "../Pages/manageUsersPage";

import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./privateRoutes";

function PublicRoutes(props: any) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/manageUsers"
          element={
            <PrivateRoutes>
              <ManageUsersPage />
            </PrivateRoutes>
          }
        />
      </Routes>
    </div>
  );
}

export default PublicRoutes;
