import React, { useEffect, useState } from 'react';
import { Employee, getEmployees } from '../../data/employeesData';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/employees/EmployeesList.css';
import Cookies from 'js-cookie';

const Employees: React.FC = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); // Số lượng nhân viên trên mỗi trang
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const authToken = Cookies.get('authToken');
        if (!authToken) {
            alert('Bạn chưa đăng nhập');
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const data = getEmployees() as Employee[];
        setEmployees(data);
        setFilteredEmployees(data);
    }, []);

    useEffect(() => {
        const filtered = employees.filter(employee =>
            employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.phone.includes(searchTerm) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEmployees(filtered);
        setTotalPages(Math.ceil(filtered.length / pageSize));
        setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
    }, [searchTerm, employees, pageSize]);

    const handleEmployeeClick = (id: number) => {
        navigate(`/employees/${id}`);
    };

    const handleAddEmployee = () => {
        navigate('/employees/add');
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(Number(event.target.value));
    };

    // Lấy nhân viên của trang hiện tại
    const paginatedEmployees = filteredEmployees.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div>
            <div className="page-heading">
                <h3>Danh sách nhân viên</h3>
            </div>
            <div className="card-body">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên, email, số điện thoại..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <input
                        type="number"
                        placeholder="Items per page"
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        min={1}
                    />
                </div>
                <div className='align-left'>
                    <div className="buttons">
                        <a className="btn btn-primary" onClick={handleAddEmployee}>Thêm Nhân Viên</a>
                    </div>
                </div>

                <table className="table table-striped table-hover" id="table1">
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Email</th>
                            <th>SĐT</th>
                            <th>Ngày Sinh</th>
                            <th>Hoạt Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedEmployees.map((employee) => (
                            <tr
                                key={employee.id}
                                onClick={() => handleEmployeeClick(employee.id)}
                                style={{ cursor: 'pointer' }}
                                className="table-row"
                            >
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.born.toDateString()}</td>
                                <td>
                                    <span className={`badge ${employee.status ? 'bg-success' : 'bg-danger'}`}>
                                        {employee.status ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Phân trang */}
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Employees;
