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
  ('QueryService'),
  ('PlaceholderService');

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

INSERT INTO methods (name, object_id) VALUES
  ('Login', 1),
  ('Signup', 1),
  ('RefreshToken', 1),
  ('RequestPasswordChange', 1),
  ('ValidatePasswordChangeCode', 1),
  ('ChangePassword', 1),
  ('ConfirmAccount', 1),
  ('GetUserData', 1),
  ('InactivateSession', 1),
  ('ChangeUserPassword', 1),
  ('Logout', 1),
  ('ValidateSession', 2),
  ('UserHasPermission', 2),
  ('GetAllUsers', 3),
  ('GetUserById', 3),
  ('UpdateUser', 3),
  ('DeleteUser', 3),
  ('CreateTemplate', 4),
  ('UpdateTemplate', 4),
  ('DeactivateTemplate', 4),
  ('DeleteTemplate', 4),
  ('GetAllTemplates', 4),
  ('GetTemplateById', 4),
  ('ProcessCreateReport', 5),
  ('GenerateCSV', 5),
  ('GenerateHTML', 5),
  ('GenerateXLSX', 5),
  ('GeneratePDF', 5),
  ('GenerateDOCX', 5),
  ('GetAllReports', 5),
  ('GetReportById', 5),
  ('CreateReports', 5),
  ('DeleteReport', 5),
  ('DashboardData', 5),
  ('DownloadReports', 5),
  ('GetAllQueries', 6),
  ('GetQueryById', 6),
  ('CreateQuery', 6),
  ('UpdateQuery', 6),
  ('DeleteQuery', 6),
  ('GetAllPlaceholders', 7),
  ('GetPlaceholderById', 7),
  ('CreatePlaceholder', 7),
  ('UpdatePlaceholder', 7),
  ('DeletePlaceholder', 7);

INSERT INTO role_methods (role_id, method_id) SELECT 1, id FROM methods;

-- Examples queries
INSERT INTO queries (query_text, field, field_type, field_placeholder) VALUES 
  ('SELECT first_name, last_name, email, created_at FROM users WHERE id = $1', 'id', 'NUMBER', 'User id'), 
  ('SELECT name, description, type, is_active, is_public, created_at FROM templates WHERE id = $1', 'id', 'NUMBER', 'Template id'), 
  ('SELECT title, description, template_id, parameters, status, created_at FROM reports WHERE id = $1', 'id', 'NUMBER', 'Report id');

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
