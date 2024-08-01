import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm('Bạn có muốn đăng xuất không?')) {
            Cookies.remove('authToken');
            Cookies.remove('idUser');
            navigate('/login');
        }
    };

    return (
        <div className="buttons">
            <a onClick={handleLogout} className="btn btn-danger">Đăng Xuất</a>
        </div >
    );
}

export default Logout;