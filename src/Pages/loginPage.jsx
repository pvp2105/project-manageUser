import Header from "../components/header";
import Login from "../components/login";
import { ToastContainer } from "react-toastify";

function LoginPage() {
    return (
        <div>
            <div>
                <Header />
                <div className="container app-container">
                    <Login />
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

export default LoginPage;
