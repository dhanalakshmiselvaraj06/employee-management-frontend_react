import { useEffect, useState } from "react";
import axios from "axios";
import "./Register.css";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";
function Dashboard() {

    const [employees, setEmployees] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [salary, setSalary] = useState("");
    const [editingId, setEditingId] = useState(null);

    const fetchEmployees = async () => {

        try {

            const response = await axios.get(
                "https://employee-management-system-java-eda7.onrender.com/employees"
            );

            setEmployees(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    const handleAddEmployee = async () => {

        try {

            await axios.post(
                
                    "https://employee-management-system-java-eda7.onrender.com/employees",
                {
                    name,
                    email,
                    department,
                    salary
                }
            );

            fetchEmployees();

            setName("");
            setEmail("");
            setDepartment("");
            setSalary("");

        } catch (error) {

            console.error(error);
        }
    };

    const handleEditEmployee = (employee) => {

    setEditingId(employee.id);

    setName(employee.name);
    setEmail(employee.email);
    setDepartment(employee.department);
    setSalary(employee.salary);
};

    const handleDeleteEmployee = async (id) => {

    try {

        await axios.delete(
            `https://employee-management-system-java-eda7.onrender.com/employees/${id}`
        );

        fetchEmployees();

    } catch (error) {

        console.error(error);
    }
};

const handleUpdateEmployee = async () => {

    try {

        await axios.put(
            `https://employee-management-system-java-eda7.onrender.com/employees/${editingId}`,
            {
                name,
                email,
                department,
                salary
            }
        );

        fetchEmployees();

        setEditingId(null);

        setName("");
        setEmail("");
        setDepartment("");
        setSalary("");

    } catch (error) {

        console.error(error);
    }
};
    useEffect(() => {

        fetchEmployees();

    }, []);
    const isAuthenticated =
    localStorage.getItem("authenticated");
    if (!isAuthenticated) {

    return (

        <div className="container">

            <div className="card">

                <h2>Please Login First</h2>

            </div>

        </div>
    );
}
const departmentData = [];

const departmentCount = {};

employees.forEach((employee) => {

    const dept = employee.department;

    departmentCount[dept] =
        (departmentCount[dept] || 0) + 1;
});

for (const dept in departmentCount) {

    departmentData.push({
        department: dept,
        employees: departmentCount[dept]
    });
}
    return (

        <div className="dashboard-container">

            <div className="sidebar">

                <h2>EMS</h2>

                <button
    className="sidebar-button"
    onClick={() => window.location.reload()}
>
    Dashboard
</button>

                <button
    className="sidebar-button"
    onClick={fetchEmployees}
>
    Employees
</button>

                <button
    className="sidebar-button"
    onClick={() => {
        localStorage.removeItem("authenticated");
        window.location.reload();
    }}
>
    Logout
</button>

            </div>

            <div className="dashboard-content">

                <h1>Employee Dashboard</h1>
<div className="employee-form">

    <input
        className="input"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
    />

    <input
        className="input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
    />

    <input
        className="input"
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
    />

    <input
        className="input"
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
    />

   <button
    className="button"
    onClick={
        editingId
            ? handleUpdateEmployee
            : handleAddEmployee
    }
>
    {
        editingId
            ? "Update Employee"
            : "Add Employee"
    }
</button>

<div
    style={{
        width: "100%",
        height: 300,
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "30px"
    }}
>

    <h2>
        Employee Analytics
    </h2>

    <ResponsiveContainer width="100%" height="100%">

        <BarChart data={departmentData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="department" />

            <YAxis />

            <Tooltip />

            <Bar
                dataKey="employees"
                fill="#243b55"
            />

        </BarChart>

    </ResponsiveContainer>

</div>

</div>
                <table className="employee-table">

                    <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>

                    </thead>

                    <tbody>

                    {
                        employees.map((employee) => (

                            <tr key={employee.id}>

                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.department}</td>
                                <td>
    <button
        className="delete-button"
        onClick={() => handleDeleteEmployee(employee.id)}
    >
        Delete
    </button>
    <button
    className="edit-button"
    onClick={() => handleEditEmployee(employee)}
>
    Edit
</button>
</td>

                            </tr>
                        ))
                    }

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Dashboard;