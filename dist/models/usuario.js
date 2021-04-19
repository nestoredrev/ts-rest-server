"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Usuario = connection_1.default.define('Usuario', {
    id_usuario: {
        type: sequelize_1.DataTypes.NUMBER,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    estado: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 1
    }
});
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map