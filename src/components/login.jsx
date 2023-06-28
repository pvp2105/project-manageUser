import React, { useEffect } from 'react';
import { loginApi } from '../services/UserService';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getEmail, getEmailHeader, getPassword, getShowPassword, getLoadingApi } from '../reducers/userSlice'

function Login() {
    const navigate = useNavigate()

    const dispatch = useDispatch();

    const { email, password, isShowPassword, loadingApi } = useSelector((state) => state.userReducer)

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            navigate('/')
        }
    })

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Email/Password is required')
            return
        }
        dispatch(getLoadingApi(true))
        let res = await loginApi(email, password)
        if (res && res.token) {
            localStorage.setItem('token', res.token)
            navigate('/')
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error)
            }
        }
        dispatch(getEmailHeader(email))
        dispatch(getLoadingApi(false))
    }

    return (
        <div className='d-flex flex-row align-items-center justify-content-center'>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <div>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                    <button type="button" className="btn btn-primary btn-floating mx-1">
                                        <i className="fab fa-facebook-f"></i>
                                    </button>

                                    <button type="button" className="btn btn-primary btn-floating mx-1">
                                        <i className="fab fa-twitter"></i>
                                    </button>

                                    <button type="button" className="btn btn-primary btn-floating mx-1">
                                        <i className="fab fa-linkedin-in"></i>
                                    </button>
                                </div>

                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                                </div>

                                {/* Email input */}
                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="form3Example3"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid email address"
                                        value={email}
                                        onChange={(event) => dispatch(getEmail(event.target.value))}
                                    />
                                    <label className="form-label" htmlFor="form3Example3">
                                        Email address
                                    </label>
                                </div>

                                {/* Password input */}
                                <div className="form-outline mb-3" style={{ position: 'relative' }}>
                                    <input
                                        type={isShowPassword === true ? 'text' : 'password'}
                                        id="form3Example4"
                                        className="form-control form-control-lg"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(event) => dispatch(getPassword(event.target.value))}
                                    />
                                    <i className={isShowPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                                        style={{ position: 'absolute', cursor: 'pointer', right: '15px', top: '16px' }}
                                        onClick={() => dispatch(getShowPassword(!isShowPassword))} //!isShowPassword: set giá trị ngược lại với giá trị hiện tại
                                    ></i>
                                    <label className="form-label" htmlFor="form3Example4">
                                        Password
                                    </label>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <a href="#!" className="text-body">
                                        Forgot password?
                                    </a>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button
                                        type="submit"
                                        disabled={email && password ? false : true}
                                        className={email && password ? 'btn btn-primary btn-lg' : 'btn btn-warning btn-lg'}
                                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                                        onClick={() => handleLogin()}
                                    >
                                        {loadingApi && <i className="fa-solid fa-sync fa-spin me-2"></i>}
                                        Login
                                    </button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        Don't have an account? <a href="#!" className="link-danger">Register</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
}

export default Login;