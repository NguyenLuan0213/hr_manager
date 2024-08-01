import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Employee, getMockEmployeeById, updateMockEmployee, deleteMockEmployee } from "../../data/employeesData";
import '../../assets/styles/employees/EmployeesDetails.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const EmployeesByID: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [employee, setEmployee] = useState<Employee | null>(null);
    useEffect(() => {
        if (id) {
            const data = getMockEmployeeById(parseInt(id));
            if (data) {
                setEmployee(data);
            } else {
                alert('Không tìm thấy nhân viên');
                navigate('/employees');
            }
        }
    }, [id]);

    const handleUpdateEmployee = () => {
        navigate(`/employees/update/${id}`);
    };

    const handleDeleteEmployee = (id: number) => {
        if (id !== undefined) {
            alert('Đã xóa nhân viên');
            deleteMockEmployee(id);
            navigate('/employees');
        } else {
            alert('Không tìm thấy mã nhân viên');
        }
    }

    return (
        <div className="emp-employee-container">
            <div className="emp-page-heading">
                <h3>Chi tiết nhân viên</h3>
                {employee && (
                    <div>
                        <div className="emp-avatar-container">
                            <img src={employee.avatar} alt={`${employee.name}'s avatar`} className="emp-avatar-image" />
                        </div>
                        <div className="emp-employee-details">
                            <p><strong>Mã Nhân Viên:</strong> {id}</p>
                            <p><strong>Tên:</strong> {employee.name}</p>
                            <p><strong>SĐT:</strong> {employee.phone}</p>
                            <p><strong>Email:</strong> {employee.email}</p>
                            <p><strong>Giới tính:</strong> {employee.gender ? 'Male' : 'Female'}</p>
                            <p><strong>Ngày Sinh:</strong> {new Date(employee.born).toDateString()}</p>
                            <p><strong>Trạng Thái:</strong> {employee.status ? 'Active' : 'Inactive'}</p>
                            <p><strong>Chức Vụ:</strong> {employee.role}</p>
                            <p><strong>Mã phòng ban:</strong> {employee.idDepartment}</p>                        </div>
                    </div>
                )}
            </div>
            <div className="emp-card">
                <div className="emp-card-body">
                    <div className="emp-buttons align-left">
                        <a className="emp-btn emp-btn-primary" onClick={handleUpdateEmployee}>Chỉnh sửa</a>
                        <a className="emp-btn emp-btn-danger" onClick={() => handleDeleteEmployee(employee?.id || 0)}>Xóa nhân viên</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeesByID;