import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Employee, getMockEmployeeById, updateMockEmployee } from "../../data/employeesData";
import IconDepartment from "../../assets/images/nv/department-svgrepo-com.svg";

const EmployeeUpdate: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [initialFormData, setInitialFormData] = useState<Employee | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState<Employee>({
        id: 0,
        name: '',
        phone: '',
        email: '',
        gender: true,
        born: new Date(),
        status: true,
        role: '',
        idDepartment: 0,
        username: '',
        password: '',
        avatar: '',
    });
    

    useEffect(() => {
        if (id) {
            const data = getMockEmployeeById(parseInt(id));
            if (data) {
                setInitialFormData(data);
                setFormData(data);
                setAvatarPreview(data.avatar || '');
            } else {
                alert('Employee not found');
                navigate('/employees');
            }
        }
    }, [id, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, type, value } = e.target as HTMLInputElement | HTMLSelectElement;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = new Date(e.target.value);
        setFormData(prevState => ({
            ...prevState,
            born: dateValue
        }));
    };

    const toggleGender = () => {
        setFormData(prevState => ({
            ...prevState,
            gender: !prevState.gender
        }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prevState => ({
                    ...prevState,
                    avatar: reader.result as string
                }));
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name) newErrors.name = 'Họ và tên không hợp lệ';
        if (!formData.email) newErrors.email = 'Email không hợp lệ';
        if (!formData.phone || !/^\+?\d+$/.test(formData.phone)) newErrors.phone = 'Số điện không hợp lệ';
        if (!formData.password) newErrors.password = 'Mật khẩu không hợp lệ';
        if (!formData.role) newErrors.role = 'Chức vụ không hợp lệ';
        if (!formData.born) newErrors.born = 'Ngày sinh không hợp lệ';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        const updatedEmployee = updateMockEmployee(formData);
        if (updatedEmployee) {
            alert('Chỉnh sửa nhân viên thành công!');
            navigate(`/employees/${id}`);
        } else {
            alert('Chỉnh sửa nhân viên thất bại!, vui lòng thử lại');
        }
    };

    const handleReset = () => {
        if (initialFormData) {
            setFormData(initialFormData);
            setAvatarPreview(initialFormData.avatar || '');
            setErrors({});
        }
    };

    return (
        <div className="col-md-6 col-12">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Chỉnh sửa thông tin</h4>
                </div>
                <div className="card-content">
                    <div className="card-body">
                        <form className="form form-horizontal" onSubmit={handleSubmit}>
                            <div className="form-body">
                                <div className="row">
                                    {/* Avatar Upload */}
                                    <div className="col-md-4">
                                        <label>Ảnh đại diện</label>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="form-control"
                                                onChange={handleAvatarChange}
                                            />
                                            {avatarPreview && (
                                                <div className="mt-2">
                                                    <img src={avatarPreview} alt="Avatar preview" style={{ width: 100, height: 100, objectFit: 'cover' }} />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Existing Fields */}
                                    <div className="col-md-4">
                                        <label htmlFor="name">Họ và tên</label>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group has-icon-left">
                                            <div className="position-relative">
                                                <input
                                                    type="text"
                                                    id="name"
                                                    className="form-control"
                                                    placeholder="Name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                                {errors.name && <small className="text-danger">{errors.name}</small>}
                                                <div className="form-control-icon">
                                                    <i className="bi bi-person"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group has-icon-left">
                                            <div className="position-relative">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    className="form-control"
                                                    placeholder="Email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                                {errors.email && <small className="text-danger">{errors.email}</small>}
                                                <div className="form-control-icon">
                                                    <i className="bi bi-envelope"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="phone">Số điện thoại</label>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group has-icon-left">
                                            <div className="position-relative">
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    className="form-control"
                                                    placeholder="Phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                />
                                                {errors.phone && <small className="text-danger">{errors.phone}</small>}
                                                <div className="form-control-icon">
                                                    <i className="bi bi-phone"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label>Giới tính</label>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group has-icon-left">
                                            <div className="position-relative border rounded">
                                                <button
                                                    type="button"
                                                    className="btn form-control"
                                                    onClick={toggleGender}>
                                                    {formData.gender ? 'Male' : 'Female'}
                                                </button>
                                                <div className="form-control-icon">
                                                    {formData.gender ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-standing" viewBox="0 0 16 16">
                                                            <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M6 6.75v8.5a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2.75a.75.75 0 0 0 1.5 0v-2.5a.25.25 0 0 1 .5 0z"/>
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-dress" viewBox="0 0 16 16">
                                                            <path d="M8 0a2 2 0 0 1 2 2c0 .736-.404 1.375-1 1.723V5h3.05c.253 0 .479.146.6.377l2.5 5A.75.75 0 0 1 14.5 12H11v3.25a.75.75 0 0 1-1.5 0V12H6v3.25a.75.75 0 0 1-1.5 0V12H1.5a.75.75 0 0 1-.65-1.123l2.5-5A.75.75 0 0 1 3.95 5H7V3.723A2.001 2.001 0 0 1 8 0zM4.36 10.5h7.28l-2-4H6.36l-2 4z"/>
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="born">Ngày sinh</label>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group has-icon-left">
                                            <div className="position-relative">
                                                <input
                                                    type="date"
                                                    id="born"
                                                    className="form-control"
                                                    name="born"
                                                    value={formData.born.toISOString().substr(0, 10)}
                                                    onChange={handleDateChange}
                                                />
                                                {errors.born && <small className="text-danger">{errors.born}</small>}
                                                <div className="form-control-icon">
                                                    <i className="bi bi-calendar"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="password">Mật khẩu</label>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group has-icon-left">
                                            <div className="position-relative">
                                                <input
                                                    type="password"
                                                    id="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                />
                                                {errors.password && <small className="text-danger">{errors.password}</small>}
                                                <div className="form-control-icon">
                                                    <i className="bi bi-shield-lock"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="role">Vai trò</label>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group has-icon-left">
                                            <div className="position-relative">
                                                <input
                                                    type="text"
                                                    id="role"
                                                    className="form-control"
                                                    placeholder="Role"
                                                    name="role"
                                                    value={formData.role}
                                                    onChange={handleChange}
                                                />
                                                {errors.role && <small className="text-danger">{errors.role}</small>}
                                                <div className="form-control-icon">
                                                    <i className="bi bi-people"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex justify-content-end">
                                        <button type="reset" className="btn btn-light-secondary me-1 mb-1" onClick={handleReset}>Đặt lại</button>
                                        <button type="submit" className="btn btn-primary me-1 mb-1">Lưu thay đổi</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeUpdate;
