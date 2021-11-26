-- BASE DE DATOS
\c postgres;
DROP DATABASE IF EXISTS institucion_isabel;
CREATE DATABASE institucion_isabel;
\c institucion_isabel;

SET client_encoding = 'LATIN1';
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
  id_cfdi INTEGER NOT NULL,
  id_estado INTEGER NOT NULL,
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


-- DONACIONES

-- Crear datos de la tabla metodos_pago

INSERT INTO metodos_pago(nombre, descripcion) VALUES
('Tarjeta HSBC','Numero: 1234 1234 1234 1234'),
('Transferencia bancaria HSBC','Numero: 3456 3456 3456 3456'),
('Paypal','Correo: isabel@gmail.com'),
('Efectivo','Dinero que se otorga en sucursal');

-- Crear datos de la tabla categorias

INSERT INTO categorias(nombre, descripcion) VALUES
('Computo','Computadoras y electronica'),
('Espcie','Viveres en general'),
('Insumos','Sillas para los ninos de la institucion');


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

-- Insertar datos de la tabla donadores - 20
INSERT INTO donadores(id_cfdi, id_estado, nombre, telefono, razon_social, rfc, correo_electronico, codigo_postal, domicilio_fiscal, regimen_fiscal) VALUES
(1,1,'Manuel Andrade', '4424747494', 'Elctriquesos SA', 'ELECT1020ORE', 'manuel@random.com', 76770, 'Cuautemoc 87', true),
(2,2,'Andrea Peralta', '5540804030', 'Salmon SA', 'SADM102050', 'andrea@random.com', 85000, 'Cedro 7', true),
(3,3,'Jesus Perez', '5540802330', 'Tecmis SA', 'ELECT1020ORE', 'jesus@random.com', 45006, 'Colores 57', true),
(4,4,'Juan Sanchez', '8145608574', 'Computadoras SA', 'ELECT1020ORE', 'juan@random.com', 70450, 'San Pedro 66', true),
(5,5,'Eric Ramirez', '7896121416', 'Eric Ramirez Perez', 'ERIC560200', 'eric@random.com', 65040, 'Juarez 68', false),
(1,5,'Erika Hernandez', '7896121416', 'Elctriquesos SA', 'ELECT1020ORE', 'erika@random.com', 89040, 'Heroes 97', true),
(11, 24, 'Tamiko Spens', '3153567621', 'Durgan, Torp and Heller', 'OYED995283', 'tspens0@irs.gov', '59509', '83 Bellgrove Road', false),
(8, 29, 'Chris Shenfish', '3006798668', 'Schroeder, Hackett and Monahan', 'HERW428263', 'cshenfish1@army.mil', '99368', '871 Banding Terrace', true),
(20, 21, 'Arte Braham', '6236646361', 'Hammes Group', 'JZHH661070', 'abraham2@imageshack.us', '19355', '3510 Esch Road', true),
(14, 8, 'Fanya Chrispin', '2869613987', 'Gulgowski, Runolfsson and Marvin', 'UVWG181772', 'fchrispin3@jugem.jp', '10484', '38 Shoshone Lane', true),
(14, 32, 'Jessamine Slinn', '8151663621', 'Reilly-Hoeger', 'IZUY325477', 'jslinn4@sourceforge.net', '15174', '4317 Eliot Avenue', false),
(9, 14, 'Yanaton Cator', '2298472782', 'Satterfield, Hane and Schowalter', 'KDZJ381711', 'ycator5@myspace.com', '79684', '8993 Green Circle', false),
(9, 12, 'Cyndi Dast', '2913701147', 'Keeling, Rippin and Reinger', 'CLAK637657', 'cdast6@multiply.com', '10119', '83 Green Ridge Crossing', true),
(16, 1, 'Rudiger MacGaughey', '1353541981', 'Collins, Hilpert and Lockman', 'THKD359998', 'rmacgaughey7@taobao.com', '02151', '1 Artisan Lane', false),
(2, 17, 'Meade Lisciardelli', '1095474175', 'MacGyver-Purdy', 'TCLF157740', 'mlisciardelli8@unesco.org', '84197', '8 Veith Crossing', true),
(10, 12, 'Dave Babe', '8719969935', 'Braun LLC', 'AINL014411', 'dbabe9@sfgate.com', '82670', '8 Canary Hill', true),
(19, 5, 'Tyler Petracco', '7939947280', 'Walsh, Schmeler and Kirlin', 'WZEU631223', 'tpetraccoa@about.me', '52546', '1 Stang Park', false),
(7, 32, 'Hamnet Kimbell', '3193226011', 'Monahan, Cormier and Bailey', 'GHDJ705830', 'hkimbellb@ft.com', '34004', '36 Scoville Terrace', false),
(14, 7, 'Ellis Brower', '5811330907', 'Stark-Franecki', 'CDYF217116', 'ebrowerc@businessweek.com', '17452', '69 Lotheville Parkway', true),
(19, 27, 'Pieter Sweetzer', '8732605905', 'Streich and Sons', 'RAYF516329', 'psweetzerd@ca.gov', '81770', '28925 Bartillon Drive', true),
(13, 28, 'Gorden Scamwell', '3898184643', 'Klocko, Zboncak and Hickle', 'SGRB371463', 'gscamwelle@yahoo.com', '16340', '8791 Del Sol Hill', false),
(20, 22, 'Olivier Duding', '4333566437', 'Hirthe-Predovic', 'JESU538632', 'odudingf@gov.uk', '40427', '9 Calypso Hill', false),
(10, 22, 'Axe Toulmin', '1637669950', 'Cummings Inc', 'ZCBY887320', 'atoulming@loc.gov', '58528', '59 Portage Crossing', true),
(22, 29, 'Ed Gaines', '1827728895', 'Reichel-Turner', 'KNGP974679', 'egainesh@histats.com', '41451', '94499 Tomscot Place', false),
(7, 4, 'Frederick Dassindale', '1285547574', 'O''Connell Group', 'SSOP197920', 'fdassindalei@cocolog-nifty.com', '98640', '9 Debs Junction', true),
(2, 28, 'Pepito Cyseley', '5222369046', 'Abernathy-Feeney', 'NILL491518', 'pcyseleyj@surveymonkey.com', '52219', '50737 Sunfield Parkway', true),
(6, 15, 'Burty Boldecke', '9162687933', 'Wisoky, Bartoletti and Crooks', 'YTYH386180', 'bboldeckek@mapquest.com', '41001', '10 Columbus Point', false),
(21, 19, 'Elihu Longworth', '6279837889', 'Huel-Bergstrom', 'NEOA613747', 'elongworthl@ibm.com', '31807', '82 Myrtle Pass', true),
(13, 9, 'Almira Feldmesser', '6794681852', 'Dietrich-Auer', 'TDCH876640', 'afeldmesserm@live.com', '10633', '170 Brentwood Park', false),
(10, 32, 'Sherlock Duley', '4668026881', 'Murphy-Russel', 'LHLG587469', 'sduleyn@myspace.com', '21644', '3 Lindbergh Drive', false),
(2, 27, 'Jonis Shreenan', '1616253143', 'Conn-O''Connell', 'ONWE685594', 'jshreenano@sitemeter.com', '61783', '52254 Dixon Drive', true),
(20, 20, 'Ber Newlands', '6947680728', 'Heaney-Mraz', 'GZII226718', 'bnewlandsp@cam.ac.uk', '86896', '11253 Arapahoe Terrace', false),
(19, 22, 'Druci Rush', '3677683455', 'Schulist, Wilkinson and Farrell', 'UYIM221132', 'drushq@reverbnation.com', '47004', '6 Bayside Drive', true),
(22, 15, 'Velvet Esposito', '2381907108', 'Beier, Walsh and Kulas', 'DQQK320819', 'vespositor@cdbaby.com', '19553', '7004 Algoma Point', true),
(9, 18, 'Curtice Codd', '7761120819', 'Bailey-Haag', 'LIKY658598', 'ccodds@rakuten.co.jp', '13765', '7178 Blaine Hill', false),
(11, 1, 'Leodora Cloke', '7869226022', 'Fritsch, Stiedemann and Veum', 'NYXP453478', 'lcloket@businessweek.com', '87895', '09976 Monument Avenue', false);

-- Insertar datos de la tabla beneficiarios

INSERT INTO beneficiarios(nombre, descripcion) VALUES
('ninos de la institucion','Esta donacion es material didactico para los ninos de la institucion'),
('colaboradores','Esta donacion se utilizara para la compensacion de los colaboradores'),
('Gastos mensuales','Esta donacion es para uso mensual');
-- Insertar datos de la tabla tipo_donacion

INSERT INTO tipo_donaciones(nombre, descripcion) VALUES
('Efectivo','Donacion de dinero (ya sea en efectivo o en tarjeta)'),
('Especie','Cubre materia prima, materiales fisicos y apoyo tangible'),
('Becas','Donacion de una convocatoria');

-- Insertar datos donaciones
INSERT INTO donaciones(id_donador, id_metodo_pago, id_tipo_donacion, nombre, monto, foto_donacion) VALUES
(1,1,1,'10 CPUS DELL mini', 10500, null),
(2,2,2,'10 teclados y mouse', 2500, null),
(3,2,2,'10 diademas para pc', 1500, null),
(4,1,1,'5 teclados de repuesto marca lenovo', 1800, null),
(1,2,2,'20 cajas de hojas', 5000, null),
(2,1,1,'50 cajas de grapas', 2000, null),
(6,2,2,'100 despensas para evento de navidad', 5000, null),
(7,2,2,'10 loncheras', 400, null),
(8,1,1,'10 kit de primeros auxilios', 3600, null),
(2,2,2,'6 botes con ruedas para la basura', 5400, null),
(3,1,1,'60 pinceles', 3655, null),
(3,2,2,'10 botes de pintura blanca', 7895, null),
(4,2,2,'80 litros de leche', 800, null);

-- Insertar datos de la tabla donaciones_beneficiarios - 50

INSERT INTO donaciones_beneficiarios(id_beneficiario, id_donacion, destino_donacion) VALUES
(1,1, 'Crear un nuevo salon de clases'),
(1,2, 'Para los ninos de la casa hogar'),
(1,3, 'Para el evento de diciembre'),
(1,4, 'Para el evento de verano'),
(1,5, 'Configurar el nuevo internet'),
(2,1, 'Para uso del instituto');

-- Insertar datos de la tabla donaciones_categorias - 50
INSERT INTO donaciones_categorias(id_categoria, id_donacion) VALUES
(1,1),
(2,2),
(3,2);

-- NOTAS

-- Insertar datos de la tabla notas - 20

INSERT INTO notas(titulo, contenido, fecha_limite, id_usuario, id_donacion) VALUES
('Modificar nombre de proveedor','Este proveedor cambio de razon social', '20-10-2021',3,2),
('Modificar correo de facturacion','Este proveedor marco en la manana y necesita que le llegue su factura', '1-10-2021',3,2),
('Agregar proveedor','Este proveedor no existe', '2-10-2021',3,3),
('Agregar donacion','No esta donacion de cemex', '3-10-2021',3,4),
('Eliminar donador','Este donador se cambio de pais ', '4-10-2021',3,5),
('Eliminar donacion','La donacion se cancelo', '5-10-2021',3,6),
('Modificar pago','No esta bien el monto', '6-10-2021',3,7),
('Modificar nombre de proveedor','Tiene una letra de mas','7-10-2021',3,8),
('Modificar RFC del proovedor','Tiene mal su RFC', '8-10-2021',3,8),
('Modificar Apellido Contador','Poner los dos apellidos', '9-10-2021',3,9),
('Agrega donacion de unicef ','No esta en el sistema esta donacion','10-10-2021',3,10),
('Modificar rfc unicef','Esta mal su RFC', '11-10-2021',3,1),
('Modificar domicilio a donador ','Se cambio de domicilio fiscal', '12-10-2021',3,2),
('Modificar usuario','Tiene mal su nombre', '14-10-2021',3,4),
('Modificar proovedor','Tiene mal su direccion', '15-10-2021',3,5),
('Modificar nombre','Esta mal escrito el nombre', '16-10-2021',3,6),
('Modificar direccion','Se cambio de estado', '17-10-2021',3,7),
('Modificar contrasena','Se le olvido la contrasena', '18-10-2021',3,8),
('Modificar correo','Tiene mal el dominio', '19-10-2021',3,9),
('Agregar usuario','No esta dado de alta TELEVISA en proveedores','20-10-2021',3,10);
