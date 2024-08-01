import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Logout from '../modules/authentication/Logout';
import Logo from '../assets/images/logo/logo.png';
import { Employee, getMockEmployees } from '../data/employeesData';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../assets//styles/layout/Layout.css';


const Layout: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<Employee | null>(null);

    useEffect(() => {
        const authToken = Cookies.get('authToken');
        if (!authToken) {
            alert('Bạn chưa đăng nhập');
            window.location.href = '/login';
        } else {
            const idUser = Cookies.get('idUser');
            if (idUser) {
                const employees = getMockEmployees();
                const employee = employees.find(emp => emp.id === parseInt(idUser));
                if (employee) {
                    setUser(employee);
                }
            }
        }
    }, []);


    const handleChangeEmployeeList = () => {
        navigate('/employees');
    }

    const handleChangeDepartment = () => {
        navigate('/departments');
    }

    const handleChangeProfile = () => {
        navigate('/user');
    }

    return (
        <div id="app">
            <div id="sidebar" className="active">
                <div className="sidebar-wrapper active">
                    <div className="sidebar-header">
                        <div className="d-flex justify-content-between">
                            <div className="logo">
                                <a onClick={handleChangeEmployeeList}> <img src={Logo} alt="Logo" /></a>
                            </div>
                            <div className="toggler">
                                <a onClick={handleChangeEmployeeList} className="sidebar-hide d-xl-none d-block"><i className="bi bi-x bi-middle"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar-menu">
                        <ul className="menu">
                            <li className="sidebar-title">Menu</li>
                            <li className="sidebar-item">
                                <a className='sidebar-link' onClick={handleChangeEmployeeList}>
                                    <i className="bi bi-grid-fill"></i>
                                    <span>Danh Sách Nhân Viên</span>
                                </a>
                            </li>
                            <li className="sidebar-item  ">
                                <a className='sidebar-link' onClick={handleChangeDepartment}>
                                    <i className="bi bi-grid-fill"></i>
                                    <span>Danh Sách Phòng Ban</span>
                                </a>
                            </li>
                            <li className="sidebar-item">
                                <a className='sidebar-link' onClick={handleChangeProfile}>
                                    <i className="bi bi-person-circle"></i>
                                    <span>Hello, {user?.name}</span>
                                </a>
                            </li>
                            <li className="sidebar-title">
                                <Logout />
                            </li>
                        </ul>
                    </div>
                    <button className="sidebar-toggler btn x"><i data-feather="x"></i></button>
                </div>
            </div>
            <div id="main">
                <Outlet />
                <footer>
                    <div className="footer clearfix mb-0 text-muted">
                        <div className="float-start">
                            <p>2021 &copy; Mazer</p>
                        </div>
                        <div className="float-end">
                            <p>Crafted with <span className="text-danger"><i className="bi bi-heart"></i></span> by <a
                                href="http://ahmadsaugi.com">Ngọc Luân</a></p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Layout;