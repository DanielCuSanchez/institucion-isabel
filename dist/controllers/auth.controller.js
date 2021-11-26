"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authController = void 0;

var _response = require("./../utils/response");

var _auth = require("./../lib/auth");

var _User = require("../models/User.model");

var _encrypt = require("./../lib/encrypt");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// const mockup = {
//   id: 100,
//   email: 'danielcu@isabel.com',
//   password: 'passwd'
// }
var authController = {
  login: function () {
    var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var _req$body, correo_electronico, password, _yield$User$getOnePas, _yield$User$getOnePas2, queryAnswer, status, match, token;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, correo_electronico = _req$body.correo_electronico, password = _req$body.password;
              _context.next = 3;
              return _User.User.getOnePassword(correo_electronico);

            case 3:
              _yield$User$getOnePas = _context.sent;
              _yield$User$getOnePas2 = _slicedToArray(_yield$User$getOnePas, 2);
              queryAnswer = _yield$User$getOnePas2[0];
              status = _yield$User$getOnePas2[1];

              if (queryAnswer) {
                _context.next = 10;
                break;
              }

              (0, _response.response)(req, res, 'Credenciales inválidas', null, status);
              return _context.abrupt("return");

            case 10:
              if (correo_electronico === queryAnswer.correo_electronico) {
                _context.next = 13;
                break;
              }

              (0, _response.response)(req, res, 'Correo o contraseña incorrectas', null, 500);
              return _context.abrupt("return");

            case 13:
              _context.next = 15;
              return _encrypt.encrypt.compareHashPassword(password, queryAnswer.password);

            case 15:
              match = _context.sent;
              console.log('MATCH Login', correo_electronico, match);

              if (match) {
                _context.next = 20;
                break;
              }

              (0, _response.response)(req, res, 'Correo o contraseña incorrectas', null, 500);
              return _context.abrupt("return");

            case 20:
              token = _auth.auth.createToken({
                payload: {
                  id: queryAnswer.id
                }
              });
              console.log(queryAnswer.id);
              (0, _response.response)(req, res, 'Success', token, 200);

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function login(_x, _x2) {
      return _login.apply(this, arguments);
    }

    return login;
  }(),
  me: function () {
    var _me = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var user, roles, result, permissions, _iterator, _step, role, _permissions;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _User.User.me(req.body.id);

            case 3:
              user = _context2.sent;

              if (!(user.rowCount === 0)) {
                _context2.next = 7;
                break;
              }

              (0, _response.response)(req, res, 'ERROR', null, 500);
              return _context2.abrupt("return");

            case 7:
              _context2.next = 9;
              return _User.User.getRoles(req.body.id);

            case 9:
              roles = _context2.sent;

              if (!(roles.rowCount === 0)) {
                _context2.next = 14;
                break;
              }

              console.log('roles', roles.rowCount);
              (0, _response.response)(req, res, 'ERROR', null, 500);
              return _context2.abrupt("return");

            case 14:
              result = _objectSpread(_objectSpread({}, user.rows[0]), {}, {
                roles: roles.rows,
                permisos: []
              }); // roles_permisos

              if (!(result.roles.length === 1)) {
                _context2.next = 22;
                break;
              }

              _context2.next = 18;
              return _User.User.getPermissions(roles.rows[0].id);

            case 18:
              permissions = _context2.sent;
              result = _objectSpread(_objectSpread({}, result), {}, {
                permisos: _toConsumableArray(permissions.rows)
              });
              _context2.next = 41;
              break;

            case 22:
              _iterator = _createForOfIteratorHelper(result.roles);
              _context2.prev = 23;

              _iterator.s();

            case 25:
              if ((_step = _iterator.n()).done) {
                _context2.next = 33;
                break;
              }

              role = _step.value;
              _context2.next = 29;
              return _User.User.getPermissions(role.id);

            case 29:
              _permissions = _context2.sent;
              result = _objectSpread(_objectSpread({}, result), {}, {
                permisos: [].concat(_toConsumableArray(_permissions.rows), _toConsumableArray(result.permisos))
              });

            case 31:
              _context2.next = 25;
              break;

            case 33:
              _context2.next = 38;
              break;

            case 35:
              _context2.prev = 35;
              _context2.t0 = _context2["catch"](23);

              _iterator.e(_context2.t0);

            case 38:
              _context2.prev = 38;

              _iterator.f();

              return _context2.finish(38);

            case 41:
              result = _objectSpread(_objectSpread({}, result), {}, {
                permisos: Array.from(new Set(result.permisos.map(JSON.stringify))).map(JSON.parse)
              });
              (0, _response.response)(req, res, 'ME', result, 200);
              _context2.next = 49;
              break;

            case 45:
              _context2.prev = 45;
              _context2.t1 = _context2["catch"](0);
              console.log(_context2.t1);
              (0, _response.response)(req, res, 'ME', null, 500);

            case 49:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 45], [23, 35, 38, 41]]);
    }));

    function me(_x3, _x4) {
      return _me.apply(this, arguments);
    }

    return me;
  }()
};
exports.authController = authController;