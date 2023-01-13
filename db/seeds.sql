INSERT INTO department (department_name)
VALUES ("Management"),
        ("Development"),
        ("Data"),
        ("Security");

INSERT INTO role (title, salary, department_id)
VALUES ("Technical Lead", 95000, 1),
        ("UX Designer", 80000, 2),
        ("Front-End Developer", 90000, 2),
        ("Software Developer", 95000, 2),
        ("Database Administrator", 60000, 3),
        ("Data Analyst" 65000, 3),
        ("QA Specialist", 70000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jakob", "Dayton", 1, 1),
        ("David", "McWhirter", 7, 2),
        ("Michael", "Hengerer", 4, 1),
        ("Ben", "Uloko", 5, 1),
        ("Nolan", "Ross", 3, 1),
        ("Tyler", "Walton", 7, 2),
        ("Lexi", "Arbajian", 2, 1),
        ("Nick", "Lo Faso", 4, 1),
        ("Jake", "VanDuyn", 6, 1),
        ("Keeley", "Kerr", 7, 2),
        ("Dylan", "Freeman", 4, 1);