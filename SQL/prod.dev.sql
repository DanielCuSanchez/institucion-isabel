-- BASE DE DATOS

-- \c postgres;
-- DROP DATABASE IF EXISTS institucion_isabel;
-- CREATE DATABASE institucion_isabel;
-- \c institucion_isabel;

-- SET client_encoding = 'LATIN1';


-- CREAR TABLAS

-- USUARIOS

-- Crear tabla de usuarios
CREATE TABLE usuarios(
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  apellido TEXT NOT NULL,
  "password" TEXT NOT NULL,
  correo_electronico TEXT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);


-- Crear tabla de roles_usuarios
CREATE TABLE roles_usuarios (
  id SERIAL PRIMARY KEY,
  id_usuario INTEGER NOT NULL,
  id_role INTEGER NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);

-- Crear tabla de roles
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  nombre_role TEXT NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);

-- Crear tabla permisos
CREATE TABLE permisos(
  id SERIAL PRIMARY KEY,
  nombre_permiso TEXT NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);

-- Crear tabla roles_permisos
CREATE TABLE roles_permisos(
  id SERIAL PRIMARY KEY,
  id_permiso INTEGER NOT NULL,
  id_role INTEGER NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);
-- DONADORES

-- Crear tabla CFDIS
CREATE TABLE cfdis(
  id SERIAL PRIMARY KEY,
  clave TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);
-- Crear tabla estados
CREATE TABLE estados(
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);
-- Crear tabla donadores
CREATE TABLE donadores(
  id SERIAL PRIMARY KEY,
  id_cfdi INTEGER,
  id_estado INTEGER,
  nombre TEXT NOT NULL,
  telefono TEXT NOT NULL,
  razon_social TEXT NOT NULL,
  rfc TEXT NOT NULL,
  correo_electronico TEXT NOT NULL,
  codigo_postal INTEGER NOT NULL,
  domicilio_fiscal TEXT NOT NULL,
  regimen_fiscal BOOLEAN NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);

ALTER SEQUENCE donadores_id_seq RESTART WITH 1;
-- DONACIONES

-- Crear tabla de beneficiarios
CREATE TABLE beneficiarios(
  id SERIAL PRIMARY KEY NOT NULL,
  nombre TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  archivo TEXT,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);

-- Crear tabla metodos de pago
CREATE TABLE metodos_pago(
  id SERIAL PRIMARY KEY NOT NULL,
  nombre TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);

-- Crear tabla categorias
CREATE TABLE categorias(
  id SERIAL PRIMARY KEY NOT NULL,
  nombre TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);

-- Crear tabla tipo de donacion
CREATE TABLE tipo_donaciones(
  id SERIAL PRIMARY KEY NOT NULL,
  nombre TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);

-- Crear tabla donaciones
CREATE TABLE donaciones(
  id SERIAL PRIMARY KEY,
  id_donador INTEGER NOT NULL,
  id_metodo_pago INTEGER NOT NULL,
  id_tipo_donacion INTEGER NOT NULL,
  nombre TEXT NOT NULL,
  monto NUMERIC(10,2) NOT NULL,
  foto_donacion TEXT,
  esta_facturado DATE,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);

ALTER SEQUENCE donaciones_id_seq RESTART WITH 1;
-- Crear tabla donaciones_beneficiarios
CREATE TABLE donaciones_beneficiarios(
  id SERIAL PRIMARY KEY,
  id_beneficiario INTEGER NOT NULL,
  id_donacion INTEGER NOT NULL,
  destino_donacion TEXT,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);

-- Crear tabla donaciones_categorias

CREATE TABLE donaciones_categorias(
  id SERIAL PRIMARY KEY,
  id_categoria INTEGER NOT NULL,
  id_donacion INTEGER NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);

-- NOTAS

-- Crear tabla de notas
CREATE TABLE notas (
  id SERIAL PRIMARY KEY,
  id_donacion INTEGER,
  id_usuario INTEGER,
  titulo TEXT NOT NULL,
  contenido TEXT NOT NULL,
  fecha_limite DATE NOT NULL,
  estado_completado SMALLINT DEFAULT 0,
  estado_activo SMALLINT DEFAULT 1,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);

-- CONSTRAINTS EN TABLAS

-- constraint tabla usuarios
ALTER TABLE usuarios
ADD CONSTRAINT FK_id_role
FOREIGN KEY(id_role)
REFERENCES roles (id);

-- El correo como único
ALTER TABLE usuarios
ADD CONSTRAINT unique_correo UNIQUE (correo_electronico);

-- constraint tabla roles_usuarios
ALTER TABLE roles_usuarios
ADD CONSTRAINT FK_id_usuario
FOREIGN KEY(id_usuario)
REFERENCES usuarios(id);

ALTER TABLE roles_usuarios
ADD CONSTRAINT FK_id_role
FOREIGN KEY(id_role)
REFERENCES roles(id);

-- constraint tabla roles_permisos
ALTER TABLE roles_permisos
ADD CONSTRAINT FK_id_permiso
FOREIGN KEY(id_permiso)
REFERENCES permisos(id);

ALTER TABLE roles_permisos
ADD CONSTRAINT FK_id_role
FOREIGN KEY(id_role)
REFERENCES roles(id);

-- constraint tabla notas
ALTER TABLE notas
ADD CONSTRAINT FK_id_usuario
FOREIGN KEY(id_usuario)
REFERENCES usuarios(id);

ALTER TABLE notas
ADD CONSTRAINT FK_id_donacion
FOREIGN KEY(id_donacion)
REFERENCES donaciones(id);

-- constraint tabla donadores
ALTER TABLE donadores
ADD CONSTRAINT FK_id_cfdi
FOREIGN KEY(id_cfdi)
REFERENCES cfdis(id);

ALTER TABLE donadores
ADD CONSTRAINT FK_id_estado
FOREIGN KEY(id_estado)
REFERENCES estados(id);

-- constraint tabla donaciones
ALTER TABLE donaciones
ADD CONSTRAINT FK_id_donador
FOREIGN KEY(id_donador)
REFERENCES donadores(id);

ALTER TABLE donaciones
ADD CONSTRAINT FK_id_metodo_pago
FOREIGN KEY(id_metodo_pago)
REFERENCES metodos_pago(id);

ALTER TABLE donaciones
ADD CONSTRAINT FK_id_tipo_donacion
FOREIGN KEY(id_tipo_donacion)
REFERENCES tipo_donaciones(id);

-- Constraint donaciones_beneficiarios
ALTER TABLE donaciones_beneficiarios
ADD CONSTRAINT FK_id_beneficiario
FOREIGN KEY(id_beneficiario)
REFERENCES beneficiarios(id);

ALTER TABLE donaciones_beneficiarios
ADD CONSTRAINT FK_id_donacion
FOREIGN KEY(id_donacion)
REFERENCES donaciones(id);

-- Constraint donaciones_categorias
ALTER TABLE donaciones_categorias
ADD CONSTRAINT FK_id_donacion
FOREIGN KEY(id_donacion)
REFERENCES donaciones(id);

ALTER TABLE donaciones_categorias
ADD CONSTRAINT FK_id_categoria
FOREIGN KEY(id_categoria)
REFERENCES categorias(id);


-- INSERCIONES EN TABLAS

-- USUARIOS

-- Insertar datos tabla permisos

INSERT INTO permisos(nombre_permiso) VALUES
('Iniciar sesion'),
('Cerrar sesion'),
('Registrar donaciones'),
('Modificar donaciones'),
('Eliminar donaciones'),
('Consultar donaciones'),
('Marcar donacion facturada'),
('Descargar excel de consultas donaciones'),
('Registrar metodo de pago'),
('Modificar metodo de pago'),
('Consultar metodos de pago'),
('Eliminar metodo de pago'),
('Registrar beneficiario donacion'),
('Modificar beneficiario donacion'),
('Consultar beneficiario donacion'),
('Eliminar beneficiario donacion'),
('Registrar categoria donativo'),
('Modificar categoria donativo'),
('Consultar categoria donativo'),
('Eliminar categoria donativo'),
('Registrar tipo de donativo'),
('Modificar tipo de donativo'),
('Consultar tipo de donativo'),
('Eliminar tipo de donativo'),
('Registrar notas'),
('Modificar notas'),
('Eliminar notas'),
('Consultar listado completo de notas'),
('Consultar notas asignadas'),
('Marcar una nota asignada como completada'),
('Registrar donadores'),
('Modificar donadores'),
('Eliminar donadores'),
('Consultar donadores'),
('Registrar usuarios'),
('Modificar usuarios'),
('Eliminar usuarios'),
('Consultar usuarios');


-- Insertar datos tabla roles - 10

INSERT INTO roles( nombre_role) VALUES
('TESORERO'),
('CONTADOR'),
('PRESIDENTE'),
('ADMIN');

-- Insertar datos tabla roles_permisos - 50

INSERT INTO roles_permisos(id_role , id_permiso) VALUES
(1,1),
(1,2),
(1,3),
(1,4),
(1,6),
(1,8),
(1,9),
(1,10),
(1,11),
(1,12),
(1,13),
(1,14),
(1,15),
(1,16),
(1,17),
(1,18),
(1,19),
(1,20),
(1,21),
(1,22),
(1,23),
(1,24),
(1,29),
(1,30),
(1,31),
(1,32),
(1,33),
(1,34),
(2,1),
(2,2),
(2,6),
(2,7),
(2,8),
(2,11),
(2,15),
(2,23),
(2,29),
(2,30),
(2,34),
(2,35),
(3,1),
(3,2),
(3,5),
(3,6),
(3,8),
(3,25),
(3,26),
(3,27),
(3,28),
(3,29),
(3,30),
(3,34),
(4,1),
(4,2),
(4,35),
(4,36),
(4,37),
(4,38);

-- Insertar datos tabla usuarios - 20

INSERT INTO usuarios(nombre, apellido, "password", correo_electronico) VALUES
('Claudia','Flores','$2b$10$lP4/2dA1j3WRz0/Qh9e8V.aKgKO9rMrpIX2sKbx8If2Ueo.Q03Cre','tesorero@isabel.mx'),
('Liz','Gonzalez','$2b$10$lP4/2dA1j3WRz0/Qh9e8V.aKgKO9rMrpIX2sKbx8If2Ueo.Q03Cre','contador@isabel.mx'),
('Luis','Flores','$2b$10$lP4/2dA1j3WRz0/Qh9e8V.aKgKO9rMrpIX2sKbx8If2Ueo.Q03Cre','presidente@isabel.mx'),
('Mariana','Gonzalez','$2b$10$lP4/2dA1j3WRz0/Qh9e8V.aKgKO9rMrpIX2sKbx8If2Ueo.Q03Cre','admin@isabel.mx'),
('Daniel','Cu','$2b$10$lP4/2dA1j3WRz0/Qh9e8V.aKgKO9rMrpIX2sKbx8If2Ueo.Q03Cre','super@isabel.mx');

-- Insertar datos tabla roles_usuarios

INSERT INTO roles_usuarios(id_usuario , id_role) VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,1),
(5,2),
(5,3),
(5,4);
-- Insertar datos de la tabla CFDIS
INSERT INTO cfdis(clave, descripcion) VALUES
('G01',	'Adquisicion de mercancias'),
('G02',	'Devoluciones, descuentos o bonificaciones'),
('G03',	'Gastos en general'),
('I01',	'Construcciones'),
('I02',	'Mobilario y equipo de oficina por inversiones'),
('I03',	'Equipo de transporte'),
('I04',	'Equipo de computo y accesorios'),
('I05',	'Dados, troqueles, moldes, matrices y herramental'),
('I06',	'Comunicaciones telefonicas'),
('I07',	'Comunicaciones satelitales'),
('I08',	'Otra maquinaria y equipo'),
('D01',	'Honorarios medicos, dentales y gastos hospitalarios.'),
('D02',	'Gastos medicos por incapacidad o discapacidad'),
('D03',	'Gastos funerales.'),
('D04',	'Donativos.'),
('D05',	'Intereses reales efectivamente pagados por creditos hipotecarios (casa habitacion).'),
('D06', 'Aportaciones voluntarias al SAR.'),
('D07', 'Primas por seguros de gastos medicos.'),
('D08',	'Gastos de transportacion escolar obligatoria.'),
('D09',	'Depositos en cuentas para el ahorro, primas que tengan como base planes de pensiones.'),
('D10',	'Pagos por servicios educativos (colegiaturas)'),
('P01',	'Por definir');


-- Insertar datos de la tabla estados - 20
INSERT INTO estados(nombre) VALUES
('Aguascalientes'),
('Baja California'),
('Baja California Sur'),
('Campeche'),
('Chiapas'),
('Chihuahua'),
('Ciudad de Mexico'),
('Coahuila'),
('Colima'),
('Durango'),
('Guanajuato'),
('Guerrero'),
('Hidalgo'),
('Jalisco'),
('Mexico'),
('Michoacan'),
('Morelos'),
('Nayarit'),
('Nuevo Leon'),
('Oaxaca'),
('Puebla'),
('Queretaro'),
('Quintana'),
('San Luis Potosi'),
('Sinaloa'),
('Sonora'),
('Tabasco'),
('Tamaulipas'),
('Tlaxcala'),
('Veracruz'),
('Yucatan'),
('Zacatecas');

