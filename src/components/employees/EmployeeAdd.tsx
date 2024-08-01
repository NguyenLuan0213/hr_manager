import React, { useState } from 'react';
import { addMockEmployee, Employee } from '../../data/employeesData';
import { useNavigate } from 'react-router-dom';

const EmployeeAdd: React.FC = () => {
    const [isFemale, setIsFemale] = useState(false);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [idDepartment, setIdDepartment] = useState<number>(0);
    const [born, setBorn] = useState<Date | undefined>(undefined);
    const [avatar, setAvatar] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!name) newErrors.name = 'Name is required';
        if (!email) newErrors.email = 'Email is required';
        if (!phone) newErrors.phone = 'Phone number is required';
        if (!username) newErrors.username = 'Username is required';
        if (!password) newErrors.password = 'Password is required';
        if (!role) newErrors.role = 'Role is required';
        if (!born) newErrors.born = 'Date of birth is required';
        if (idDepartment < 1) newErrors.idDepartment = 'ID PB is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const toggleGender = () => {
        setIsFemale(!isFemale);
    };

    const handleAddEmployee = (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateForm()) return;

        const employee: Omit<Employee, 'id'> = {
            name,
            username,
            email,
            phone,
            password,
            role,
            idDepartment,
            born: born || new Date(),
            gender: isFemale,
            status: true,
            avatar
        };
        addMockEmployee(employee as Employee);
        navigate('/employees');
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleReset = () => {
        setName('');
        setUsername('');
        setEmail('');
        setPhone('');
        setPassword('');
        setRole('');
        setIdDepartment(0);
        setBorn(undefined);
        setAvatar('');
        setErrors({});
    };

    return (
        <div className="col-md-6 col-12">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Thêm Nhân Viên</h4>
                </div>
                <div className="card-content">
                    <div className="card-body">
                        <form className="form form-horizontal" onSubmit={handleAddEmployee}>
                            <div className="form-body">
                                <div className="row">
                                    {/* Avatar */}
                                    <div className="col-md-4">
                                        <label>Hình đại diện</label>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="form-control"
                                                onChange={handleAvatarChange}
                                            />
                                            {avatar && (
                                                <div className="mt-2">
                                                    <img src={avatar} alt="Avatar preview" style={{ width: 100, height: 100, objectFit: 'cover' }} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* Name */}
                                    <div className="col-md-4">
                                        <label htmlFor="name">Họ Và Tên</label>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group has-icon-left">
                                            <div className="position-relative">
                                                <input
                                                    type="text"
                                                    id="name"
                                                    className="form-control"
                                                    placeholder="Name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                                <div className="form-control-icon">
                                                    <i className="bi bi-person"></i>
                                                </div>
                                            </div>
                                            {errors.name && <small className="text-danger">{errors.name}</small>}
                                        </div>
                                    </div>
                                    {/* Email */}
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
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <div className="form-control-icon">
                                                    <i className="bi bi-envelope"></i>
                                                </div>
                                            </div>
                                            {errors.email && <small className="text-danger">{errors.email}</small>}
                                        </div>
                                    </div>
                                    {/* Phone */}
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
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                                <div className="form-control-icon">
                                                    <i className="bi bi-phone"></i>
                                                </div>
                                            </div>
                                            {errors.phone && <small className="text-danger">{errors.phone}</small>}
                                        </div>
                                    </div>
                                    {/* Username */}
                                    <div className="col-md-4">
                                        <label htmlFor="username">Username</label>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group has-icon-left">
                                            <div className="position-relative">
                                                <input
                                                    type="text"
                                                    id="username"
                                                    className="form-control"
                                                    placeholder="Username"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                                <div className="form-control-icon">
                                                    <i className="bi bi-person"></i>
                                                </div>
                                            </div>
                                            {errors.username && <small className="text-danger">{errors.username}</small>}
                                        </div>
                                    </div>
                                    {/* Password */}
                                    <div className="col-md-4">
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group has-icon-left">
                                            <div className="position-relative">
                                                <input
                                                    type="password"
                                                    id="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <div className="form-control-icon">
                                                    <i className="bi bi-lock"></i>
                                                </div>
                                            </div>
                                            {errors.password && <small className="text-danger">{errors.password}</small>}
                                        </div>
                                    </div>
                                    {/* Gender */}
                                    <div className="col-md-4">
                                        <label>Gender</label>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group has-icon-left">
                                            <div className="position-relative border rounded">
                                                <button
                                                    type="button"
                                                    className="btn  form-control"
                                                    onClick={toggleGender}>
                                                    {isFemale ? 'Female' : 'Male'}
                                                </button>
                                                <div className="form-control-icon">
                                                    {isFemale ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-standing-dress" viewBox="0 0 16 16">
                                                            <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-.5 12.25V12h1v3.25a.75.75 0 0 0 1.5 0V12h1l-1-5v-.215a.285.285 0 0 1 .56-.078l.793 2.777a.711.711 0 1 0 1.364-.405l-1.065-3.461A3 3 0 0 0 8.784 3.5H7.216a3 3 0 0 0-2.868 2.118L3.283 9.079a.711.711 0 1 0 1.365.405l.793-2.777a.285.285 0 0 1 .56.078V7l-1 5h1v3.25a.75.75 0 0 0 1.5 0Z" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-standing" viewBox="0 0 16 16">
                                                            <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M6 6.75v8.5a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2.75a.75.75 0 0 0 1.5 0v-2.5a.25.25 0 0 1 .5 0" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Role */}
                                    <div className="col-md-4">
                                        <label htmlFor="role">Chức vụ</label>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group has-icon-left">
                                            <div className="position-relative">
                                                <input
                                                    type="text"
                                                    id="role"
                                                    className="form-control"
                                                    placeholder="Role"
                                                    value={role}
                                                    onChange={(e) => setRole(e.target.value)}
                                                />
                                                <div className="form-control-icon">
                                                    <i className="bi bi-briefcase"></i>
                                                </div>
                                            </div>
                                            {errors.role && <small className="text-danger">{errors.role}</small>}
                                        </div>
                                    </div>
                                    {/* Born */}
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
                                                    value={born ? born.toISOString().split('T')[0] : ''}
                                                    onChange={(e) => setBorn(e.target.value ? new Date(e.target.value) : undefined)}
                                                />
                                                <div className="form-control-icon">
                                                    <i className="bi bi-calendar"></i>
                                                </div>
                                            </div>
                                            {errors.born && <small className="text-danger">{errors.born}</small>}
                                        </div>
                                    </div>
                                    {/* ID PB */}
                                    <div className="col-md-4">
                                        <label htmlFor="idPB">Mã phòng ban</label>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group has-icon-left">
                                            <div className="position-relative">
                                                <input
                                                    type="number"
                                                    id="idPB"
                                                    className="form-control"
                                                    placeholder="ID PB"
                                                    value={idDepartment}
                                                    onChange={(e) => setIdDepartment(Number(e.target.value))}
                                                />
                                                <div className="form-control-icon">
                                                    <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000">
                                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                        <g id="SVGRepo_iconCarrier">
                                                            <title>group_fill</title>
                                                            <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <g id="Development" transform="translate(-768.000000, -48.000000)" fill-rule="nonzero">
                                                                    <g id="group_fill" transform="translate(768.000000, 48.000000)">
                                                                        <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero"> </path>
                                                                        <path d="M12,3 C10.3431,3 9,4.34315 9,6 C9,7.30622 9.83481,8.41746 11,8.82929 L11,11 L8,11 C6.34315,11 5,12.3431 5,14 L5,15.1707 C3.83481,15.5825 3,16.6938 3,18 C3,19.6569 4.34315,21 6,21 C7.65685,21 9,19.6569 9,18 C9,16.6938 8.16519,15.5825 7,15.1707 L7,14 C7,13.4477 7.44772,13 8,13 L16,13 C16.5523,13 17,13.4477 17,14 L17,15.1707 C15.8348,15.5825 15,16.6938 15,18 C15,19.6569 16.3431,21 18,21 C19.6569,21 21,19.6569 21,18 C21,16.6938 20.1652,15.5825 19,15.1707 L19,14 C19,12.3431 17.6569,11 16,11 L13,11 L13,8.82929 C14.1652,8.41746 15,7.30622 15,6 C15,4.34315 13.6569,3 12,3 Z" id="路径" fill="#09244B"> </path>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Buttons */}
                                    <div className="col-12 d-flex justify-content-end">
                                        <button type="submit" className="btn btn-primary me-1 mb-1">
                                            Add
                                        </button>
                                        <button type="button" className="btn btn-light-secondary me-1 mb-1" onClick={handleReset}>
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default EmployeeAdd;
