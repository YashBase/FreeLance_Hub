CREATE DATABASE P12_Meet_Your_Need;
USE P12_Meet_Your_Need;

-- 1. Role Table
CREATE TABLE Role (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    rname VARCHAR(100) NOT NULL
);

-- 2. User Table
CREATE TABLE User_Table (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(100) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    contact VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    FOREIGN KEY (role_id) REFERENCES Role(role_id)
);


-- 3. Client Table
CREATE TABLE Client_Table (
    client_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    profile_img VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES User_Table(user_id)
);

-- 4. Vendor Table
CREATE TABLE Vendor_Table (
    vendor_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    experience INT DEFAULT 0 CHECK (experience >= 0),
    rating DECIMAL(2,1) DEFAULT NULL CHECK (rating >= 0 AND rating <= 5),
    FOREIGN KEY (user_id) REFERENCES User_Table(user_id)
);

-- 5. Skill Table
CREATE TABLE Skill_Table (
    skill_id INT PRIMARY KEY AUTO_INCREMENT,
    skill_name VARCHAR(100) NOT NULL UNIQUE,
    skill_description TEXT DEFAULT NULL
);

-- 6. VendorSkills Table
CREATE TABLE VendorSkills_Table (
    venskill_id INT PRIMARY KEY AUTO_INCREMENT,
    vendor_id INT NOT NULL,
    skill_id INT NOT NULL,
    FOREIGN KEY (vendor_id) REFERENCES Vendor_Table(vendor_id),
    FOREIGN KEY (skill_id) REFERENCES Skill_Table(skill_id)
);

-- 7. Requirement Table
CREATE TABLE Requirement_Table (
    req_id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    budget DECIMAL(10,2) NOT NULL CHECK (budget >= 0),
    reqskill_id INT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES Client_Table(client_id)
);

-- 8. RequirementSkill Table
CREATE TABLE RequirementSkill_Table (
    reqskill_id INT PRIMARY KEY AUTO_INCREMENT,
    req_id INT NOT NULL,
    skill_id INT NOT NULL,
    FOREIGN KEY (req_id) REFERENCES Requirement_Table(req_id),
    FOREIGN KEY (skill_id) REFERENCES Skill_Table(skill_id)
);

-- 9. Proposals Table
CREATE TABLE Proposals_Table (
    proposal_id INT PRIMARY KEY AUTO_INCREMENT,
    req_id INT NOT NULL,
    vendor_id INT NOT NULL,
    summary TEXT,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected')),
    FOREIGN KEY (req_id) REFERENCES Requirement_Table(req_id),
    FOREIGN KEY (vendor_id) REFERENCES Vendor_Table(vendor_id)
);

-- 10. Task Table
CREATE TABLE Task_Table (
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    proposal_id INT NOT NULL,
    task_name VARCHAR(100) NOT NULL,
    task_description TEXT DEFAULT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (proposal_id) REFERENCES Proposals_Table(proposal_id)
);

-- 11. Payment Table
CREATE TABLE Payment_Table (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,
    vendor_id INT NOT NULL,
    task_id INT NOT NULL,
    date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
    FOREIGN KEY (client_id) REFERENCES Client_Table(client_id),
    FOREIGN KEY (vendor_id) REFERENCES Vendor_Table(vendor_id),
    FOREIGN KEY (task_id) REFERENCES Task_Table(task_id)
);

-- 12. VendorFeedback Table
CREATE TABLE vendorfeedback_Table (
    venfeed_id INT PRIMARY KEY AUTO_INCREMENT,
    vendor_id INT NOT NULL,
    client_id INT NOT NULL,
    rating DECIMAL(2,1) DEFAULT NULL CHECK (rating >= 0 AND rating <= 5),
    FOREIGN KEY (vendor_id) REFERENCES Vendor_Table(vendor_id),
    FOREIGN KEY (client_id) REFERENCES Client_Table(client_id)
);
