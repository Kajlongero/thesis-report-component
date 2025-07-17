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
  token_requested_count INT NOT NULL DEFAULT 0,
  time_to_request_token TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_users_role_id ON users (role_id);

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

CREATE TABLE permissions (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  object_id INT NOT NULL REFERENCES objects (id) ON UPDATE CASCADE ON DELETE RESTRICT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
);

CREATE INDEX idx_permissions_name ON permissions (name);
CREATE INDEX idx_permissions_object_id ON permissions (object_id);

CREATE TABLE role_permissions (
  id SERIAL NOT NULL PRIMARY KEY,
  role_id INTEGER NOT NULL REFERENCES roles (id) ON UPDATE CASCADE ON DELETE RESTRICT,
  permission_id INTEGER NOT NULL REFERENCES permissions (id) ON UPDATE CASCADE ON DELETE RESTRICT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
);

CREATE INDEX idx_role_permissions_role_id ON role_permissions (role_id);
CREATE INDEX idx_role_permissions_permission_id ON role_permissions (permission_id);