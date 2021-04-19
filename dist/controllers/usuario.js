"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll({
        where: {
            estado: true
        }
    });
    if (usuarios) {
        res.json({ usuarios });
    }
    else {
        res.status(404).json({
            msg: `No hay usuarios existentes`
        });
    }
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        res.json({ usuario });
    }
    else {
        res.status(404).json({
            msg: `No existe el usuario con el id ${id}`
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: `El email ${body.email} ya existe`
            });
        }
        const usuario = yield usuario_1.default.create(body);
        if (usuario) {
            res.status(200).json({
                msg: `El usuario ${body.nombre} se ha creado correctamente`
            });
        }
        else {
            res.status(500).json({
                msg: 'Error en la insercion'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No existe el usuario con el id ${id}`
            });
        }
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: `El email ${body.email} ya existe`
            });
        }
        const nameBeforeUpdate = usuario.getDataValue('nombre');
        yield usuario.update(body);
        res.status(200).json({
            msg: `El usuario ${nameBeforeUpdate} se ha actualizado correctamente`,
            usuarioActualizado: usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No existe el usuario con el id ${id}`
            });
        }
        // eliminacion logica
        yield usuario.update({ estado: false });
        // eliminacion fisica
        // await usuario.destroy();
        res.status(200).json({
            msg: `El usuario ${usuario.getDataValue('nombre')} se ha borrado correctamente`
        });
    }
    catch (error) {
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuario.js.map