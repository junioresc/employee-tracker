const db = require(`../db/database`);
const cTable = require(`console.table`);

async function getEmployees() {
    const sql = `SELECT employees.employee_id, CONCAT(employees.first_name, ' ', employees.last_name) AS name,
        roles.title, departments.name AS department, roles.salary
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.roles_id
        LEFT JOIN departments ON roles.department_id = departments.department_id`;
    const params = [];
    const data = await db.promise().query(sql, params);
    return console.table(data[0]);
};

async function getEmployeesArr() {
    const sql = `SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS name, employee_id AS value FROM employees`;
    const params = [];
    const data = await db.promise().query(sql, params);
    return data[0];
};

async function searchByDepartment() {
    const sql = `SELECT employees.employee_id, CONCAT(employees.first_name, ' ', employees.last_name) AS name,
        roles.title, departments.name AS department, roles.salary
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.roles_id
        LEFT JOIN departments ON roles.department_id = departments.department_id
        ORDER BY department`;
    const params = [];
    const data = await db.promise().query(sql, params);
    return console.table(data[0]);
};

async function addEmployee({ firstName, lastName, roleId, managerId }) {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?)`;
    const params = [firstName, lastName, roleId, managerId];
    await db.promise().execute(sql, params);
    return console.log(`New employee added successfully.`);
};

async function deleteEmployee({ employeeId }) {
    const sql = `DELETE FROM employees WHERE employee_id = ?`;
    const params = [employeeId];
    await db.promise().execute(sql, params);
    return console.log(`Employee deleted successfully.`);                     
};

async function alterEmpRole({ roleId, employeeId }) {
    const sql = `UPDATE employees SET role_id = ? WHERE employee_id = ?`;
    const params = [roleId, employeeId];
    await db.promise().execute(sql, params);
    return console.log(`Employee's role updated successfully.`);
};

async function getRoles() {
    const sql = `SELECT roles.roles_id, roles.title, roles.salary, departments.name AS department
        FROM roles
        LEFT JOIN departments ON departments.department_id = roles.department_id`;
    const params = [];
    const data = await db.promise().query(sql, params);
    return console.table(data[0]);
};

async function getRolesArr() {
    const sql = `SELECT roles.title AS name, roles.roles_id AS value FROM roles`;
    const params = [];
    const data = await db.promise().query(sql, params);
    return data[0];
};

async function addRole({ title, salary, departmentId }) {
    const sql = `INSERT INTO roles (title, salary, department_id)
        VALUES (?,?,?)`;
    const params = [title, salary, departmentId];
    await db.promise().execute(sql, params);
    return console.log(`New role created successfully.`);
};

async function deleteRole({ roleId }) {
    const sql = `DELETE FROM roles WHERE roles_id = ?`;
    const params = [roleId];
    await db.promise().execute(sql, params);
    return console.log(`Role deleted successfully.`);
};

async function getDepartments() {
    const sql = `SELECT departments.department_id, departments.name FROM departments`;
    const params = [];
    const data = await db.promise().query(sql, params);
    return console.table(data[0]);
};

async function getDepartmentsArr() {
    const sql = `SELECT departments.name, departments.department_id AS value FROM departments`;
    const params = [];
    const data = await db.promise().query(sql, params);
    return data[0];
};

async function addDepartment({ name }) {
    const sql = `INSERT INTO departments (name)
        VALUES (?)`;
    const params = [name];
    await db.promise().execute(sql, params);
    return console.log(`Department created successfully.`);
}

async function deleteDepartment({ departmentId }) {
    const sql = `DELETE FROM departments WHERE department_id = ?`;
    const params = [departmentId];
    await db.promise().execute(sql, params);
    return console.log(`Department deleted successfully.`);
};

function disconnect() {
    db.end();
    return console.log(`bye.`);
};

module.exports = { getEmployees, getEmployeesArr, searchByDepartment,
addEmployee, deleteEmployee, alterEmpRole, getRoles, getRolesArr, addRole, deleteRole,
getDepartments, getDepartmentsArr, addDepartment, deleteDepartment, disconnect };