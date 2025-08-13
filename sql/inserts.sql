INSERT INTO roles (name) VALUES 
  ('OWNER'), 
  ('ADMINISTRATOR'),
  ('USER');

INSERT INTO objects (name) VALUES 
  ('AuthenticationService'), 
  ('AuthorizationService'), 
  ('UserService'),
  ('TemplateService'),
  ('ReportsService'),
  ('AuditService'),
  ('LogsService');

INSERT INTO methods (name, object_id) VALUES 
  ('Login', 1), -- id: 1
  ('Signup', 1), -- id: 2
  ('RefreshToken', 1), -- id: 3
  ('RequestPasswordChange', 1), -- id: 4
  ('ValidatePasswordChangeCode', 1), -- id: 5
  ('ChangePassword', 1), -- id: 6
  ('ConfirmAccount', 1), -- id: 7
  ('GetUserData', 1), -- id: 8
  ('InactivateSession', 1), -- id: 9
  ('ChangeUserPassword', 1), -- id: 10
  ('Logout', 1), -- id: 11
  ('ValidateSession', 2), -- id: 12
  ('UserHasPermission', 2), -- id: 13
  ('GetAllUsers', 3), -- id: 14
  ('GetUserById', 3), -- id: 15
  ('UpdateUser', 3), -- id: 16
  ('DeleteUser', 3), -- id: 17
  ('CreateTemplate', 4), -- id: 18
  ('UpdateTemplate', 4), -- id: 19
  ('DeactivateTemplate', 4), -- id: 20
  ('DeleteTemplate', 4), -- id: 21
  ('GetAllTemplates', 4), -- id: 22
  ('ProcessCreateReport', 5), -- id: 23
  ('GenerateCSV', 5), -- id: 24
  ('GenerateHTML', 5), -- id: 25
  ('GenerateXLSX', 5), -- id: 26
  ('GeneratePDF', 5), -- id: 27
  ('GenerateDOCX', 5), -- id: 28
  ('GetAllReports', 5), -- id: 29
  ('GetReportById', 5), -- id: 30
  ('CreateReports', 5), -- id: 31
  ('DeleteReport', 5), -- id: 32
  ('DashboardData', 5), -- id: 33
  ('DownloadReports', 5), -- id: 34
  ('GetAllAuditLogs', 6), -- id: 35
  ('GetAuditByIdLogs', 6), -- id: 36
  ('DownloadAuditLogs', 6), -- id: 37
  ('GetAllLogs', 7), -- id: 38
  ('GetLogById', 7), -- id: 39
  ('DownloadLogs', 7), -- id: 40
  ('ClearLogs', 7); -- id: 41

INSERT INTO role_methods (role_id, method_id) SELECT 1, id FROM methods;

INSERT INTO role_methods (role_id, method_id) VALUES
  (2, 1),
  (2, 2),
  (2, 3),
  (2, 4),
  (2, 5),
  (2, 6),
  (2, 7),
  (2, 8),
  (2, 9),
  (2, 10),
  (2, 11),
  (2, 12),
  (2, 13),
  (2, 14),
  (2, 15),
  (2, 16),
  (2, 17),
  (2, 18),
  (2, 19),
  (2, 20),
  (2, 21),
  (2, 22),
  (2, 23),
  (2, 24),
  (2, 25),
  (2, 26),
  (2, 27),
  (2, 28),
  (2, 29),
  (2, 30),
  (2, 31),
  (2, 32),
  (2, 33),
  (2, 34);

INSERT INTO role_methods (role_id, method_id) VALUES
  (3, 1),
  (3, 2),
  (3, 3),
  (3, 4),
  (3, 5),
  (3, 6),
  (3, 7),
  (3, 8),
  (3, 9),
  (3, 10),
  (3, 11),
  (3, 12),
  (3, 13),
  (3, 23),
  (3, 24),
  (3, 25),
  (3, 26),
  (3, 27),
  (3, 28),
  (3, 29),
  (3, 30),
  (3, 31),
  (3, 32),
  (3, 33),
  (3, 34);

INSERT INTO report_status (name) VALUES 
  ('COMPLETED'), 
  ('PENDING'), 
  ('GENERATING'), 
  ('ERROR'), 
  ('CANCELLED'), 
  ('FAILED');

INSERT INTO template_types (name) VALUES
  ('PDF'),
  ('HTML'),
  ('DOCX');
