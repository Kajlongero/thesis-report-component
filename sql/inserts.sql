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
  ('QueryService');

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
  ('DOCX'),
  ('CSV'),
  ('XLSX');

INSERT INTO methods (name, object_id) VALUE  ('Logout', 1), -- id: 2
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
  ('GetTemplateById', 4), -- id: 23
  ('ProcessCreateReport', 5), -- id: 24
  ('GenerateCSV', 5), -- id: 25
  ('GenerateHTML', 5), -- id: 26
  ('GenerateXLSX', 5), -- id: 27
  ('GeneratePDF', 5), -- id: 28
  ('GenerateDOCX', 5), -- id: 29
  ('GetAllReports', 5), -- id: 30
  ('GetReportById', 5), -- id: 31
  ('CreateReports', 5), -- id: 32
  ('DeleteReport', 5), -- id: 33
  ('DashboardData', 5), -- id: 34
  ('DownloadReports', 5), -- id: 35
  ('GetAllQueries', 6), -- id: 36
  ('GetQueryById', 6), -- id: 37
  ('CreateQuery', 6), -- id: 38
  ('UpdateQuery', 6), -- id: 39
  ('DeleteQuery', 6), -- id: 40
  ('GetAllPlaceholders', 6), -- id: 41
  ('GetPlaceholderById', 6), -- id: 42
  ('CreatePlaceholder', 6), -- id: 43
  ('UpdatePlaceholder', 6), -- id: 44
  ('DeletePlaceholder', 6); -- id: 45

INSERT INTO role_methods (role_id, method_id) SELECT 1, id FROM methods;

-- Examples queries
INSERT INTO queries (query_text) VALUES 
  ('SELECT first_name, last_name, email, created_at FROM users WHERE id = $1'), 
  ('SELECT name, description, type, is_active, is_public, created_at FROM templates WHERE id = $1'), 
  ('SELECT title, description, template_id, parameters, status, created_at FROM reports WHERE id = $1');

INSERT INTO placeholder_type (name) VALUES 
  ('INFORMATION'), 
  ('IMAGE'), 
  ('TABLE'), 
  ('CHART');

INSERT INTO placeholders (name, field, type_id, query_id) VALUES 
  ('Nombre', 'first_name', 1, 1), 
  ('Apellido', 'last_name', 1, 1), 
  ('Correo', 'email', 1, 1),
  ('Creado el', 'created_at', 1, 1);