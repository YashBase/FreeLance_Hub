-- Role Table
INSERT INTO Role (role_id, rname) VALUES
(1, 'Client'),
(2, 'Vendor'),
(3, 'Admin');
 
-- User_Table
INSERT INTO User_Table (user_id, user_name, user_password, role_id, contact, email) VALUES
(1, 'Alice', 'pass123', 1, '9876543210', 'alice@example.com'),
(2, 'Bob', 'secure456', 2, '8765432109', 'bob@example.com');

-- Client_Table 
INSERT INTO Client_Table (client_id, user_id, profile_img) VALUES
(1, 1, 'alice.jpg');

-- Vendor_Table
INSERT INTO Vendor_Table (vendor_id, user_id, experience, rating) VALUES
(1, 2, 5, 4.5);

-- Skill_Table
INSERT INTO Skill_Table (skill_id, skill_name, skill_description) VALUES
(1, 'Web Development', 'Frontend and Backend web apps'),
(2, 'Graphic Design', 'Designing logos, posters, and UI');

-- VendorSkills_Table
INSERT INTO VendorSkills_Table (venskill_id, vendor_id, skill_id) VALUES
(1, 1, 1),
(2, 1, 2);

-- Requirement_Table (WITHOUT reqskill_id now)
INSERT INTO Requirement_Table (req_id, client_id, title, description, budget) VALUES
(1, 1, 'Build a Website', 'Need a dynamic freelance site', 5000.00);

-- RequirementSkill_Table (after Requirement is inserted)
INSERT INTO RequirementSkill_Table (reqskill_id, req_id, skill_id) VALUES
(1, 1, 1);

-- Proposals_Table
INSERT INTO Proposals_Table (proposal_id, req_id, vendor_id, summary, status) VALUES
(1, 1, 1, 'I can build it in 10 days', 'pending');

-- Task_Table
INSERT INTO Task_Table (task_id, proposal_id, task_name, task_description, start_date, end_date) VALUES
(1, 1, 'Initial Setup', 'Setup domain and framework', '2025-07-01', '2025-07-05');

-- Payment_Table
INSERT INTO Payment_Table (payment_id, client_id, vendor_id, task_id, date, amount) VALUES
(1, 1, 1, 1, '2025-07-06', 2500.00);

-- vendorfeedback_Table
INSERT INTO vendorfeedback_Table (venfeed_id, vendor_id, client_id, rating) VALUES
(1, 1, 1, 4.5);
