"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Donor = void 0;

var _index = require("../database/index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Donor = {
  getAll: function () {
    var _getAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var QUERY;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              QUERY = "\n       SELECT\n      D.id,\n      razon_social,\n      D.nombre,\n      rfc,\n      telefono,\n      regimen_fiscal,\n      correo_electronico,\n      codigo_postal,\n      domicilio_fiscal,\n      E.nombre Estado,\n      C.clave Clave_CFDI,\n      C.descripcion Descripcion_CFDI\n      FROM\n      donadores D\n      LEFT JOIN cfdis C\n      ON\n      D.id_cfdi = C.id\n      LEFT JOIN estados E\n      ON\n      D.id_estado = E.id\n      WHERE\n      D.existe = true\n      ORDER BY D.id ASC\n    ";
              return _context.abrupt("return", _index.db.query(QUERY));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getAll() {
      return _getAll.apply(this, arguments);
    }

    return getAll;
  }(),
  pagination: function () {
    var _pagination = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(limit, offset) {
      var QUERY;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              QUERY = "\n      SELECT\n      D.id,\n      razon_social,\n      D.nombre,\n      rfc,\n      telefono,\n      regimen_fiscal,\n      correo_electronico,\n      codigo_postal,\n      domicilio_fiscal,\n      E.nombre Estado,\n      C.clave Clave_CFDI,\n      C.descripcion Descripcion_CFDI\n      FROM\n      donadores D\n      LEFT JOIN cfdis C\n      ON\n      D.id_cfdi = C.id\n      LEFT JOIN estados E\n      ON\n      D.id_estado = E.id\n      WHERE\n      D.existe = true\n      ORDER BY D.id ASC\n      LIMIT\n        $1\n      OFFSET\n        $2\n    ";
              return _context2.abrupt("return", _index.db.query(QUERY, [limit, offset]));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function pagination(_x, _x2) {
      return _pagination.apply(this, arguments);
    }

    return pagination;
  }(),
  getOne: function () {
    var _getOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
      var QUERY;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              QUERY = "\n      SELECT\n      D.id,\n      telefono,\n      razon_social, \n      D.nombre nombre, \n      rfc, \n      correo_electronico, \n      codigo_postal, \n      domicilio_fiscal, \n      regimen_fiscal, \n      E.nombre estado, \n      C.clave Clave_CFDI, \n      C.descripcion Descripcion_CFDI,\n      D.id_estado as id_estado,\n      D.id_cfdi as id_cfdi\n      FROM\n      donadores D\n      LEFT JOIN cfdis C\n      ON\n      D.id_cfdi = C.id\n      LEFT JOIN estados E\n      ON\n      D.id_estado = E.id\n      WHERE\n      D.id = $1\n      AND D.existe = true\n    ";
              return _context3.abrupt("return", _index.db.query(QUERY, [id]));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function getOne(_x3) {
      return _getOne.apply(this, arguments);
    }

    return getOne;
  }(),
  getStates: function () {
    var _getStates = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id_donador) {
      var QUERY;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              QUERY = "\n    SELECT E.id\n    FROM donadores D, estados E\n    WHERE D.id_estado = E.id \n    AND D.id = $1;\n    ";
              return _context4.abrupt("return", _index.db.query(QUERY, [id_donador]));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function getStates(_x4) {
      return _getStates.apply(this, arguments);
    }

    return getStates;
  }(),
  getCfdis: function () {
    var _getCfdis = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id_donador) {
      var QUERY;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              QUERY = "\n    SELECT C.id\n    FROM donadores D, cfdis C\n    WHERE D.id_cfdi= C.id \n    AND D.id = $1;\n    ";
              return _context5.abrupt("return", _index.db.query(QUERY, [id_donador]));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function getCfdis(_x5) {
      return _getCfdis.apply(this, arguments);
    }

    return getCfdis;
  }(),
  postOne: function () {
    var _postOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(donor) {
      var INSERTION, VALUES;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              INSERTION = "\n      INSERT INTO donadores(\n        id_cfdi, \n        id_estado, \n        nombre, \n        telefono, \n        razon_social, \n        rfc, \n        correo_electronico, \n        codigo_postal, \n        domicilio_fiscal, \n        regimen_fiscal\n        )\n      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)\n      RETURNING id;\n    ";
              VALUES = [donor.id_cfdi, donor.id_estado, donor.nombre, donor.telefono, donor.razon_social, donor.rfc, donor.correo_electronico, donor.codigo_postal, donor.domicilio_fiscal, donor.regimen_fiscal];
              return _context6.abrupt("return", _index.db.query(INSERTION, VALUES));

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function postOne(_x6) {
      return _postOne.apply(this, arguments);
    }

    return postOne;
  }(),
  putOne: function () {
    var _putOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(donor, id) {
      var UPDATE, VALUES;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              UPDATE = "\n      UPDATE donadores\n      SET telefono = $2, \n      razon_social = $3, \n      nombre = $4, \n      rfc = $5, \n      correo_electronico = $6,\n      codigo_postal = $7,\n      domicilio_fiscal = $8, \n      regimen_fiscal = $9,\n      id_estado = $10, \n      id_cfdi = $11\n      WHERE id = $1 and existe = true\n    ";
              VALUES = [id, donor.telefono, donor.razon_social, donor.nombre, donor.rfc, donor.correo_electronico, donor.codigo_postal, donor.domicilio_fiscal, donor.regimen_fiscal, donor.id_estado, donor.id_cfdi];
              return _context7.abrupt("return", _index.db.query(UPDATE, VALUES));

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    function putOne(_x7, _x8) {
      return _putOne.apply(this, arguments);
    }

    return putOne;
  }(),
  deleteOne: function () {
    var _deleteOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(id) {
      var DELETE;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              DELETE = "\n      UPDATE donadores\n      SET existe = false\n      WHERE id = $1\n    ";
              return _context8.abrupt("return", _index.db.query(DELETE, [id]));

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    function deleteOne(_x9) {
      return _deleteOne.apply(this, arguments);
    }

    return deleteOne;
  }()
};
exports.Donor = Donor;