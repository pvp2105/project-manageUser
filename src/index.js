import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import reportWebVitals from "./reportWebVitals";
import "@fortawesome/fontawesome-free/css/all.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// 1. Login. Axios. Store to local Storage
// 2. Private routes. Check token
// 3. CRUD users
//   - List users
//   - Create a user
//   - Edit a user
//   - Delete a user
// 4. Customize list users
//   - Paginate list user
//   - Filter by id/email
//   - Sort by first name
// 5. Working with Excel
//   - Import excel
//   - Export Excel
