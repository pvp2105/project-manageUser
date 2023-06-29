import Header from "../components/header";
import TableUser from "../components/tableUser";
import { ToastContainer } from "react-toastify";

function ManageUsersPage() {

  return (
    <div>
      <div>
        <Header />
        <div className="container app-container">
          <TableUser />
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

export default ManageUsersPage;
