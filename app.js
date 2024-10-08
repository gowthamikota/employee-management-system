let employees = JSON.parse(localStorage.getItem("employees")) || [];

// Function to generate unique employee ID
function generateId() {
    return employees.length > 0 ? employees[employees.length - 1].id + 1 : 1;
}

// Function to save employee data to localStorage
function saveToLocalStorage() {
    localStorage.setItem("employees", JSON.stringify(employees));
}

// Function to add employee
function addEmployee(employee) {
    employees.push(employee);
    saveToLocalStorage();
    displayEmployees();
}

// Function to display employee list
function displayEmployees() {
    const employeeTableBody = document.querySelector("#employeeTable tbody");
    employeeTableBody.innerHTML = "";

    employees.forEach(employee => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.age}</td>
            <td>${employee.designation}</td>
            <td>${employee.salary}</td>
            <td>
                <button onclick="editEmployee(${employee.id})">Edit</button>
                <button onclick="deleteEmployee(${employee.id})">Delete</button>
            </td>
        `;
        employeeTableBody.appendChild(row);
    });
}

// Function to delete employee
function deleteEmployee(id) {
    employees = employees.filter(employee => employee.id !== id);
    saveToLocalStorage();
    displayEmployees();
}

// Function to edit employee
function editEmployee(id) {
    const employee = employees.find(emp => emp.id === id);
    document.getElementById("empId").value = employee.id;
    document.getElementById("name").value = employee.name;
    document.getElementById("age").value = employee.age;
    document.getElementById("designation").value = employee.designation;
    document.getElementById("salary").value = employee.salary;
}

// Function to update employee
function updateEmployee(updatedEmployee) {
    employees = employees.map(employee => employee.id === updatedEmployee.id ? updatedEmployee : employee);
    saveToLocalStorage();
    displayEmployees();
}

// Form submission event listener
document.getElementById("employeeForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const empId = document.getElementById("empId").value;
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const designation = document.getElementById("designation").value;
    const salary = document.getElementById("salary").value;

    if (empId) {
        // Update existing employee
        const updatedEmployee = { id: parseInt(empId), name, age, designation, salary };
        updateEmployee(updatedEmployee);
    } else {
        // Add new employee
        const newEmployee = { id: generateId(), name, age, designation, salary };
        addEmployee(newEmployee);
    }

    // Reset form
    document.getElementById("empId").value = '';
    document.getElementById("name").value = '';
    document.getElementById("age").value = '';
    document.getElementById("designation").value = '';
    document.getElementById("salary").value = '';
});

// Initial display of employees
displayEmployees();
