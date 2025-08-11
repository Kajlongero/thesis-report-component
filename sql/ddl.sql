CREATE TABLE roles (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR (32) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_roles_name ON roles (name);

CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY, 
  email VARCHAR(90) UNIQUE NOT NULL,
  role_id INTEGER NOT NULL REFERENCES roles (id) ON UPDATE CASCADE ON DELETE RESTRICT
  password VARCHAR(255) NOT NULL,
  last_name VARCHAR(45), 
  first_name VARCHAR(45),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_locked BOOLEAN NOT NULL DEFAULT FALSE,
  login_attempts INT NOT NULL DEFAULT 0, 
  time_to_login_again TIMESTAMP WITH TIME ZONE,
  time_to_request_token TIMESTAMP WITH TIME ZONE,
  token_requested_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_users_role_id ON users (role_id);

CREATE TABLE sessions (
  id SERIAL NOT NULL PRIMARY KEY,
  at_jti VARCHAR (64) NOT NULL,
  rt_jti VARCHAR (64) NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  revoked BOOLEAN NOT NULL DEFAULT FALSE,
  user_id INTEGER REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sessions_at_jti ON sessions (at_jti);
CREATE INDEX idx_sessions_rt_jti ON sessions (rt_jti);
CREATE INDEX idx_sessions_user_id ON sessions (user_id);

CREATE TABLE objects (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE INDEX idx_objects_name ON objects (name);

CREATE TABLE methods (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  object_id INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  CONSTRAINT methods_object_id_fkey FOREIGN KEY (object_id) REFERENCES objects(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX idx_methods_name ON methods (name);
CREATE INDEX idx_methods_object_id ON methods (object_id);

CREATE TABLE role_methods (
  id SERIAL NOT NULL PRIMARY KEY,
  role_id INTEGER NOT NULL REFERENCES roles (id) ON UPDATE CASCADE ON DELETE RESTRICT,
  method_id INTEGER NOT NULL REFERENCES methods (id) ON UPDATE CASCADE ON DELETE RESTRICT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE INDEX idx_role_methods_role_id ON role_methods (role_id);_
CREATE INDEX idx_role_methods_method_id ON role_methods (method_id);

CREATE TABLE permissions (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
);

CREATE INDEX idx_permissions_name ON permissions (name);

CREATE TABLE role_permissions (
  id SERIAL NOT NULL PRIMARY KEY,
  role_id INTEGER NOT NULL REFERENCES roles (id) ON UPDATE CASCADE ON DELETE RESTRICT,
  permission_id INTEGER NOT NULL REFERENCES permissions (id) ON UPDATE CASCADE ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_role_permissions_role_id ON role_permissions (role_id);
CREATE INDEX idx_role_permissions_permission_id ON role_permissions (permission_id);

CREATE TABLE template_types (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR (64) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_template_types_name ON template_types (name);

CREATE TABLE report_status (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR (64) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_report_status_name ON report_status (name);

CREATE TABLE templates (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR (255) NOT NULL,
  tx_id VARCHAR,
  description TEXT,
  template_type_id INTEGER NOT NULL REFERENCES template_types (id) ON UPDATE CASCADE ON DELETE RESTRICT,
  template_definition JSONB NOT NULL,
  created_by INTEGER NOT NULL REFERENCES users (id) ON UPDATE CASCADE ON DELETE RESTRICT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_public BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE INDEX idx_templates_name ON templates (name);
CREATE INDEX idx_templates_template_type_id ON templates (template_type_id);
CREATE INDEX idx_templates_created_by ON templates (created_by);
CREATE INDEX idx_templates_is_active ON templates (is_active);
CREATE INDEX idx_templates_is_public ON templates (is_public);

CREATE TABLE role_templates (
  id SERIAL NOT NULL PRIMARY KEY,
  role_id INTEGER NOT NULL REFERENCES roles (id) ON UPDATE CASCADE ON DELETE RESTRICT,
  template_id INTEGER NOT NULL REFERENCES templates (id) ON UPDATE CASCADE ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_role_templates_role_id ON role_templates (role_id);
CREATE INDEX idx_role_templates_template_id ON role_templates (template_id);

CREATE TABLE reports (
  id SERIAL NOT NULL PRIMARY KEY,
  title VARCHAR (128) NOT NULL,
  description VARCHAR (255) NOT NULL,
  report_url TEXT,
  status_details TEXT,
  generation_params JSONB,
  user_id INTEGER NOT NULL REFERENCES users (id) ON UPDATE CASCADE ON DELETE RESTRICT,
  template_id INTEGER NOT NULL REFERENCES templates (id) ON UPDATE CASCADE ON DELETE RESTRICT,
  report_status_id INTEGER NOT NULL REFERENCES report_status (id) ON UPDATE CASCADE ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_reports_user_id ON reports (user_id);
CREATE INDEX idx_reports_template_id ON reports (template_id);
CREATE INDEX idx_reports_report_status_id ON reports (report_status_id);
CREATE INDEX idx_reports_created_at ON reports (created_at DESC);