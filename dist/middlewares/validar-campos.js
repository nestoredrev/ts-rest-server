"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCampos = void 0;
const express_validator_1 = require("express-validator");
const validarCampos = (req, res, next) => {
    const errores = express_validator_1.validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            error: errores.mapped()
        });
    }
    next(); // Si todo a ido bien ejecuta el controlador en usuarios-routes
};
exports.validarCampos = validarCampos;
//# sourceMappingURL=validar-campos.js.map