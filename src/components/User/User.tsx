import React, { useEffect, useState } from 'react';
import { Employee, getMockEmployees } from '../../data/employeesData';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../../assets/styles/user/User.css';

const User: React.FC = () => {
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

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-profile">
            <h1 className="user-title">Thông tin cá nhân</h1>
            <div className="avatar-container">
                <img src={user.avatar} alt={`${user.name}'s avatar`} className="avatar-image" />
            </div>
            <div className="user-details">
                <p><strong>Tên:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>SĐT:</strong> {user.phone}</p>
                <p><strong>Giới tính:</strong> {user.gender ? 'Male' : 'Female'}</p>
                <p><strong>Ngày sinh:</strong> {user.born.toLocaleDateString()}</p>
                <p><strong>Hoạt động:</strong> {user.status ? 'Active' : 'Inactive'}</p>
                <p><strong>Chức vụ:</strong> {user.role}</p>
                <p><strong>Mã phòng ban:</strong> {user.idDepartment}</p>
            </div>
        </div>
    );
}

export default User;