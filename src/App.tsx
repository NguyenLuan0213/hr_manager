import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './modules/authentication/Login';
import EmployeeList from './components/employees/EmployeeList';
import EmployeesByID from './components/employees/EmployeesDetails'; 
import EmployeeAdd from './components/employees/EmployeeAdd';
import Layout from './layout/Layout';
import User from './components/User/User';
import Department from './components/department/departmentList';
import EmployeeUpdate from './components/employees/EmployeeUpdate';
import "../src/assets/css/bootstrap.css";
import "../src/assets/vendors/bootstrap-icons/bootstrap-icons.css";
import "../src/assets/css/app.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/user" element={<User />} />
          <Route path="/employees/:id" element={<EmployeesByID />} />
          <Route path="/employees/add" element={<EmployeeAdd />} />
          <Route path="/departments" element={<Department />} />
          <Route path='/employees/update/:id' element={<EmployeeUpdate />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;