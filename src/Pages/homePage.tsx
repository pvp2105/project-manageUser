import Header from "../components/header";
import { ToastContainer } from "react-toastify";
import { useAppSelector } from "../stores/store";

function HomePage() {
  const { emailHeader } = useAppSelector((state) => state.userReducer);
  return (
    <div>
      <div>
        <Header />
        <div className="container app-container">
          <div>
            1. Login. Axios. Store to local Storage 2. Private routes. Check
            token 3. CRUD users - List users - Create a user - Edit a user -
            Delete a user 4. Customize list users - Paginate list user - Filter
            by id/email - Sort by first name 5. Working with Excel - Import
            excel - Export Excel
          </div>
          {!emailHeader && <a href="/login">Go to Login</a>}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default HomePage;
