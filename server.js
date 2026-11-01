const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// --- MOCK DATABASE (Database error bypass cheyyadaniki temporary data) ---
let tasks = [
    { id: 1, title: "Design Landing Page", status: "To Do", branch: "Hyderabad", employee: "Rahul" },
    { id: 2, title: "Setup Database API", status: "In Progress", branch: "Bangalore", employee: "Priya" }
];

let employees = [
    { id: 1, name: "Rahul", branch: "Hyderabad" },
    { id: 2, name: "Priya", branch: "Bangalore" }
];

// Test route
app.get('/', (req, res) => {
    res.json({ message: "ABC Technologies Task Management API is running with Mock Data!" });
});

// 1. Get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// 2. Create a new task
app.post('/api/tasks', (req, res) => {
    const newTask = { 
        id: tasks.length + 1, 
        title: req.body.title,
        status: req.body.status || "To Do",
        branch: req.body.branch || "Hyderabad",
        employee: req.body.employee || "Unassigned"
    };
    tasks.push(newTask);
    res.status(201).json({ message: "Task created successfully!", newTask });
});

// 3. Update task status (Drag & Drop kosam)
app.put('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    task.status = req.body.status || task.status;
    res.json({ message: "Task updated successfully!", task });
});

// 4. Get all employees
app.get('/api/employees', (req, res) => {
    res.json(employees);
});

// 5. Add an Employee
app.post('/api/employees', (req, res) => {
    const newEmp = { 
        id: employees.length + 1, 
        name: req.body.name,
        branch: req.body.branch 
    };
    employees.push(newEmp);
    res.status(201).json({ message: "Employee added successfully!", newEmp });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running successfully on port ${PORT}`);
});