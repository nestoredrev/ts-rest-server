"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar-campos");
const usuario_1 = require("../controllers/usuario");
const router = express_1.Router();
router.get('/', usuario_1.getUsuarios);
router.get('/userById/:id', [
    express_validator_1.check('id', 'El id es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], usuario_1.getUsuario);
router.post('/', [
    express_validator_1.check('email', 'El email es obligatorio').not().isEmpty(),
    express_validator_1.check('email', 'email no valido').isEmail(),
    validar_campos_1.validarCampos
], usuario_1.postUsuario);
router.put('/:id', [
    express_validator_1.check('id', 'El id es obligatorio').not().isEmpty(),
    express_validator_1.check('email', 'El email es obligatorio').not().isEmpty(),
    express_validator_1.check('email', 'email no valido').isEmail(),
    validar_campos_1.validarCampos
], usuario_1.putUsuario);
router.delete('/:id', [
    express_validator_1.check('id', 'El id es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], usuario_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuario.js.map