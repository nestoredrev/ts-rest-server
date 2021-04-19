import { Router } from 'express';
import { check } from "express-validator";
import { validarCampos } from '../middlewares/validar-campos';
import { deleteUsuario, 
         getUsuario, 
         getUsuarios, 
         postUsuario, 
         putUsuario } 
         from '../controllers/usuario';

const router = Router();

router.get('/',     getUsuarios);


router.get('/userById/:id',
            [ 
                check('id', 'El id es obligatorio').not().isEmpty(), 
                validarCampos
            ],
            getUsuario);



router.post('/',
                [ 
                    check('email', 'El email es obligatorio').not().isEmpty(),
                    check('email', 'email no valido').isEmail(), 
                    validarCampos
                ],
                postUsuario);


router.put('/:id',
            [ 
                check('id', 'El id es obligatorio').not().isEmpty(),
                check('email', 'El email es obligatorio').not().isEmpty(),
                check('email', 'email no valido').isEmail(),  
                validarCampos
            ],
putUsuario);



router.delete('/:id', 
                [ 
                    check('id', 'El id es obligatorio').not().isEmpty(), 
                    validarCampos
                ],
                deleteUsuario);

export default router;