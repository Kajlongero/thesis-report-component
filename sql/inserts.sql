INSERT INTO roles (name) VALUES ('OWNER'), ('ADMINISTRATOR'), ('USER');

INSERT INTO objects (name) VALUES ('AuthenticationService'), ('AuthorizationService');
INSERT INTO methods (name, object_id) VALUES ('Login', 1), ('Signup', 1), ('RecoverPassword', 1), ('ResetPassword', 1), ('ConfirmAccount'), ('UserHasPermission', 2);
