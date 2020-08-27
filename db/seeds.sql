INSERT INTO departments (name)
VALUES ("Software Engineer"),
("Hardware Engineer"),
("DevOps"),
("Cybersecurity"),
("QA");

INSERT INTO roles (title, salary, department_id)
VALUES ("Junior Web Developer", 60000.00, 1),
("Full-Stack Engineer", 120000.00, 1),
("Robotics Researcher", 115000.00, 2),
("QA Engineer", 95000.00, 5),
("Back-End Systems Analyst", 145000.00, 3),
("IT Security Engineer ", 87000.00, 4),
("Network Security Specialist", 126000.00, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Junior", "Escobar", 2, null),
("Alan", "Celestin", 4, null),
("Alexander", "DeMilli", 5, null),
("Adonis", "Simon", 7, null),
("Julian", "Fletcher", 6, null),
("Arely", "Castellano", 1, 2),
("Sophia", "Hernandez", 3, null),
("Kevin", "Martinez", 1, 2);

