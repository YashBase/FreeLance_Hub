USE P12_Meet_Your_Need;

-- 1. Role Table
INSERT INTO Role (rname) VALUES
('Client'),
('Vendor'),
('Admin');

-- 2. User Table
INSERT INTO User_Table (user_name, user_password, role_id, contact, email) VALUES
('Alice', 'pass123', 1, '9876543210', 'alice@example.com'),
('Bob', 'secure456', 2, '8765432109', 'bob@example.com'),
('Charlie', 'abc789', 1, '7654321098', 'charlie@example.com'),
('Diana', 'qwerty', 2, '6543210987', 'diana@example.com'),
('Eve', 'admin007', 3, '5432109876', 'eve@example.com');

-- 3. Client Table
INSERT INTO Client_Table (user_id, profile_img) VALUES
(1, 'alice.jpg'),
(3, 'charlie.png');

-- 4. Vendor Table
INSERT INTO Vendor_Table (user_id, experience, rating) VALUES
(2, 5, 4.5),
(4, 3, 4.0);

-- 5. Skill Table
INSERT INTO Skill_Table (skill_name, skill_description) VALUES
('Web Development', 'Frontend and backend development'),
('Graphic Design', 'Logo and UI/UX design'),
('Mobile Apps', 'Android and iOS apps'),
('SEO', 'Search Engine Optimization'),
('Content Writing', 'Blogs and articles');

-- 6. VendorSkills Table
INSERT INTO VendorSkills_Table (vendor_id, skill_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(2, 5);

-- 7. Requirement Table
INSERT INTO Requirement_Table (client_id, title, description, budget) VALUES
(1, 'Build Website', 'Need a freelance website built', 5000.00),
(1, 'Design Logo', 'Professional logo required', 1000.00),
(2, 'SEO Optimization', 'Improve search engine rankings', 1500.00),
(2, 'Write Blog', 'Need 10 technical blog posts', 2000.00),
(1, 'Create Mobile App', 'Cross-platform app for delivery service', 7000.00);

-- 8. RequirementSkill Table
INSERT INTO RequirementSkill_Table (req_id, skill_id) VALUES
(1, 1),
(2, 2),
(3, 4),
(4, 5),
(5, 3);

-- 9. Proposals Table
INSERT INTO Proposals_Table (req_id, vendor_id, summary, status) VALUES
(1, 1, 'Can build it in 10 days', 'pending'),
(2, 2, 'Logo in 2 days', 'accepted'),
(3, 2, 'SEO package for 1 month', 'pending'),
(4, 1, 'Articles with SEO focus', 'rejected'),
(5, 1, 'App delivery in 15 days', 'pending');

-- 10. Task Table
INSERT INTO Task_Table (proposal_id, task_name, task_description, start_date, end_date) VALUES
(1, 'Setup Project', 'Create repo and base setup', '2025-07-01', '2025-07-02'),
(2, 'Initial Logo Draft', 'Send draft logos', '2025-07-03', '2025-07-04'),
(3, 'SEO Audit', 'Analyze site and plan changes', '2025-07-05', '2025-07-07'),
(4, 'Draft Articles', 'Prepare content drafts', '2025-07-08', '2025-07-12'),
(5, 'App Wireframes', 'Sketch screens and flow', '2025-07-13', '2025-07-17');

-- 11. Payment Table
INSERT INTO Payment_Table (client_id, vendor_id, task_id, date, amount) VALUES
(1, 1, 1, '2025-07-03', 1500.00),
(1, 2, 2, '2025-07-05', 1000.00),
(2, 2, 3, '2025-07-08', 1500.00),
(2, 1, 4, '2025-07-13', 1200.00),
(1, 1, 5, '2025-07-18', 3000.00);

-- 12. VendorFeedback Table
INSERT INTO vendorfeedback_Table (vendor_id, client_id, rating) VALUES
(1, 1, 4.5),
(2, 1, 4.0),
(2, 2, 4.2),
(1, 2, 3.8),
(1, 1, 5.0);
