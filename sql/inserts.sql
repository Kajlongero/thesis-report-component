INSERT INTO roles (name) VALUES ('OWNER'), ('ADMINISTRATOR'), ('USER');

INSERT INTO objects (name) VALUES ('AuthenticationService'), ('AuthorizationService'), ('ReportsService');
INSERT INTO methods (name, object_id) VALUES ('Login', 1), ('Signup', 1), ('RecoverPassword', 1), ('ResetPassword', 1), ('ConfirmAccount'), ('RefreshToken', 1), ('UserHasPermission', 2), ('ValidateSession', 2), ('GenerateCSV', 3), ('GenerateHTML', 3), ('GenerateXLSX', 3), ('GeneratePDF', 3), ('GenerateDOCX', 3);
