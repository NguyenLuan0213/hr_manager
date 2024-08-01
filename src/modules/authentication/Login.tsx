import React, { useState, useEffect } from 'react';
import { Employee, getMockEmployees } from '../../data/employeesData';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import "../../assets/css/pages/auth.css";
import Logo from "../../assets/images/logo/logo.png";

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = Cookies.get('authToken');
        if (authToken) {
            alert('Bạn đã đăng nhập');
            navigate('/employees');
        }
    }, [navigate]);

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form
        const employees = getMockEmployees();
        const employee = employees.find(emp => emp.username === username && emp.password === password);
        if (employee) {
            Cookies.set('authToken', 'your-auth-token', { expires: 1 });
            Cookies.set('idUser', employee.id.toString(), { expires: 1 });
            navigate('/employees');
        } else {
            alert('Sai username hoặc password');
        }
    };

    return (
        <div id="auth">
            <div className="row h-100">
                <div className="col-lg-5 col-12">
                    <div id="auth-left">
                        <div className="auth-logo">
                            <img src={Logo} alt="Logo" />
                        </div>
                        <h1 className="auth-title">Log in.</h1>

                        <form onSubmit={handleLogin}>
                            <div className="form-group position-relative has-icon-left mb-4">
                                <input
                                    type="text"
                                    className="form-control form-control-xl"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <div className="form-control-icon">
                                    <i className="bi bi-person"></i>
                                </div>
                            </div>
                            <div className="form-group position-relative has-icon-left mb-4">
                                <input
                                    type="password"
                                    className="form-control form-control-xl"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="form-control-icon">
                                    <i className="bi bi-shield-lock"></i>
                                </div>
                            </div>
                            <div className="form-check form-check-lg d-flex align-items-end">
                                <input className="form-check-input me-2" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label text-gray-600">
                                    Keep me logged in
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block btn-lg shadow-lg mt-5">Log in</button>
                        </form>
                        <div className="text-center mt-5 text-lg fs-4">
                            <p className="text-gray-600">Don't have an account? <a href="auth-register.html"
                                className="font-bold">Sign
                                up</a>.</p>
                            <p><a className="font-bold" href="auth-forgot-password.html">Forgot password?</a>.</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7 d-none d-lg-block">
                    <div id="auth-right">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;