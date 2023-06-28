import "./App.scss";
import ManageUsersPage from "./Pages/manageUsersPage";
import HomePage from "./Pages/homePage";
import LoginPage from "./Pages/loginPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manageUsers" element={<ManageUsersPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
