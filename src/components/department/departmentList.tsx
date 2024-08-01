import React, { useState, useEffect } from 'react';
import { Department, getMockDepartment } from '../../data/departmentData';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Departments: React.FC = () => {
    const navigate = useNavigate();
    const [authToken, setAuthToken] = useState<string | undefined>(Cookies.get('authToken'));
    const [department, setDepartment] = useState<any[]>([]);

    useEffect(() => {
        if (!authToken) {
            alert('Bạn chưa đăng nhập');
            navigate('/login');
        }
    }, [authToken, navigate]);

    useEffect(() => {
        const data = getMockDepartment();
        setDepartment(data);
        console.log(department);
    }, []);


    return (
        <div>
            <div className="page-heading">
                <h3>Danh Sách Phòng Ban</h3>
            </div>
            <div className="card">
                <div className="card-body">
                    <table className="table table-striped table-hover" id="table1">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên Phòng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {department.map((department) => (
                                <tr key={department.id}>
                                    <td>{department.id}</td>
                                    <td>{department.nameDepartment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Departments;