const inquirer = require(`inquirer`);
const {
    getEmployees,
    getEmployeesArr,
    searchByDepartment,
    addEmployee,
    deleteEmployee,
    alterEmpRole,
    getRoles,
    getRolesArr,
    addRole,
    deleteRole,
    getDepartments,
    getDepartmentsArr,
    addDepartment,
    deleteDepartment,
    disconnect
} = require(`./queryFunctions`);

let employeeList = [];
let roleList = [];
let departmentList = [];

async function addNewEmployee(employeeList, roleList) {
    return inquirer.prompt([
        {
            type: `input`,
            name: `firstName`,
            message: `Enter the employee's first name:`,
            validate: fNameInput => {
                if(fNameInput) {
                    return true;
                } else {
                    console.log(`Please provide a first name!`);
                    return false;
                }
            }
        },
        {
            type: `input`,
            name: `lastName`,
            message: `Enter the employee's last name:`,
            validate: lNameInput => {
                if(lNameInput) {
                    return true;
                } else {
                    console.log(`Please provide a last name!`);
                    return false;
                }
            }
        },
        {
            type: `list`,
            name: `roleId`,
            message: `Select this employee's role:`,
            choices: roleList
        },
        {
            type: `list`,
            name: `managerId`,
            message: `Select a manager for this employee:`,
            choices: [...employeeList, { name: `none`, value: null }]
        }
    ]).then(promptData => {
        addEmployee(promptData);
    }).catch(err => console.error(err));
};

async function removeEmployee(employeeList) {
    return inquirer.prompt([
        {
            type: `list`,
            name: `employeeId`,
            message: `Select an employee to remove:`,
            choices: employeeList
        }
    ]).then(promptData => {
        deleteEmployee(promptData);
    }).catch(err => console.error(err));
};

function updateEmpRole(employeeList, roleList) {
    return inquirer.prompt([
        {
            type: `list`,
            name: `employeeId`,
            message: `Select the employee you'd like to update:`,
            choices: employeeList
        },
        {
            type: `list`,
            name: `roleId`,
            message: `Select a new role for this employee:`,
            choices: roleList
        }
    ]).then(promptData => {
        alterEmpRole(promptData);
    }).catch(err => console.error(err));
};

async function createRole(departmentList) {
    return inquirer.prompt([
        {
            type: `input`,
            name: `title`,
            message: `Enter a new job title:`,
            validate: titleInput => {
                if(titleInput) {
                    return true;
                } else {
                    console.log(`Please enter a job title!`);
                    return false;
                }
            }
        },
        {
            type: `input`,
            name: `salary`,
            message: `Enter the job's salary:`,
            validate: salaryInput => {
                if(!salaryInput) {
                    console.log(`Please enter a salary!`);
                    return false;
                } else if(isNaN(salaryInput)) {
                    console.log(`Please enter a number!`);
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: `list`,
            name: `departmentId`,
            message: `Select a department related to the job:`,
            choices: departmentList
        }
    ]).then(promptData => {
        addRole(promptData);
    }).catch(err => console.error(err));
};

async function removeRole(roleList) {
    return inquirer.prompt([
        {
            type: `list`,
            name: `roleId`,
            message: `Select a role to delete:`,
            choices: roleList
        }
    ]).then(promptData => {
        deleteRole(promptData);
    }).catch(err => console.error(err));
};

async function createDepartment() {
    return inquirer.prompt([
        {
            type: `input`,
            name: `name`,
            message: `Enter a new department name:`,
            validate: depName => {
                if(depName) {
                    return true;
                } else {
                    console.log(`Please provide a department name!`);
                    return false;
                }
            }
        }
    ]).then(promptData => {
        addDepartment(promptData);
    }).catch(err => console.error(err));
};

async function removeDepartment(departmentList) {
    return inquirer.prompt([
        {
            type: `list`,
            name: `departmentId`,
            message: `Select a department to remove:`,
            choices: departmentList
        }
    ]).then(promptData => {
        deleteDepartment(promptData);
    }).catch(err => console.error(err));
};

async function startMenu() {
    return inquirer.prompt([
        {
            type: `list`,
            name: `actionSelect`,
            message: `What would you like to do today?`,
            choices: [
                `View All Employees`,
                `View All Employees By Department`,
                `Add Employees`,
                `Remove Employees`,
                `Update Employee Role`,
                `View All Roles`,
                `Add Role`,
                `Remove Role`,
                `View All Departments`,
                `Add Department`,
                `Remove Department`,
                `Exit Employee Tracker`
            ]
        }
    ]).then( answer => checkSelect(answer.actionSelect)); 
};

async function checkSelect(data) {
    switch(data) {
        case `View All Employees`:
            getEmployees();
            return startMenu();
        case `View All Employees By Department`:
            searchByDepartment();
            return startMenu();
        case `Add Employees`:
            employeeList = await getEmployeesArr();
            roleList = await getRolesArr();
            await addNewEmployee(employeeList, roleList);
            return startMenu();
        case`Remove Employees`:
            employeeList = await getEmployeesArr();
            await removeEmployee(employeeList);
            return startMenu();
        case `Update Employee Role`:
            employeeList = await getEmployeesArr();
            roleList = await getRolesArr();
            await updateEmpRole(employeeList, roleList);
            return startMenu();
        case `View All Roles`:
            getRoles();
            return startMenu();
        case `Add Role`:
            departmentList = await getDepartmentsArr();
            await createRole(departmentList);
            return startMenu();
        case `Remove Role`:
            roleList = await getRolesArr();
            await removeRole(roleList);
            return startMenu();
        case `View All Departments`:
            getDepartments();
            return startMenu();
        case `Add Department`:
            createDepartment();
            return startMenu();
        case `Remove Department`:
            departmentList = await getDepartmentsArr();
            await removeDepartment(departmentList);
            return startMenu();
        case `Exit Employee Tracker`:
            disconnect();
            return;
    }
}

module.exports = startMenu;